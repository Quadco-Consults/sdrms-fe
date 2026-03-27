"use client";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Cloud,
  Users,
  BarChart3,
  FileCheck,
  Target,
  Calculator,
  Workflow,
  Handshake,
  Lightbulb,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { performLogout } from "@/lib/auth-utils";
import Image from "next/image";

interface SubItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: any;
  hasDropdown?: boolean;
  subItems?: SubItem[];
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Environmental Monitoring",
    href: "/dashboard/environmental-monitoring",
    icon: Cloud,
    hasDropdown: true,
    subItems: [
      { title: "Overview", href: "/dashboard/environmental-monitoring" },
      {
        title: "Greenhouse Gas Emissions Tracking",
        href: "/dashboard/environmental-monitoring/ghg-tracking",
      },
      {
        title: "Greenhouse Gas Emissions",
        href: "/dashboard/environmental-monitoring/ghg-emissions",
      },
      {
        title: "Energy Efficiency",
        href: "/dashboard/environmental-monitoring/energy-efficiency",
      },
      {
        title: "Energy Consumption",
        href: "/dashboard/environmental-monitoring/energy-consumption",
      },
      {
        title: "Water Consumption",
        href: "/dashboard/environmental-monitoring/water-consumption",
      },
    ],
  },
  {
    title: "Social Impact and Workforce Metrics",
    href: "/social-impact",
    icon: Users,
    hasDropdown: true,
    subItems: [
      { title: "Overview", href: "/social-impact" },
      {
        title: "Workforce Diversity & Inclusion",
        href: "/workforce-diversity",
      },
    ],
  },
  {
    title: "Reporting & Analytics",
    href: "/dashboard/reporting-analytics",
    icon: BarChart3,
  },
  {
    title: "Governance and Compliance",
    href: "/dashboard/governance-compliance",
    icon: FileCheck,
  },
  {
    title: "Rapid Assessment",
    href: "/dashboard/rapid-assessment",
    icon: Target,
  },
  {
    title: "Emissions Calculator",
    href: "/dashboard/emissions-calculator",
    icon: Calculator,
  },
  {
    title: "Workflow",
    href: "/workflow",
    icon: Workflow,
    hasDropdown: true,
    subItems: [
      { title: "Workflow Management", href: "/workflow" },
      { title: "Workflow Task Manager", href: "/workflow-tasks" },
    ],
  },
  {
    title: "Partnerships",
    href: "/dashboard/partnerships",
    icon: Handshake,
  },
  {
    title: "Research & Innovation",
    href: "/dashboard/research-innovation",
    icon: Lightbulb,
  },
  {
    title: "User Management",
    href: "/users",
    icon: Shield,
    hasDropdown: true,
    subItems: [
      { title: "Users", href: "/users" },
      { title: "Roles", href: "/roles" },
    ],
  },
];

const settingsNavItems: NavItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  // Auto-expand parent menu if user is on a sub-page
  useEffect(() => {
    const currentItem = mainNavItems.find((item) =>
      item.subItems?.some((sub) => pathname === sub.href),
    );
    if (currentItem && !expandedItems.includes(currentItem.title)) {
      setExpandedItems((prev) => [...prev, currentItem.title]);
    }
  }, [pathname, expandedItems]);

  const handleLogout = async () => {
    await performLogout();
  };

  return (
    <div
      className={cn(
        "bg-white flex flex-col shrink-0 transition-all duration-300 border-r border-gray-200 h-screen overflow-y-auto",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header with NNPC Logo */}
      <div className='p-4 relative flex items-center justify-center border-b border-gray-200'>
        {!isCollapsed && (
          <div className='flex items-center'>
            <Image
              src='/images/NNPC_Logo.png'
              alt='NNPC Logo'
              width={60}
              height={34}
              className='object-contain'
              priority
            />
          </div>
        )}
        {isCollapsed && (
          <div className='w-8 h-8 flex items-center justify-center'>
            <Image
              src='/images/NNPC_Logo.png'
              alt='NNPC'
              width={28}
              height={16}
              className='object-contain'
              priority
            />
          </div>
        )}
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 hover:bg-gray-100 w-7 h-7 rounded-full border border-gray-300 shadow-sm'
        >
          {isCollapsed ? (
            <ChevronRight className='h-4 w-4' />
          ) : (
            <ChevronLeft className='h-4 w-4' />
          )}
        </Button>
      </div>

      <nav className='flex-1 px-3 py-4 space-y-1'>
        {/* MAIN Section */}
        {!isCollapsed && (
          <p className='text-xs font-semibold text-gray-400 tracking-wider px-3 py-2 mb-2'>
            MAIN
          </p>
        )}

        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            item.subItems?.some((sub) => pathname === sub.href);
          const isExpanded = expandedItems.includes(item.title);

          return (
            <div key={item.title}>
              {item.hasDropdown ? (
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg transition-colors",
                    isActive
                      ? "bg-[#E8F5E9] text-[#4CAF50]"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    isCollapsed && "justify-center",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <div className='flex items-center'>
                    <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                    {!isCollapsed && (
                      <span className='text-sm font-medium'>{item.title}</span>
                    )}
                  </div>
                  {!isCollapsed && item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded ? "rotate-180" : "",
                      )}
                    />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm rounded-lg transition-colors group relative",
                    isActive
                      ? "bg-[#E8F5E9] text-[#4CAF50]"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    isCollapsed && "justify-center",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                  {!isCollapsed && (
                    <span className='text-sm font-medium'>{item.title}</span>
                  )}
                  {isCollapsed && (
                    <div className='absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50'>
                      {item.title}
                    </div>
                  )}
                </Link>
              )}

              {/* Sub-items */}
              {!isCollapsed &&
                item.hasDropdown &&
                isExpanded &&
                item.subItems &&
                item.subItems.length > 0 && (
                  <div className='ml-8 mt-1 space-y-1'>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm rounded-lg transition-colors",
                          pathname === subItem.href
                            ? "bg-[#E8F5E9] text-[#4CAF50]"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                        )}
                      >
                        <div className='w-1.5 h-1.5 bg-gray-400 rounded-full mr-3'></div>
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          );
        })}

        {/* SETTINGS Section */}
        {!isCollapsed && (
          <p className='text-xs font-semibold text-gray-400 tracking-wider px-3 py-2 mt-6 mb-2'>
            SETTINGS
          </p>
        )}

        {settingsNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm rounded-lg transition-colors group relative",
                isActive
                  ? "bg-[#E8F5E9] text-[#4CAF50]"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                isCollapsed && "justify-center",
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && (
                <span className='text-sm font-medium'>{item.title}</span>
              )}
              {isCollapsed && (
                <div className='absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50'>
                  {item.title}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className='p-3 space-y-1 border-t border-gray-200'>
        <button
          onClick={() => toggleExpanded("Help & Support")}
          className={cn(
            "flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg transition-colors text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            isCollapsed && "justify-center",
          )}
          title={isCollapsed ? "Help & Support" : undefined}
        >
          <div className='flex items-center'>
            <HelpCircle className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && (
              <span className='text-sm font-medium'>Help & Support</span>
            )}
          </div>
          {!isCollapsed && (
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                expandedItems.includes("Help & Support") ? "rotate-180" : "",
              )}
            />
          )}
        </button>

        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors w-full group relative",
            isCollapsed && "justify-center",
          )}
          title={isCollapsed ? "Log Out" : undefined}
        >
          <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
          {!isCollapsed && <span className='text-sm font-medium'>Log Out</span>}
          {isCollapsed && (
            <div className='absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50'>
              Log Out
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
