import { Flag } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProxyDataIndicatorProps {
  lookbackPeriod: string;
  daysActive?: number;
}

export function ProxyDataIndicator({
  lookbackPeriod,
  daysActive,
}: ProxyDataIndicatorProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1 text-amber-600">
            <Flag className="h-4 w-4" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-semibold">Proxy Data</p>
            <p className="text-xs text-gray-600 mt-1">
              Using data from: {lookbackPeriod}
            </p>
            {daysActive && (
              <p className="text-xs text-gray-600">
                Active for: {daysActive} days
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
