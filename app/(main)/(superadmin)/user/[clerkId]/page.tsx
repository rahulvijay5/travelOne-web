"use client"

import { getUserDetails, type User } from "@/actions/Users";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { UserViewComponent } from "@/components/UserViewComponent";
import { useParams } from "next/navigation";

export default function UserDetailPage() {
    const {clerkId} = useParams()
    const { getToken } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await getToken();
                if (!token) {
                    throw new Error("Authentication required");
                }
                const userData = await getUserDetails(clerkId as string, token);
                console.log(userData)
                setUser(userData);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to load user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [clerkId, getToken]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-destructive/15 text-destructive p-4 rounded-md">
                    {error}
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-muted-foreground">User not found</div>
            </div>
        );
    }

    return <UserViewComponent user={user} />;
}