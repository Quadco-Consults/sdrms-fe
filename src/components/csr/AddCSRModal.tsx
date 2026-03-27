"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { CSRData } from "@/types/csr";
import { X } from "lucide-react";

const csrSchema = z.object({
  initiativeName: z.string().min(1, "Initiative name is required"),
  beneficiariesImpacted: z.array(z.string()).min(1, "At least one beneficiary is required"),
  budgetAllocation: z.string().min(1, "Budget allocation is required"),
  csrActivity: z.string().min(1, "CSR activity is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  numberOfJobs: z.string().optional(),
  description: z.string().optional(),
});

type CSRFormData = z.infer<typeof csrSchema>;

interface AddCSRModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: Omit<CSRData, "id">) => void;
}

const beneficiaryOptions = [
  "Students",
  "Health care patients",
  "Elderly",
  "Youth",
  "Women",
  "Children",
  "Farmers",
  "Small business owners",
];

export default function AddCSRModal({
  open,
  onClose,
  onAdd,
}: AddCSRModalProps) {
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<string[]>([]);
  const [beneficiaryInput, setBeneficiaryInput] = useState("");
  const [showBeneficiaryDropdown, setShowBeneficiaryDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CSRFormData>({
    resolver: zodResolver(csrSchema),
    defaultValues: {
      startDate: "20/03/2025",
      endDate: "20/03/2025",
      beneficiariesImpacted: [],
    },
  });

  const addBeneficiary = (beneficiary: string) => {
    if (!selectedBeneficiaries.includes(beneficiary)) {
      const newBeneficiaries = [...selectedBeneficiaries, beneficiary];
      setSelectedBeneficiaries(newBeneficiaries);
      setValue("beneficiariesImpacted", newBeneficiaries);
    }
    setShowBeneficiaryDropdown(false);
    setBeneficiaryInput("");
  };

  const removeBeneficiary = (beneficiary: string) => {
    const newBeneficiaries = selectedBeneficiaries.filter((b) => b !== beneficiary);
    setSelectedBeneficiaries(newBeneficiaries);
    setValue("beneficiariesImpacted", newBeneficiaries);
  };

  const onSubmit = (data: CSRFormData) => {
    onAdd({
      initiativeName: data.initiativeName,
      csrActivity: data.csrActivity,
      description: data.description || "",
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location,
      budgetAllocation: parseFloat(data.budgetAllocation),
      beneficiariesImpacted: selectedBeneficiaries,
      impactMetrics: {
        numberOfJobs: data.numberOfJobs ? parseInt(data.numberOfJobs) : 0,
      },
      status: "Ongoing",
    });
    handleCancel();
  };

  const handleCancel = () => {
    reset();
    setSelectedBeneficiaries([]);
    setBeneficiaryInput("");
    onClose();
  };

  const filteredBeneficiaries = beneficiaryOptions.filter(
    (b) =>
      !selectedBeneficiaries.includes(b) &&
      b.toLowerCase().includes(beneficiaryInput.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add CSR Initiative Data
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Initiative Name */}
            <div>
              <Label htmlFor="initiativeName">Initiative Name</Label>
              <Input
                id="initiativeName"
                placeholder="Enter Initiative name"
                {...register("initiativeName")}
                className="mt-1"
              />
              {errors.initiativeName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.initiativeName.message}
                </p>
              )}
            </div>

            {/* Beneficiaries Impacted */}
            <div>
              <Label htmlFor="beneficiaries">Beneficiaries Impacted</Label>
              <div className="relative mt-1">
                <div className="border border-gray-300 rounded-md p-2 min-h-[40px] flex flex-wrap gap-2">
                  {selectedBeneficiaries.map((beneficiary) => (
                    <span
                      key={beneficiary}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {beneficiary}
                      <button
                        type="button"
                        onClick={() => removeBeneficiary(beneficiary)}
                        className="hover:text-gray-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder={selectedBeneficiaries.length === 0 ? "Select beneficiaries" : ""}
                    value={beneficiaryInput}
                    onChange={(e) => setBeneficiaryInput(e.target.value)}
                    onFocus={() => setShowBeneficiaryDropdown(true)}
                    className="flex-1 min-w-[120px] outline-none text-sm"
                  />
                </div>
                {showBeneficiaryDropdown && filteredBeneficiaries.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filteredBeneficiaries.map((beneficiary) => (
                      <button
                        key={beneficiary}
                        type="button"
                        onClick={() => addBeneficiary(beneficiary)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        {beneficiary}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.beneficiariesImpacted && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.beneficiariesImpacted.message}
                </p>
              )}
            </div>

            {/* Budget Allocation */}
            <div>
              <Label htmlFor="budgetAllocation">Budget Allocation</Label>
              <Input
                id="budgetAllocation"
                type="number"
                placeholder="Choose your ethnicity"
                {...register("budgetAllocation")}
                className="mt-1"
              />
              {errors.budgetAllocation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.budgetAllocation.message}
                </p>
              )}
            </div>

            {/* CSR Activity */}
            <div>
              <Label htmlFor="csrActivity">CSR Activity</Label>
              <Select
                onValueChange={(value) => setValue("csrActivity", value)}
                defaultValue={watch("csrActivity")}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select CSR activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Philanthropy">Philanthropy</SelectItem>
                  <SelectItem value="Education Support">Education Support</SelectItem>
                  <SelectItem value="Healthcare Initiative">
                    Healthcare Initiative
                  </SelectItem>
                  <SelectItem value="Environmental Conservation">
                    Environmental Conservation
                  </SelectItem>
                  <SelectItem value="Community Development">
                    Community Development
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.csrActivity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.csrActivity.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Select
                onValueChange={(value) => setValue("location", value)}
                defaultValue={watch("location")}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kebbi">Kebbi</SelectItem>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="Abuja">Abuja</SelectItem>
                  <SelectItem value="Kano">Kano</SelectItem>
                  <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                  <SelectItem value="Kaduna">Kaduna</SelectItem>
                </SelectContent>
              </Select>
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                placeholder="20/03/2025"
                {...register("startDate")}
                className="mt-1"
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>
              )}
            </div>

            {/* End Date */}
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                placeholder="20/03/2025"
                {...register("endDate")}
                className="mt-1"
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Impact Metrics */}
          <div>
            <Label className="text-sm font-medium">Impact Metrics</Label>
            <div className="flex gap-4 mt-2">
              <Input
                value="Number of jobs"
                readOnly
                className="flex-1 bg-gray-50"
              />
              <Input
                type="number"
                placeholder="20"
                {...register("numberOfJobs")}
                className="w-24"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Description"
              {...register("description")}
              className="mt-1 w-full min-h-[120px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="px-8"
            >
              Cancel
            </Button>
            <Button type="submit" className="px-8">
              Add CSR Data
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
