"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CSRData } from "@/types/csr";

interface ViewCSRModalProps {
  open: boolean;
  onClose: () => void;
  data: CSRData | null;
}

export default function ViewCSRModal({
  open,
  onClose,
  data,
}: ViewCSRModalProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">View All</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Initiative Name</span>
            <span className="font-medium text-gray-900">
              {data.initiativeName}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">CSR Activity</span>
            <span className="font-medium text-gray-900">{data.csrActivity}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Start Date</span>
            <span className="font-medium text-gray-900">{data.startDate}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">End Date</span>
            <span className="font-medium text-gray-900">{data.endDate}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Location</span>
            <span className="font-medium text-gray-900">{data.location}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Budget Allocation</span>
            <span className="font-medium text-gray-900">
              {data.budgetAllocation.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status:</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="font-medium text-gray-900">{data.status}</span>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
