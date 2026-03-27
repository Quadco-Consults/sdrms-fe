"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface DashboardHeaderProps {
  breadcrumbs?: { label: string; href?: string }[];
}

export default function DashboardHeader({ breadcrumbs }: DashboardHeaderProps) {
  const { data: session } = useSession();

  // Mock user data - replace with actual session data
  const user = {
    name: session?.user?.user?.first_name + " " + session?.user?.user?.last_name || "User",
    role: "CHO Sustainability",
    avatar: "/images/avatar-placeholder.jpg",
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs?.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">→</span>}
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? "text-gray-900 font-medium"
                    : "text-gray-500"
                }
              >
                {crumb.label}
              </span>
            </div>
          ))}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#4CAF50] text-white font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-gray-500 text-xs">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
