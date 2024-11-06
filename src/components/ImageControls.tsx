import React from 'react';
import { Lock, Unlock, Crop } from 'lucide-react';

interface ImageControlsProps {
  dimensions: { width: number; height: number };
  lockRatio: boolean;
  borderRadius: number;
  isCircle: boolean;
  enableCropping: boolean;
  onLockRatioChange: () => void;
  onDimensionsChange: (width: number, height: number) => void;
  onBorderRadiusChange: (radius: number) => void;
  onCircleChange: (isCircle: boolean) => void;
  onCroppingChange: (enable: boolean) => void;
  onStartCropping: () => void;
}

export function ImageControls({
  dimensions,
  lockRatio,
  borderRadius,
  isCircle,
  enableCropping,
  onLockRatioChange,
  onDimensionsChange,
  onBorderRadiusChange,
  onCircleChange,
  onCroppingChange,
  onStartCropping,
}: ImageControlsProps) {
  const aspectRatio = dimensions.width / dimensions.height;

  const handleWidthChange = (newWidth: number) => {
    if (lockRatio) {
      const newHeight = Math.round(newWidth / aspectRatio);
      onDimensionsChange(newWidth, newHeight);
    } else {
      onDimensionsChange(newWidth, dimensions.height);
    }
  };

  const handleHeightChange = (newHeight: number) => {
    if (lockRatio) {
      const newWidth = Math.round(newHeight * aspectRatio);
      onDimensionsChange(newWidth, newHeight);
    } else {
      onDimensionsChange(dimensions.width, newHeight);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-600">
            Redimensionar Imagen
          </label>
          <button
            onClick={onLockRatioChange}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            {lockRatio ? (
              <Lock className="w-4 h-4" />
            ) : (
              <Unlock className="w-4 h-4" />
            )}
            <span>{lockRatio ? 'Desbloquear' : 'Bloquear'} proporción</span>
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={dimensions.width}
            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
            className="w-20 px-2 py-1 border rounded"
            min="1"
          />
          <span className="text-gray-500">×</span>
          <input
            type="number"
            value={dimensions.height}
            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
            className="w-20 px-2 py-1 border rounded"
            min="1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600 block">
          Estilo de Imagen WebP
        </label>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isCircle"
                checked={isCircle}
                onChange={(e) => onCircleChange(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="isCircle" className="text-sm text-gray-600">
                Imagen Circular
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enableCropping"
                checked={enableCropping}
                onChange={(e) => {
                  onCroppingChange(e.target.checked);
                  if (e.target.checked) {
                    onStartCropping();
                  }
                }}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="enableCropping" className="text-sm text-gray-600 flex items-center gap-1">
                <Crop className="w-4 h-4" />
                Habilitar Recorte
              </label>
            </div>
          </div>
        </div>
        {!isCircle && (
          <div className="space-y-1">
            <label className="text-sm text-gray-600 block">
              Radio del Borde: {borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={borderRadius}
              onChange={(e) => onBorderRadiusChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}