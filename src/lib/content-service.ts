import { pocketbase } from './pocketbase';

export interface ContentItem {
  id: string;
  collectionId: string;
  collectionName: string;
  Images?: string | string[];
  Videos?: string | string[];
  created: string;
  updated: string;
}

/**
 * Get all content items (images and videos)
 */
export async function getContentItems(): Promise<ContentItem[]> {
  try {
    const records = await pocketbase.collection('content').getFullList<ContentItem>({
      sort: '-created',
    });
    return records;
  } catch (error) {
    console.error('Error fetching content:', error);
    return [];
  }
}

/**
 * Upload an image to the content collection
 */
export async function uploadImage(file: File): Promise<ContentItem | null> {
  try {
    const formData = new FormData();
    formData.append('Images', file);
    
    const record = await pocketbase.collection('content').create<ContentItem>(formData);
    return record;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

/**
 * Upload a video to the content collection
 */
export async function uploadVideo(file: File): Promise<ContentItem | null> {
  try {
    const formData = new FormData();
    formData.append('Videos', file);
    
    const record = await pocketbase.collection('content').create<ContentItem>(formData);
    return record;
  } catch (error) {
    console.error('Error uploading video:', error);
    return null;
  }
}

/**
 * Get the full URL for an image from the content collection
 */
export function getContentImageUrl(record: ContentItem, filename?: string | string[]): string {
  const f = filename !== undefined ? filename : record.Images;
  if (!f) return '';
  const file = Array.isArray(f) ? (f[0] || '') : f;
  if (!file) return '';
  return pocketbase.files.getURL(record as any, file as string) as unknown as string;
}

/**
 * Get the full URL for a video from the content collection
 */
export function getContentVideoUrl(record: ContentItem, filename?: string | string[]): string {
  const f = filename !== undefined ? filename : record.Videos;
  if (!f) return '';
  const file = Array.isArray(f) ? (f[0] || '') : f;
  if (!file) return '';
  return pocketbase.files.getURL(record as any, file as string) as unknown as string;
}

/**
 * Delete a content item
 */
export async function deleteContentItem(id: string): Promise<boolean> {
  try {
    await pocketbase.collection('content').delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting content:', error);
    return false;
  }
}

/**
 * Get optimized image URL from content collection
 * @param record Content record
 * @param size Image size (thumbnail, small, medium, large)
 * @param format Image format (avif, webp, jpeg)
 */
export function getOptimizedContentImageUrl(
  record: ContentItem,
  size: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium',
  format: 'avif' | 'webp' | 'jpeg' = 'webp'
): string {
  if (!record.Images) return '';
  const first = Array.isArray(record.Images) ? (record.Images[0] || '') : record.Images;
  if (!first) return '';
  const sizeMap = {
    thumbnail: 100,
    small: 300,
    medium: 600,
    large: 1200,
  };
  
  const baseUrl = pocketbase.files.getURL(record as any, first as string) as unknown as string;
  const width = sizeMap[size];
  
  // Add optimization parameters
  const params = new URLSearchParams({
    thumb: `${width}x0`,
    format,
    quality: '80',
  });
  
  return `${baseUrl}?${params.toString()}`;
}
