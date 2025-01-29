'use client';

import { User, UserRole } from "@/actions/Users";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserViewComponentProps {
    user: User;
    onRoleChange?: (newRole: UserRole) => void;
}

export function UserViewComponent({ user }: UserViewComponentProps) {
    const router = useRouter();

    const getRoleBadgeColor = (role: UserRole) => {
        switch (role) {
            case 'OWNER':
                return 'bg-purple-100 text-purple-800';
            case 'MANAGER':
                return 'bg-blue-100 text-blue-800';
            case 'USER':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 min-h-screen">
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                </Button>
                <h1 className="text-3xl font-bold">User Details</h1>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{user.name || 'Unnamed User'}</CardTitle>
                            <CardDescription>User ID: {user.id}</CardDescription>
                        </div>
                        <Badge className={getRoleBadgeColor(user.role || 'USER')}>
                            {user.role || 'USER'}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <UserIcon className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Clerk ID</p>
                                    <p className="font-medium">{user.clerkId}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>
                            {user.mobile && (
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Mobile</p>
                                        <p className="font-medium">{user.mobile}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional user details can be added here */}
                        <div className="space-y-4">
                            {/* Add more user information sections as needed */}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}