import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Activity,
  Clock,
  Wallet,
  Book,
  Award,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useWallet } from "../contexts/WalletContext";
import UserRegistration from "./UserRegistration";
import { Loader2 } from "lucide-react";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { account, isCorrectNetwork } = useWallet();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (account) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URI}/api/user/check-user`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ walletAddress: account }),
            }
          );
          const data = await response.json();
          setIsRegistered(data.exists);
        } catch (error) {
          console.error("Error checking user registration:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    checkUserRegistration();
  }, [account]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URI}/api/user/profile/${account}`
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchActivityData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_SERVER_URI
          }/api/user/activity/${account}/${currentMonth}/${currentYear}`
        );
        const data = await response.json();
        setActivityData(data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    if (account && isRegistered) {
      fetchUserData();
      fetchActivityData();
    }
  }, [account, currentMonth, currentYear, isRegistered]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const hasActivity = (day) => {
    return activityData.some((activity) => {
      const date = new Date(activity.date);
      return date.getDate() === day;
    });
  };

  const renderHeatmap = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-xs text-center text-gray-500">
              {day}
            </div>
          ))}
          {Array(new Date(currentYear, currentMonth - 1, 1).getDay())
            .fill(null)
            .map((_, i) => (
              <div key={`empty-${i}`} className="w-8 h-8" />
            ))}
          {days.map((day) => {
            const activity = hasActivity(day);
            return (
              <div
                key={day}
                className={`w-8 h-8 rounded-md ${
                  activity ? "bg-green-600" : "bg-gray-100"
                } transition-all duration-200 hover:opacity-75 cursor-pointer relative group`}
              >
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">
                  {day}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>No Activity</span>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-gray-100 rounded-sm" />
              <div className="w-4 h-4 bg-green-600 rounded-sm" />
            </div>
            <span>Activity</span>
          </div>
        </div>
      </div>
    );
  };

  if (!account || !isCorrectNetwork) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <Card className="text-center p-6">
          <p className="text-gray-600 mb-4">
            Please connect your wallet and switch to the correct network.
          </p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isRegistered) {
    return (
      <UserRegistration
        walletAddress={account}
        onRegistrationComplete={() => setIsRegistered(true)}
      />
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto py-[8rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Info Card */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl h-fit">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="bg-blue-500 rounded-full p-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Username</div>
                  <div className="font-semibold text-lg">
                    @{userData.username}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                <div className="bg-purple-500 rounded-full p-3">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Wallet Address</div>
                  <div className="font-mono">
                    {userData.walletAddress
                      ? `${userData.walletAddress.slice(
                          0,
                          6
                        )}...${userData.walletAddress.slice(-4)}`
                      : "N/A"}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="bg-green-500 rounded-full p-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Member Since</div>
                  <div className="font-semibold">
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Heatmap Card */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-6 h-6 text-purple-500" />
                <span>Activity Heatmap</span>
              </CardTitle>
              <select
                value={`${currentYear}-${currentMonth}`}
                onChange={(e) => {
                  const [year, month] = e.target.value.split("-");
                  setCurrentYear(parseInt(year));
                  setCurrentMonth(parseInt(month));
                }}
                className="px-3 py-1 rounded-md border border-gray-300 bg-white"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const date = new Date(currentYear, i);
                  return (
                    <option
                      key={i}
                      value={`${date.getFullYear()}-${date.getMonth() + 1}`}
                    >
                      {date.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </option>
                  );
                })}
              </select>
            </CardHeader>
            <CardContent>{renderHeatmap()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
