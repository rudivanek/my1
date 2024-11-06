export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(file);
  });
}

export async function convertToWebP(
  file: File,
  targetWidth: number,
  targetHeight: number,
  isCircle: boolean = false,
  borderRadius: number = 0
): Promise<{ url: string; size: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      
      // Set canvas size
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      const ctx = canvas.getContext('2d')!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Calculate dimensions to maintain aspect ratio
      const aspectRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (aspectRatio > canvasRatio) {
        drawWidth = canvas.height * aspectRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / aspectRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      // Apply circular or border radius clipping
      ctx.beginPath();
      if (isCircle) {
        const radius = Math.min(canvas.width, canvas.height) / 2;
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          radius,
          0,
          Math.PI * 2
        );
      } else if (borderRadius > 0) {
        const radius = borderRadius;
        ctx.moveTo(radius, 0);
        ctx.lineTo(canvas.width - radius, 0);
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
        ctx.lineTo(canvas.width, canvas.height - radius);
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
        ctx.lineTo(radius, canvas.height);
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
      } else {
        ctx.rect(0, 0, canvas.width, canvas.height);
      }
      ctx.closePath();
      ctx.clip();

      // Draw the image
      ctx.drawImage(
        img,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({
              url: URL.createObjectURL(blob),
              size: blob.size
            });
          }
        },
        'image/webp',
        0.92
      );
    };
    img.src = URL.createObjectURL(file);
  });
}