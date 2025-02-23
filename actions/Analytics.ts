export type Timeframe = 'today' | 'tomorrow' | 'thisWeek' | 'currentMonth';

export interface AnalyticsResponse {
  revenue: number;
  totalBookings: number;
  pendingBookings: number;
  occupancyRate: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  availableRooms: number;
  calculatedAt: string; // ISO Date string
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAnalytics = async (
  hotelId: string,
  timeframe: Timeframe,
  token: string
): Promise<AnalyticsResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/api/analytics/${hotelId}?timeframe=${timeframe}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 429) {
      throw new Error("Rate limit exceeded");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch analytics data");
    }

    const data: AnalyticsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};