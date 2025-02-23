"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, RefreshCw } from "lucide-react";
import {
  getAnalytics,
  type AnalyticsResponse,
  type Timeframe,
} from "@/actions/Analytics";

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

interface CacheData {
  data: AnalyticsResponse;
  timestamp: number;
  timeframe: Timeframe;
}

interface RangeCache {
  [key: string]: CacheData;
}

export function HotelAnalytics({ hotelId }: { hotelId: string }) {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<Timeframe>("today");
  const [calculatedAt, setCalculatedAt] = useState<Date | null>(null);
  const { getToken } = useAuth();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const uiUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const isInitialFetchRef = useRef(true);
  const cacheRef = useRef<RangeCache>({});

  const isCacheValid = (range: Timeframe): boolean => {
    const cache = cacheRef.current[range];
    if (!cache) return false;
    const now = Date.now();
    const cacheAge = now - cache.timestamp;
    return cacheAge < REFRESH_INTERVAL;
  };

  const updateCache = (range: Timeframe, data: AnalyticsResponse) => {
    const timestamp = Date.now();
    cacheRef.current[range] = { data, timestamp, timeframe: range };
    setCalculatedAt(new Date(data.calculatedAt));
  };

  const fetchData = async (showLoading = true) => {
    if (!isMountedRef.current) return;

    if (isCacheValid(selectedRange)) {
      const cache = cacheRef.current[selectedRange];
      setAnalytics(cache.data);
      setCalculatedAt(new Date(cache.data.calculatedAt));
      return;
    }

    if (showLoading) setIsLoading(true);

    try {
      const token = await getToken();
      if (!token) throw new Error("No authentication token found");

      const analyticsData = await getAnalytics(hotelId, selectedRange, token);

      if (isMountedRef.current) {
        const cache = cacheRef.current[selectedRange];
        const hasDataChanged =
          !cache ||
          JSON.stringify(analyticsData) !== JSON.stringify(cache.data);

        setAnalytics(analyticsData);
        setError(null);
        setCalculatedAt(new Date(analyticsData.calculatedAt));

        if (hasDataChanged) {
          updateCache(selectedRange, analyticsData);
        }

        if (isInitialFetchRef.current) {
          isInitialFetchRef.current = false;
          startInterval();
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch analytics data"
        );
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isMountedRef.current) fetchData(false);
    }, REFRESH_INTERVAL);
  };

  useEffect(() => {
    isMountedRef.current = true;
    isInitialFetchRef.current = true;
    fetchData();

    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (uiUpdateIntervalRef.current)
        clearInterval(uiUpdateIntervalRef.current);
    };
  }, [hotelId, selectedRange]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-destructive text-center">{error}</p>
        <Button onClick={() => fetchData(true)} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <Tabs
          value={selectedRange}
          onValueChange={(v) => setSelectedRange(v as Timeframe)}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="thisWeek">This Week</TabsTrigger>
            <TabsTrigger value="currentMonth">This Month</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Last updated{" "}
            {calculatedAt
              ? formatDistanceToNow(calculatedAt, { addSuffix: true })
              : "just now"}
          </span>
          <Button variant="outline" size="icon" onClick={() => fetchData(true)}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Revenue Card */}
      <Card className="p-6">
        <div className="">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="justify-end flex items-end md:gap-44 gap-20">
            <div className="">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold">
                ₹{analytics?.revenue.toFixed(2) || "0.00"}
              </p>
            </div>
          {analytics?.revenue && (
            <div>
              <p className="text-sm text-muted-foreground">
                Average Revenue per Room
              </p>
              <p className="text-3xl font-bold">
                ₹
                {(
                  analytics.revenue /
                  (analytics.confirmedBookings + analytics.completedBookings ||
                    1)
                  ).toFixed(2)}
              </p>
            </div>
          )}
          </div>
        </div>
      </Card>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <Card className="p-6 flex gap-2">
          <p>Total bookings</p>
          <CircularProgress
            isLoading={isLoading}
            percentage={
              analytics
                ? ((analytics.confirmedBookings + analytics.completedBookings) /
                    analytics.totalBookings) *
                  100
                : 0
            }
            color="#3b82f6"
            label=""
            value={
              (analytics?.confirmedBookings || 0) +
              (analytics?.completedBookings || 0)
            }
          />
        </Card>

        {/* Pending Bookings */}
        <Card className="p-6 flex gap-2">
          <p>Pending bookings</p>
          <CircularProgress
            isLoading={isLoading}
            percentage={
              analytics
                ? (analytics.pendingBookings /
                    (analytics.availableRooms || 1)) *
                  100
                : 0
            }
            color="#eab308"
            label=""
            value={analytics?.pendingBookings || 0}
          />
        </Card>

        {/* Confirmed Bookings */}
        <Card className="p-6 flex gap-2">
        <p>Confirmed bookings</p>
          <CircularProgress
            isLoading={isLoading}
            percentage={
              analytics
                ? (analytics.confirmedBookings /
                    (analytics.availableRooms || 1)) *
                  100
                : 0
            }
            color="#10b981"
            label=""
            value={analytics?.confirmedBookings || 0}
          />
        </Card>

        {/* Occupancy Rate */}
        {(selectedRange === "today" || selectedRange === "tomorrow") && (
          <Card className="p-6 flex gap-2">
          <p>Occupancy</p>
            <CircularProgress
              isLoading={isLoading}
              percentage={analytics?.occupancyRate || 0}
              color="#6366f1"
              label=""
              value={`${
                analytics?.occupancyRate
                  ? analytics.occupancyRate.toFixed(0)
                  : 0
              }%`}
            />
          </Card>
        )}
      </div>

      {/* Additional Stats for Today/Tomorrow */}
      {analytics &&
        (selectedRange === "today" || selectedRange === "tomorrow") && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <h3 className="text-sm text-muted-foreground mb-2">
                Available Rooms
              </h3>
              {isLoading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
              ) : (
                <p className="text-2xl font-bold">{analytics.availableRooms}</p>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-sm text-muted-foreground mb-2">
                Pending Bookings
              </h3>
              {isLoading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
              ) : (
                <p className="text-2xl font-bold">
                  {analytics.pendingBookings}
                </p>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-sm text-muted-foreground mb-2">
                Confirmed Bookings
              </h3>
              {isLoading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
              ) : (
                <p className="text-2xl font-bold">
                  {analytics.confirmedBookings}
                </p>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-sm text-muted-foreground mb-2">
                Completed Bookings
              </h3>
              {isLoading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
              ) : (
                <p className="text-2xl font-bold">
                  {analytics.completedBookings}
                </p>
              )}
            </Card>
          </div>
        )}
    </div>
  );
}
