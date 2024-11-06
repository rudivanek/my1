import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (file: File) => void;
}

export function ImageUploader({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: ImageUploaderProps) {
  return (
    <div
      className={`border-3 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
        isDragging
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-300 bg-white hover:border-gray-400'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-gray-600">
          <p className="font-medium">Arrastra y suelta tu imagen aquí</p>
          <p className="text-sm">o</p>
        </div>
        <label className="px-4 py-2 bg-indigo-500 text-white rounded-lg cursor-pointer hover:bg-indigo-600 transition-colors">
          Explorar Archivos
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileSelect(file);
            }}
          />
        </label>
      </div>
    </div>
  );
}