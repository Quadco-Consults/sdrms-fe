"use client";

import { Button } from "@/components/ui/button";
import { Settings, Globe, Plus } from "lucide-react";

export default function Integrations() {
  const integrations = [
    {
      name: "SAP ERP",
      status: "Connected",
      lastSync: "10 mins ago",
      streams: ["Fuel", "Energy"],
      icon: "🏢",
    },
    {
      name: "SCADA Systems",
      status: "Connected",
      lastSync: "Real-time",
      streams: ["Emissions", "Flow"],
      icon: "⚡",
    },
    {
      name: "Oracle Cloud",
      status: "Disconnected",
      lastSync: "2 days ago",
      streams: ["HR Data"],
      icon: "☁️",
    },
    {
      name: "Azure Data Lake",
      status: "Pending",
      lastSync: "Never",
      streams: ["Historical"],
      icon: "📊",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
              System Integrations
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Connect SDRMS with your enterprise systems for automated data flow
            </p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus size={16} className="mr-2" />
            Create Integration
          </Button>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((sys, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {sys.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{sys.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        sys.status === "Connected"
                          ? "bg-green-500"
                          : sys.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      {sys.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-green-600 transition-colors">
                <Settings size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[12px]">
                <span className="text-gray-500">Last Sync:</span>
                <span className="font-medium text-gray-900">{sys.lastSync}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-gray-500">Data Streams:</span>
                <div className="flex gap-1">
                  {sys.streams.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-green-50 rounded text-[10px] font-bold text-green-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
              <button className="flex-1 h-[36px] rounded-lg border border-gray-300 text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-all">
                Configure
              </button>
              <button
                className={`flex-1 h-[36px] rounded-lg text-[12px] font-bold transition-all ${
                  sys.status === "Connected"
                    ? "border border-red-200 text-red-600 hover:bg-red-50"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {sys.status === "Connected" ? "Disconnect" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* API & Webhooks */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">
              API & Webhooks
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Manage external access to NNPC data via secure API keys
            </p>
          </div>
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            Generate API Key
          </Button>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-green-600 shadow-sm">
                <Globe size={20} />
              </div>
              <div>
                <div className="text-[13px] font-bold text-gray-900">
                  Production Webhook
                </div>
                <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                  https://hooks.nnpc.com/sdrms-sync
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-bold uppercase">
                Active
              </span>
              <button className="text-gray-400 hover:text-red-600 transition-colors">
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <Button variant="outline" className="text-gray-600">
          Cancel
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
