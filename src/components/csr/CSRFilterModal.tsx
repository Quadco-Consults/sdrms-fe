"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CSRFilter } from "@/types/csr";

interface CSRFilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: CSRFilter) => void;
  currentFilters: CSRFilter;
}

export default function CSRFilterModal({
  open,
  onClose,
  onApply,
  currentFilters,
}: CSRFilterModalProps) {
  const [filters, setFilters] = useState<CSRFilter>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleReset = () => {
    setFilters({});
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">CSR Impact</DialogTitle>
            <Button
              variant="link"
              onClick={handleReset}
              className="text-green-600 p-0 h-auto"
            >
              Reset all
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Geographic Location */}
          <div>
            <Label htmlFor="location" className="text-gray-600 text-sm">
              Geographic Location
            </Label>
            <Select
              value={filters.geographicLocation || ""}
              onValueChange={(value) =>
                setFilters({ ...filters, geographicLocation: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Any area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any area</SelectItem>
                <SelectItem value="Kebbi">Kebbi</SelectItem>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Abuja">Abuja</SelectItem>
                <SelectItem value="Kano">Kano</SelectItem>
                <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                <SelectItem value="Kaduna">Kaduna</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Initiative type */}
          <div>
            <Label htmlFor="initiativeType" className="text-gray-600 text-sm">
              Initiative type
            </Label>
            <Input
              type="text"
              id="initiativeType"
              placeholder="select an initiative"
              value={filters.initiativeType || ""}
              onChange={(e) =>
                setFilters({ ...filters, initiativeType: e.target.value })
              }
              className="mt-1"
            />
          </div>

          {/* Number of beneficiaries */}
          <div>
            <Label htmlFor="beneficiaries" className="text-gray-600 text-sm">
              Number of beneficiaries
            </Label>
            <Select
              value={filters.numberOfBeneficiaries || ""}
              onValueChange={(value) =>
                setFilters({ ...filters, numberOfBeneficiaries: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Any area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any area</SelectItem>
                <SelectItem value="0-100">0-100</SelectItem>
                <SelectItem value="101-500">101-500</SelectItem>
                <SelectItem value="501-1000">501-1000</SelectItem>
                <SelectItem value="1000+">1000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div>
            <Label className="text-gray-600 text-sm">Date</Label>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>
                <Input
                  type="date"
                  placeholder="from"
                  value={filters.dateFrom || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, dateFrom: e.target.value })
                  }
                />
              </div>
              <div>
                <Input
                  type="date"
                  placeholder="to"
                  value={filters.dateTo || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, dateTo: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <Button onClick={handleApply} className="w-full mt-6">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
