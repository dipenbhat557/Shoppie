"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  AlertCircle,
  Shield,
  UserCheck,
  UserX,
  Clock,
  Calendar,
  Mail,
  Phone,
  MoreVertical,
  Ban,
  Flag,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUsers } from "@/fetchers/user/queries";
import { useUpdateUserStatus } from "@/fetchers/user/mutations";

type UserStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "BLACKLISTED"
  | "PENDING_VERIFICATION";
type UserRole = "CUSTOMER" | "ADMIN" | "SUPPORT";
type Gender = "MALE" | "FEMALE" | "OTHER" | "NOT_SAY";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  phoneNo: string;
  dob: string;
  gender: Gender;
  profileUrl: string;
  status: UserStatus;
  role: UserRole;
  isFraudSuspected: boolean;
  fraudReason?: string;
  lastLoginAt?: string;
  loginAttempts: number;
  createdAt: string;
  updatedAt: string;
}

const statusColors = {
  ACTIVE: "bg-green-100 text-green-700",
  SUSPENDED: "bg-yellow-100 text-yellow-700",
  BLACKLISTED: "bg-red-100 text-red-700",
  PENDING_VERIFICATION: "bg-blue-100 text-blue-700",
};

const roleColors = {
  CUSTOMER: "bg-gray-100 text-gray-700",
  ADMIN: "bg-purple-100 text-purple-700",
  SUPPORT: "bg-indigo-100 text-indigo-700",
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | "ALL">(
    "ALL"
  );
  const [selectedRole, setSelectedRole] = useState<UserRole | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showFraudDialog, setShowFraudDialog] = useState(false);
  const [fraudReason, setFraudReason] = useState("");

  const { data: users, isLoading } = useUsers();
  const updateUserStatus = useUpdateUserStatus();

  const handleStatusChange = async (userId: number, status: UserStatus) => {
    try {
      await updateUserStatus.mutateAsync({ userId, status });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleFraudReport = async (userId: number) => {
    try {
      await updateUserStatus.mutateAsync({
        userId,
        status: "BLACKLISTED",
        fraudReason,
      });
      setShowFraudDialog(false);
      setFraudReason("");
    } catch (error) {
      console.error("Error reporting fraud:", error);
    }
  };

  const filteredUsers = users
    ? users.filter((user) => {
        const matchesSearch =
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          selectedStatus === "ALL" || user.status === selectedStatus;

        const matchesRole =
          selectedRole === "ALL" || user.role === selectedRole;

        return matchesSearch && matchesStatus && matchesRole;
      })
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "border-[#FFC633] text-[#FFC633]" : ""}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as UserStatus | "ALL")
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFC633]"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="BLACKLISTED">Blacklisted</option>
                <option value="PENDING_VERIFICATION">
                  Pending Verification
                </option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(e.target.value as UserRole | "ALL")
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFC633]"
              >
                <option value="ALL">All Roles</option>
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPPORT">Support</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors"
            >
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={user.profileUrl || "/placeholder-avatar.png"}
                  alt={`${user.firstName} ${user.lastName}`}
                  fill
                  className="object-cover"
                />
                {user.isFraudSuspected && (
                  <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {user.firstName} {user.lastName}
                  </h3>
                  {user.isVerified && (
                    <Shield className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className={`${statusColors[user.status]} capitalize`}
                >
                  {user.status.toLowerCase().replace("_", " ")}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`${roleColors[user.role]} capitalize`}
                >
                  {user.role.toLowerCase()}
                </Badge>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUserDetails(true);
                    }}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user.status !== "ACTIVE" && (
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(user.id, "ACTIVE")}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate User
                    </DropdownMenuItem>
                  )}
                  {user.status !== "SUSPENDED" && (
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(user.id, "SUSPENDED")}
                      className="text-yellow-600"
                    >
                      <Ban className="w-4 h-4 mr-2" />
                      Suspend User
                    </DropdownMenuItem>
                  )}
                  {!user.isFraudSuspected && (
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedUser(user);
                        setShowFraudDialog(true);
                      }}
                      className="text-red-600"
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      Report Fraud
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchQuery
                  ? "No users found matching your search."
                  : "No users found."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Details Dialog */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <Image
                    src={selectedUser.profileUrl || "/placeholder-avatar.png"}
                    alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Basic Info</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Phone
                      </label>
                      <p className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{selectedUser.phoneNo}</span>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Date of Birth
                      </label>
                      <p className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(selectedUser.dob), "PP")}</span>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Gender
                      </label>
                      <p className="capitalize">
                        {selectedUser.gender.toLowerCase()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Member Since
                      </label>
                      <p>{format(new Date(selectedUser.createdAt), "PP")}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="activity" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Last Login
                    </label>
                    <p className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {selectedUser.lastLoginAt
                          ? format(new Date(selectedUser.lastLoginAt), "PPp")
                          : "Never"}
                      </span>
                    </p>
                  </div>
                  {/* Add more activity info here */}
                </TabsContent>
                <TabsContent value="security" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-500">
                        Account Status
                      </label>
                      <Badge
                        variant="secondary"
                        className={`${
                          statusColors[selectedUser.status]
                        } capitalize`}
                      >
                        {selectedUser.status.toLowerCase().replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-500">
                        Email Verification
                      </label>
                      <Badge
                        variant="secondary"
                        className={
                          selectedUser.isVerified
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {selectedUser.isVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-500">
                        Login Attempts
                      </label>
                      <span
                        className={
                          selectedUser.loginAttempts > 3
                            ? "text-red-600"
                            : "text-gray-600"
                        }
                      >
                        {selectedUser.loginAttempts}
                      </span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Fraud Report Dialog */}
      <Dialog open={showFraudDialog} onOpenChange={setShowFraudDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Fraud</DialogTitle>
            <DialogDescription>
              This will blacklist the user and mark them as potentially
              fraudulent. This action cannot be undone easily.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Reason for Fraud Report
              </label>
              <textarea
                value={fraudReason}
                onChange={(e) => setFraudReason(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFC633]"
                rows={4}
                placeholder="Provide detailed reason for reporting fraud..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowFraudDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  selectedUser && handleFraudReport(selectedUser.id)
                }
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Report & Blacklist
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
