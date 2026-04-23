"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCheck, Trash2 } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New data submission pending approval",
      message: "Q1 2026 GHG emissions data from Upstream",
      time: "5 minutes ago",
      read: false,
      category: "workflow",
    },
    {
      id: 2,
      title: "Workflow task assigned",
      message: "Review water consumption data",
      time: "1 hour ago",
      read: false,
      category: "workflow",
    },
    {
      id: 3,
      title: "Report generated successfully",
      message: "Annual ESG report is ready for download",
      time: "2 hours ago",
      read: true,
      category: "report",
    },
    {
      id: 4,
      title: "Data validation warning",
      message: "Methane emissions data contains outliers for March 2026",
      time: "3 hours ago",
      read: true,
      category: "alert",
    },
    {
      id: 5,
      title: "New comment on your submission",
      message: "John Doe commented on your Q4 2025 waste management data",
      time: "5 hours ago",
      read: true,
      category: "comment",
    },
    {
      id: 6,
      title: "Reminder: Monthly report due",
      message: "Your monthly sustainability report is due in 3 days",
      time: "1 day ago",
      read: true,
      category: "reminder",
    },
    {
      id: 7,
      title: "System maintenance scheduled",
      message: "The system will be down for maintenance on Sunday, 2AM - 4AM",
      time: "2 days ago",
      read: true,
      category: "system",
    },
    {
      id: 8,
      title: "New policy update",
      message: "Updated environmental compliance guidelines are now available",
      time: "3 days ago",
      read: true,
      category: "policy",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const readCount = notifications.filter((n) => n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workflow":
        return "bg-blue-100 text-blue-800";
      case "report":
        return "bg-green-100 text-green-800";
      case "alert":
        return "bg-red-100 text-red-800";
      case "comment":
        return "bg-purple-100 text-purple-800";
      case "reminder":
        return "bg-yellow-100 text-yellow-800";
      case "system":
        return "bg-gray-100 text-gray-800";
      case "policy":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Notifications" },
        ]}
      />

      <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-sm text-gray-600">
                  {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="read" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Read ({readCount})
              </TabsTrigger>
            </TabsList>

            {/* All Notifications */}
            <TabsContent value="all" className="space-y-2">
              {notifications.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">No notifications</p>
                  <p className="text-sm text-gray-500 mt-1">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow ${
                      !notification.read ? "border-l-4 border-l-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            {notification.time}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(
                              notification.category
                            )}`}
                          >
                            {notification.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-green-600 hover:bg-green-50"
                          >
                            <CheckCheck className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            {/* Unread Notifications */}
            <TabsContent value="unread" className="space-y-2">
              {notifications.filter((n) => !n.read).length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <CheckCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">No unread notifications</p>
                  <p className="text-sm text-gray-500 mt-1">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="bg-white rounded-lg border border-gray-200 border-l-4 border-l-blue-500 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              {notification.time}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(
                                notification.category
                              )}`}
                            >
                              {notification.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-green-600 hover:bg-green-50"
                          >
                            <CheckCheck className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </TabsContent>

            {/* Read Notifications */}
            <TabsContent value="read" className="space-y-2">
              {notifications.filter((n) => n.read).length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">No read notifications</p>
                </div>
              ) : (
                notifications
                  .filter((n) => n.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              {notification.time}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(
                                notification.category
                              )}`}
                            >
                              {notification.category}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
