import { Check, Play, Image as ImageIcon } from 'lucide-react';
import { type Product } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
import { VideoPlayerFallback } from '@/components/ui/video-player-fallback';
import { VideoPlayer } from '@/components/ui/video-player';
import { pocketbase, Collections } from '@/lib/pocketbase';
import { getOrderConfig, type OrderDetailsConfig } from '@/lib/order-config-service';

import { getPocketBaseImageUrl } from '@/utils/imageOptimizer';

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string | undefined): string | null => {
  if (!url) return null;
  
  // Match YouTube URL patterns
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  return null;
};

// Helper function to check if URL is a YouTube video
const isYouTubeUrl = (url: string | undefined): boolean => {
  return !!getYouTubeVideoId(url);
};

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (url: string | undefined): string => {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return '';
};

// Helper function to check if URL is a direct video file
const isVideoFileUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  
  // Check for common video file extensions
  const videoExtensions = ['.mp4', '.mov', '.webm', '.ogg', '.avi', '.wmv', '.m4v', '.mpg', '.mpeg'];
  return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

// Helper function to check if URL is a PocketBase file
const isPocketBaseFileUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  
  // Check if it's a PocketBase file URL pattern (contains /api/files/)
  return url.includes('/api/files/') || (url && !url.startsWith('http'));
};

// Helper function to extract record ID and filename from PocketBase URL
const extractPocketBaseFileInfo = (url: string | undefined): { recordId: string, filename: string } | null => {
  if (!url) return null;
  
  // If it's a full URL with /api/files/ pattern
  if (url.includes('/api/files/')) {
    const parts = url.split('/api/files/')[1].split('/');
    if (parts.length >= 3) {
      const collection = parts[0];
      const recordId = parts[1];
      const filename = parts.slice(2).join('/');
      return { recordId, filename };
    }
  } 
  // If it's a relative URL in format recordId/filename
  else if (url.includes('/')) {
    const [recordId, ...filenameParts] = url.split('/');
    const filename = filenameParts.join('/');
    if (recordId && filename) {
      return { recordId, filename };
    }
  }
  
  return null;
};

// Helper function to get the full PocketBase file URL
const getPocketBaseFileUrl = (url: string | undefined): string => {
  if (!url) return '';
  
  // If it's already a full URL, return it
  if (url.startsWith('http')) {
    return url;
  }
  
  // Otherwise, construct the full URL using PocketBase baseUrl
  const baseUrl = pocketbase.baseUrl.endsWith('/') 
    ? pocketbase.baseUrl.slice(0, -1) 
    : pocketbase.baseUrl;
    
  return `${baseUrl}/api/files/${Collections.PRODUCTS}/${url}`;
};

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(true);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [orderConfig, setOrderConfig] = useState<OrderDetailsConfig | null>(null);

  // Load backend-driven toggles for product sections
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const cfg = await getOrderConfig({ forceRefresh: true });
        if (mounted) setOrderConfig(cfg);
      } catch (e) {
        // ignore; defaults will show sections
        if (mounted) setOrderConfig(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Generate or fetch thumbnail for the video
  useEffect(() => {
    if (!product?.videoUrl) return;
    
    setThumbnailLoading(true);
    setThumbnailError(false);
    
    // First priority: Check if there's a dedicated videoThumbnail field
    if (product.videoThumbnail) {
      try {
        // Get the file extension to determine format
        const fileExtension = product.videoThumbnail.split('.').pop()?.toLowerCase() || '';
        let format: 'webp' | 'jpeg' | 'png' | 'avif' = 'webp';
        
        // Set format based on file extension
        if (fileExtension === 'png') format = 'png';
        else if (fileExtension === 'jpg' || fileExtension === 'jpeg') format = 'jpeg';
        else if (fileExtension === 'avif') format = 'avif';
        
        // Use the same approach as the video URL construction
        // First check if the videoThumbnail is already a full URL
        if (product.videoThumbnail.startsWith('http')) {
          setThumbnailUrl(product.videoThumbnail);
          console.log('Using full URL video thumbnail:', product.videoThumbnail);
        } else {
          // Otherwise construct the URL using the same pattern as getPocketBaseFileUrl
          const baseUrl = pocketbase.baseUrl.endsWith('/') 
            ? pocketbase.baseUrl.slice(0, -1) 
            : pocketbase.baseUrl;
          
          // Use the direct URL approach that's known to work
          const videoThumbnail = `${baseUrl}/api/files/${Collections.PRODUCTS}/${product.id}/${product.videoThumbnail}`;
          setThumbnailUrl(videoThumbnail);
          console.log('Using constructed video thumbnail URL:', videoThumbnail);
        }
        
        setThumbnailLoading(false);
      } catch (error) {
        console.error('Error using dedicated video thumbnail:', error);
        setThumbnailError(true);
        setThumbnailLoading(false);
      }
    }
    // Second priority: For YouTube videos, get the thumbnail from YouTube
    else if (isYouTubeUrl(product.videoUrl)) {
      const videoId = getYouTubeVideoId(product.videoUrl);
      if (videoId) {
        // YouTube provides several thumbnail options
        setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        setThumbnailLoading(false);
      }
    } 
    // Third priority: For PocketBase videos
    else if (isPocketBaseFileUrl(product.videoUrl)) {
      // If product has images, use the first one as thumbnail
      if (product.images && product.images.length > 0) {
        try {
          // Use the optimized image utility to get a proper thumbnail
          const thumbnailImage = getPocketBaseImageUrl(
            product.images[0], 
            Collections.PRODUCTS, 
            "medium", 
            "webp"
          );
          setThumbnailUrl(thumbnailImage);
          setThumbnailLoading(false);
          console.log('Using product image as video thumbnail:', thumbnailImage);
        } catch (error) {
          console.error('Error generating thumbnail from product image:', error);
          setThumbnailError(true);
          setThumbnailLoading(false);
        }
      } else {
        // Fallback to direct URL
        setThumbnailUrl(getPocketBaseFileUrl(product.videoUrl));
        console.log('Using direct video URL as thumbnail:', product.videoUrl);
        setThumbnailLoading(false);
      }
    }
    // For other videos, just use a generic thumbnail
    else {
      setThumbnailUrl(null);
      setThumbnailLoading(false);
    }
  }, [product?.videoUrl, product?.images]);

  if (!product) {
    return null;
  }

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };
  
  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Mobile Card-based UI - hidden on desktop */}
      <div className="md:hidden">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Description</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-600 leading-relaxed text-sm">{product.description || 'No description available.'}</p>
          </div>
        </div>
      </div>

      {/* Desktop sections - hidden on mobile */}
      <div className="hidden md:block space-y-6">
        {/* Product Video */}
        {product.videoUrl && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Product Video</h3>
            </div>
          <div className="p-6">
            <div className="relative w-full bg-gray-50 rounded-xl overflow-hidden aspect-video">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 rounded-xl">
                  {thumbnailLoading ? (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-gray-500 font-medium">Loading thumbnail...</p>
                    </div>
                  ) : thumbnailError || !thumbnailUrl ? (
                    <div className="flex flex-col items-center justify-center space-y-3 p-6">
                      <ImageIcon size={56} className="text-gray-300" />
                      <p className="text-sm text-gray-500 font-medium text-center">Product Video</p>
                    </div>
                  ) : (
                    <img 
                      src={thumbnailUrl} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover rounded-xl"
                      onError={() => setThumbnailError(true)}
                    />
                  )}
                  
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300 group rounded-xl"
                    aria-label="Play video"
                  >
                    <div className="w-16 h-16 rounded-full bg-white shadow-lg group-hover:shadow-xl group-hover:scale-105 flex items-center justify-center transition-all duration-300">
                      <Play size={28} className="text-primary ml-1" />
                    </div>
                  </button>
                </div>
              ) : (
                isYouTubeUrl(product.videoUrl) ? (
                  <iframe
                    src={`${getYouTubeEmbedUrl(product.videoUrl)}${isVideoPlaying ? '?autoplay=1' : ''}`}
                    title="YouTube video player"
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : isPocketBaseFileUrl(product.videoUrl) || isVideoFileUrl(product.videoUrl) ? (
                  <div className="z-[90] relative rounded-xl overflow-hidden" style={{ position: 'relative', zIndex: 90 }}>
                    <VideoPlayer 
                      src={isPocketBaseFileUrl(product.videoUrl) ? getPocketBaseFileUrl(product.videoUrl) : product.videoUrl}
                      onClose={() => setIsVideoPlaying(false)}
                    />
                  </div>
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <iframe
                      src={`${product.videoUrl}${product.videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
                      title="Product video"
                      className="w-full h-full rounded-xl"
                      style={{ maxHeight: 'calc(100% - 60px)', aspectRatio: 'auto' }}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

        {/* Show a minimal placeholder while config loads to avoid flashing sections */}
        {orderConfig === null && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded-lg"></div>
          </div>
        )}
        
        {/* Product Description */}
        {product.description && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Description</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        )}

        {/* Product Specifications */}
        {orderConfig && orderConfig.showProductSpecifications !== false && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Specifications</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Material', value: product.specifications?.material || product.material },
                { label: 'Dimensions', value: product.specifications?.dimensions || product.dimensions },
                { label: 'Weight', value: product.specifications?.weight || 'Standard' },
                { label: 'Capacity', value: product.specifications?.capacity || 'Standard' },
                { label: 'Style', value: product.specifications?.style || 'Modern' },
                { label: 'Pattern', value: product.specifications?.pattern || 'Solid' },
                { label: 'Closure', value: product.specifications?.closure || 'Standard' },
                { label: 'Water Resistant', value: product.specifications?.waterResistant ? 'Yes' : 'No' }
              ].filter(spec => spec.value && spec.value !== 'Standard').map((spec, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-600 font-medium">{spec.label}</span>
                  <span className="text-gray-900 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Care Instructions */}
        {orderConfig && orderConfig.showCareInstructions !== false && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Care Instructions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Cleaning
                </h4>
                <ul className="space-y-3">
                  {(product.care_instructions?.cleaning || product.care || [
                    'Spot clean with mild soap and water',
                    'Do not machine wash',
                    'Air dry in shade',
                    'Do not bleach'
                  ]).map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Storage
                </h4>
                <ul className="space-y-3">
                  {(product.care_instructions?.storage || [
                    'Store in a cool, dry place',
                    'Avoid direct sunlight',
                    'Keep away from moisture',
                    'Use dust bag when not in use'
                  ]).map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Features and Benefits */}
        {orderConfig && orderConfig.showFeaturesAndBenefits !== false && product.features && product.features.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Key Features</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-gray-600 leading-relaxed font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}

        {/* Usage Guidelines */}
        {orderConfig && orderConfig.showUsageGuidelines !== false && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Usage Guidelines</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Recommended Use
                </h4>
                <ul className="space-y-3">
                  {(product.usage_guidelines?.recommended_use || [
                    'Distribute weight evenly for better durability',
                    'Clean spills immediately to prevent staining',
                    'Use internal pockets for organization',
                    'Avoid overloading beyond capacity'
                  ]).map((guideline, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Pro Tips
                </h4>
                <ul className="space-y-3">
                  {(product.usage_guidelines?.pro_tips || [
                    'Use bag hooks when placing on floors',
                    'Rotate usage to maintain shape',
                    'Store stuffed to maintain structure',
                    'Apply water repellent spray for protection'
                  ]).map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};