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
import { WorkforceFilter } from "@/types/workforce";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: WorkforceFilter) => void;
  currentFilters: WorkforceFilter;
}

export default function FilterModal({
  open,
  onClose,
  onApply,
  currentFilters,
}: FilterModalProps) {
  const [filters, setFilters] = useState<WorkforceFilter>(currentFilters);

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
            <DialogTitle className="text-xl font-bold">
              Workforce Diversity
            </DialogTitle>
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
          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-gray-600 text-sm">
              Location
            </Label>
            <Select
              value={filters.location || ""}
              onValueChange={(value) =>
                setFilters({ ...filters, location: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Any area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any area</SelectItem>
                <SelectItem value="North America">North America</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Africa">Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Role */}
          <div>
            <Label htmlFor="jobRole" className="text-gray-600 text-sm">
              Job Role
            </Label>
            <Select
              value={filters.jobRole || ""}
              onValueChange={(value) =>
                setFilters({ ...filters, jobRole: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Any area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any area</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
                <SelectItem value="Team">Team</SelectItem>
                <SelectItem value="Department">Department</SelectItem>
                <SelectItem value="Individual">Individual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="gender" className="text-gray-600 text-sm">
              Gender
            </Label>
            <Select
              value={filters.gender || ""}
              onValueChange={(value) =>
                setFilters({ ...filters, gender: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="choose any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Choose any</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
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
