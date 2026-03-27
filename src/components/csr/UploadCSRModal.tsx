"use client";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X, CheckCircle } from "lucide-react";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  status: "uploading" | "success";
  progress: number;
}

interface UploadCSRModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

export default function UploadCSRModal({
  open,
  onClose,
  onUpload,
}: UploadCSRModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(
      (file) =>
        file.type === "text/csv" ||
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".xlsx")
    );

    validFiles.forEach((file) => {
      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type.includes("spreadsheet") || file.name.endsWith(".xlsx")
          ? "xlsx"
          : "csv",
        status: "uploading",
        progress: 0,
      };

      setUploadedFiles((prev) => [...prev, newFile]);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.name === file.name
                ? { ...f, progress, status: progress === 100 ? "success" : "uploading" }
                : f
            )
          );
        }
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const handleUpload = () => {
    onClose();
    setUploadedFiles([]);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "csv":
        return <div className="w-10 h-10 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold">CSV</div>;
      case "xlsx":
        return <div className="w-10 h-10 rounded bg-green-600 text-white flex items-center justify-center text-xs font-bold">XLSX</div>;
      default:
        return <div className="w-10 h-10 rounded bg-gray-500 text-white flex items-center justify-center text-xs font-bold">FILE</div>;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Upload Community Engagement and CSR Tracking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors"
          >
            <div className="flex flex-col items-center">
              <p className="text-gray-600 mb-1">
                Choose a File or drag and drop it here (2MB)
              </p>
              <p className="text-gray-500 text-sm mb-4">CSV, XLSX</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Select File
              </Button>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-4">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center gap-4">
                    {getFileIcon(file.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Upload File</span>
                        <button
                          onClick={() => removeFile(file.name)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      {file.status === "uploading" ? (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-600">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              | {file.progress}% completed
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-green-600 h-1.5 rounded-full transition-all"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Upload Successful
                          </span>
                          <span className="text-sm text-gray-500">
                            File Title: {file.name} | {formatFileSize(file.size)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 justify-center pt-4">
            <Button
              type="button"
              onClick={handleUpload}
              disabled={uploadedFiles.length === 0}
              className="px-12"
            >
              Upload CSR Data
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-12"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
