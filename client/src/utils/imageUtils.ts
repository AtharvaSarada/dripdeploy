// Utility functions for handling images

/**
 * Check if a URL is a blob URL
 */
export const isBlobUrl = (url: string): boolean => {
  return url.startsWith('blob:');
};

/**
 * Get a safe image URL with fallback
 */
export const getSafeImageUrl = (url: string, fallback?: string): string => {
  if (!url) return fallback || '/placeholder-image.jpg';
  
  // If it's a blob URL, return fallback
  if (isBlobUrl(url)) {
    return fallback || '/placeholder-image.jpg';
  }
  
  // If it's a data URL (base64), return as is
  if (url.startsWith('data:')) {
    return url;
  }
  
  // If it's a regular URL, return as is
  return url;
};

/**
 * Get multiple safe image URLs
 */
export const getSafeImageUrls = (urls: string[], fallback?: string): string[] => {
  if (!urls || urls.length === 0) {
    return fallback ? [fallback] : ['/placeholder-image.jpg'];
  }
  
  return urls.map(url => getSafeImageUrl(url, fallback));
};

/**
 * Convert file to base64 data URL
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Convert multiple files to base64 data URLs
 */
export const filesToDataUrls = async (files: File[]): Promise<string[]> => {
  return Promise.all(files.map(fileToDataUrl));
};
