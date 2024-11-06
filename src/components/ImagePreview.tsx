import React from 'react';
import { Download, Image as ImageIcon, X, Upload, Crop } from 'lucide-react';
import { formatFileSize } from '../utils/formatters';

interface ImagePreviewProps {
  originalImage: File;
  convertedUrl: string | null;
  convertedSize: number;
  onReset: () => void;
  onDownload: () => void;
  dimensions: { width: number; height: number };
  onNewImage: (file: File) => void;
  borderRadius: number;
  isCircle: boolean;
  enableCropping: boolean;
  onStartCropping: () => void;
}

export function ImagePreview({
  originalImage,
  convertedUrl,
  convertedSize,
  onReset,
  onDownload,
  dimensions,
  onNewImage,
  borderRadius,
  isCircle,
  enableCropping,
  onStartCropping,
}: ImagePreviewProps) {
  const originalSize = originalImage.size;
  const compressionRatio = ((originalSize - convertedSize) / originalSize * 100).toFixed(1);

  const handleNewImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onNewImage(file);
    }
  };

  const getImageStyle = () => {
    if (isCircle) {
      return 'rounded-full';
    }
    return borderRadius > 0 ? `rounded-[${borderRadius}px]` : '';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Vista Previa
        </h2>
        <button
          onClick={onReset}
          className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-600">Original</p>
          <div 
            className="bg-gray-50 rounded-lg p-4 flex items-center justify-center min-h-[200px] cursor-pointer"
            onClick={enableCropping ? onStartCropping : undefined}
          >
            <img
              src={URL.createObjectURL(originalImage)}
              alt="Original"
              className="max-w-full h-auto"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Tamaño: {formatFileSize(originalSize)}
            </p>
            <p className="text-sm text-gray-500">
              Dimensiones: {dimensions.width} x {dimensions.height}px
            </p>
          </div>
        </div>

        {convertedUrl && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-600">Convertida (WebP)</p>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
              <img
                src={convertedUrl}
                alt="Convertida"
                className={`max-w-full h-auto ${getImageStyle()}`}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Tamaño: {formatFileSize(convertedSize)}
              </p>
              <p className="text-sm text-green-600">
                Espacio ahorrado: {compressionRatio}%
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={onDownload}
                className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar WebP
              </button>
              <label className="w-full px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Subir Nueva Imagen
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleNewImageUpload}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}