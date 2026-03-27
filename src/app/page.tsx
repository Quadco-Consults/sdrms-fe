import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import { AUTH_ROUTES } from "@/constants/routes";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F5F6] to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Link href={AUTH_ROUTES.SIGN_IN}>
              <Button variant="ghost" size="default">
                Sign In
              </Button>
            </Link>
            <Link href={AUTH_ROUTES.SIGN_UP}>
              <Button size="default">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#0E0F10]">
            Welcome to SDRMS
          </h1>
          <p className="text-xl text-[#26292C] mb-8 max-w-2xl mx-auto">
            Sustainable Development Resource Management System - Track and
            manage your sustainability goals with confidence.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href={AUTH_ROUTES.SIGN_UP}>
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
            <Link href={AUTH_ROUTES.SIGN_IN}>
              <Button variant="outline" size="lg" className="px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[#4CAF50]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#0E0F10]">
              Track Progress
            </h3>
            <p className="text-[#26292C] text-sm">
              Monitor your sustainability goals and track progress in real-time
              with comprehensive analytics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[#4CAF50]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#0E0F10]">
              Manage Resources
            </h3>
            <p className="text-[#26292C] text-sm">
              Efficiently allocate and manage resources to achieve your
              sustainability objectives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-[#4CAF50]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#0E0F10]">
              Generate Reports
            </h3>
            <p className="text-[#26292C] text-sm">
              Create detailed reports and insights to support data-driven
              decision making.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#26292C]">
            © 2024 NNPC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-[#4CAF50] hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-[#4CAF50] hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-[#4CAF50] hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
