"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SuperiorOverrideModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string;
  submissionType: string;
  currentStage: string;
  daysEscalated: number;
  onConfirm: (justification: string) => void;
}

export function SuperiorOverrideModal({
  isOpen,
  onClose,
  submissionId,
  submissionType,
  currentStage,
  daysEscalated,
  onConfirm,
}: SuperiorOverrideModalProps) {
  const [justification, setJustification] = useState("");
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!justification.trim() || !confirmationChecked) return;

    setIsSubmitting(true);
    try {
      await onConfirm(justification);
      // Reset form
      setJustification("");
      setConfirmationChecked(false);
      onClose();
    } catch (error) {
      console.error("Override failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setJustification("");
    setConfirmationChecked(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Superior Override - Escalated Approval
          </DialogTitle>
          <DialogDescription>
            This submission has been escalated for {daysEscalated} days. As an
            administrator, you can bypass the approval workflow.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Submission Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600">Submission ID</p>
                <p className="font-medium text-gray-900">{submissionId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Type</p>
                <p className="font-medium text-gray-900">{submissionType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Current Stage</p>
                <p className="font-medium text-gray-900">{currentStage}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Days Escalated</p>
                <p className="font-medium text-red-600">{daysEscalated} days</p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900 text-sm">
                  Administrator Override
                </h4>
                <p className="text-xs text-amber-800 mt-1">
                  This action will bypass the standard approval workflow and mark
                  this submission as approved. This action will be logged in the
                  audit trail and requires justification.
                </p>
              </div>
            </div>
          </div>

          {/* Justification */}
          <div className="space-y-2">
            <Label htmlFor="justification">
              Justification <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="justification"
              placeholder="Provide a detailed justification for bypassing the workflow (minimum 20 characters)..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              {justification.length}/200 characters
            </p>
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              id="confirmation"
              checked={confirmationChecked}
              onCheckedChange={(checked) =>
                setConfirmationChecked(checked as boolean)
              }
            />
            <Label
              htmlFor="confirmation"
              className="text-sm font-normal leading-tight cursor-pointer"
            >
              I understand that this action will bypass the approval workflow and
              will be permanently logged in the audit trail. I confirm that I have
              the authority to perform this action.
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !justification.trim() ||
              justification.length < 20 ||
              !confirmationChecked ||
              isSubmitting
            }
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirm Override
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
