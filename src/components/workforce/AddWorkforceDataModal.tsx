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
import { WorkforceData } from "@/types/workforce";

const workforceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  age: z.string().min(1, "Age is required"),
  ethnicity: z.enum(["Asian", "African", "Latino", "Caucasian", "Other"]),
  accessibility: z.string().optional(),
  level: z.enum(["Leadership", "Team", "Department", "Individual"]),
  time: z.string().min(1, "Time is required"),
  date: z.string().min(1, "Date is required"),
});

type WorkforceFormData = z.infer<typeof workforceSchema>;

interface AddWorkforceDataModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: Omit<WorkforceData, "id">) => void;
}

export default function AddWorkforceDataModal({
  open,
  onClose,
  onAdd,
}: AddWorkforceDataModalProps) {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<WorkforceFormData>({
    resolver: zodResolver(workforceSchema),
    defaultValues: {
      date: new Date().toLocaleDateString("en-GB"),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    },
  });

  const onSubmit = (data: WorkforceFormData) => {
    // Validate date format
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(data.date)) {
      setShowError(true);
      return;
    }
    setShowError(false);

    onAdd({
      name: data.name,
      gender: data.gender,
      age: parseInt(data.age),
      ethnicity: data.ethnicity,
      accessibility: data.accessibility || null,
      level: data.level,
      time: data.time,
      date: data.date,
    });
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    setShowError(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add Workforce Data
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                {...register("name")}
                className="mt-1"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => setValue("gender", value as any)}
                defaultValue={watch("gender")}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                {...register("age")}
                className="mt-1"
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
              )}
            </div>

            {/* Ethnicity */}
            <div>
              <Label htmlFor="ethnicity">Ethnicity</Label>
              <Select
                onValueChange={(value) => setValue("ethnicity", value as any)}
                defaultValue={watch("ethnicity")}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose your ethnicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asian">Asian</SelectItem>
                  <SelectItem value="African">African</SelectItem>
                  <SelectItem value="Latino">Latino</SelectItem>
                  <SelectItem value="Caucasian">Caucasian</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.ethnicity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.ethnicity.message}
                </p>
              )}
            </div>

            {/* Accessibility */}
            <div>
              <Label htmlFor="accessibility">Accessibility</Label>
              <Select
                onValueChange={(value) => setValue("accessibility", value)}
                defaultValue={watch("accessibility")}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NIL">NIL</SelectItem>
                  <SelectItem value="Visual">Visual</SelectItem>
                  <SelectItem value="Hearing">Hearing</SelectItem>
                  <SelectItem value="Mobility">Mobility</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Level */}
            <div>
              <Label htmlFor="level">Level</Label>
              <Select
                onValueChange={(value) => setValue("level", value as any)}
                defaultValue={watch("level")}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leadership">Leadership</SelectItem>
                  <SelectItem value="Team">Team</SelectItem>
                  <SelectItem value="Department">Department</SelectItem>
                  <SelectItem value="Individual">Individual</SelectItem>
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                placeholder="Enter time"
                {...register("time")}
                className="mt-1"
              />
              {errors.time && (
                <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                placeholder="20/03/2025"
                {...register("date")}
                className="mt-1"
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
              )}
              {showError && (
                <p className="text-red-500 text-xs mt-1">Invalid Input</p>
              )}
            </div>
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
              Add Workforce Data
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
