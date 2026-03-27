"use client";
import { useState } from "react";
import { Paperclip } from "lucide-react";

interface EnergyUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: () => void;
}

export default function EnergyUploadModal({ open, onClose, onUpload }: EnergyUploadModalProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!open) return null;

  const handleFile = (file: File | null) => {
    if (file) setFileName(file.name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Energy Consumption Data</h2>

        {/* Drop zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            isDragging ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0] ?? null);
          }}
        >
          {fileName ? (
            <p className="text-sm text-green-700 font-medium">{fileName}</p>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-1">
                Choose a File or drag and drop it here (2MB)
              </p>
              <p className="text-xs text-gray-400 mb-4">PDF, CSV, XLSX</p>
              <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                <Paperclip className="h-4 w-4" />
                Select File
                <input
                  type="file"
                  accept=".pdf,.csv,.xlsx"
                  className="sr-only"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => { onUpload(); setFileName(null); }}
            className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Upload Energy Consumption Data
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-green-600 text-green-600 text-sm font-semibold rounded-lg hover:bg-green-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
