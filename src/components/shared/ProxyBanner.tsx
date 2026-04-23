import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProxyIndicator {
  indicator: string;
  period: string;
  lookbackPeriod: string;
  daysActive: number;
}

interface ProxyBannerProps {
  indicators: ProxyIndicator[];
}

export function ProxyBanner({ indicators }: ProxyBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (indicators.length === 0) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900">
              Proxy Data in Use
            </h3>
            <p className="text-sm text-amber-800 mt-1">
              {indicators.length} indicator{indicators.length > 1 ? "s" : ""} using
              prior-period data for the current reporting period
            </p>

            {isExpanded && (
              <div className="mt-4 space-y-3">
                {indicators.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-md p-3 border border-amber-200"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Indicator</p>
                        <p className="font-medium text-gray-900">{item.indicator}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Current Period</p>
                        <p className="font-medium text-gray-900">{item.period}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Using Data From</p>
                        <p className="font-medium text-gray-900">
                          {item.lookbackPeriod}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Days Active</p>
                        <p className="font-medium text-gray-900">
                          {item.daysActive} days
                          {item.daysActive >= 7 && (
                            <span className="ml-2 text-xs text-red-600 font-semibold">
                              (Escalation Triggered)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-amber-800 hover:text-amber-900"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Hide
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Details
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
