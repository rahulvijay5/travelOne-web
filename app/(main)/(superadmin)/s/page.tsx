"use client";

import { useState } from "react";
import {
  searchUsers,
  updateUserRole,
} from "@/actions/Users";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@clerk/nextjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { User, UserRole } from "@/types";

export default function SuperAdminPage() {
  const { getToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<UserRole | null>(null);

  const debouncedSearch = useDebounce(async (term: string) => {
    if (!term) {
      setUsers([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication required");
      }
      const results = await searchUsers(term, token);
      setUsers(results);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to search users. Please try again.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleRoleUpdate = (clerkId: string, newRole: UserRole) => {
    const user = users.find((u) => u.clerkId === clerkId);
    if (user) {
      setSelectedUser(user);
      setNewRole(newRole);
      setDialogOpen(true);
    }
  };

  const confirmRoleUpdate = async () => {
    if (selectedUser && newRole) {
      try {
        setUpdatingUserId(selectedUser.clerkId);
        setDialogOpen(false);
        const token = await getToken();
        if (!token) {
          throw new Error("Authentication required");
        }
        const updatedUser = await updateUserRole({ clerkId: selectedUser.clerkId, role: newRole }, token);
        setUsers(users.map((user) => (user.clerkId === selectedUser.clerkId ? { ...updatedUser, key: updatedUser.clerkId } : user)));
        setUpdatingUserId(null);
        setError(null);
        window.location.href = `/user/${selectedUser.clerkId}`;
      } catch (err) {
        console.error("Role update error:", err);
        setError("Failed to update user role. Please try again.");
        setUpdatingUserId(null);
      }
    }
  };

  return (
    <div className="p-6 w-full space-y-8">
      <h1 className="text-3xl font-bold">User Management</h1>

      <div className="flex items-center space-x-4 ">
        <Input
          type="text"
          placeholder="Search by email, mobile number, or name"
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-md"
        />
        <Button variant="secondary">Search</Button>
      </div>

      {loading && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-md">
          {error}
        </div>
      )}

      {users.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.clerkId}>
                  <TableCell className="font-medium">
                    {user.name || "N/A"}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber || "N/A"}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value: UserRole) =>
                        handleRoleUpdate(user.clerkId, value)
                      }
                      disabled={updatingUserId === user.clerkId}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="MANAGER">Manager</SelectItem>
                        <SelectItem value="OWNER">Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        window.location.href = `/user/${user.clerkId}`;
                      }}
                      disabled={updatingUserId === user.clerkId}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        searchTerm &&
        !loading && (
          <div className="text-center text-muted-foreground">
            No users found
          </div>
        )
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Role Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to update {selectedUser?.name}&apos;s role
              from {selectedUser?.role} to {newRole}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRoleUpdate}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
