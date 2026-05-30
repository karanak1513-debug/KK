// lib/storage.ts

export async function uploadImage(
  file: File,
  path: string,
  onProgress?: (pct: number) => void
): Promise<string> {
  // Simulate progress
  onProgress?.(30);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        onProgress?.(60);
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const max = 800; // max dimension

        if (width > height && width > max) {
          height = Math.round(height * (max / width));
          width = max;
        } else if (height > max) {
          width = Math.round(width * (max / height));
          height = max;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          onProgress?.(100);
          // Compress to JPEG with 0.7 quality to keep size small (~40-80KB)
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function deleteImage(url: string): Promise<void> {
  // Since images are stored as Base64 strings within the Firestore document,
  // deleting the image string from the array during product update is sufficient.
  // There is no physical storage file to delete.
  return Promise.resolve();
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

