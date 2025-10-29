import { useState, useEffect } from 'react';
import { CustomField } from '@measured/puck';
import { getContentItems, uploadImage, getContentImageUrl, ContentItem } from '@/lib/content-service';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

// Wrapper component that can use hooks
const ImageSelectorContent = ({ value, onChange }: { value?: string; onChange: (value: string) => void }) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

    const loadImages = async () => {
      setLoading(true);
      const items = await getContentItems();
      setContentItems(items.filter(item => item.Images));
      setLoading(false);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setUploading(true);
      const record = await uploadImage(file);
      
      if (record && record.Images) {
        const imageUrl = getContentImageUrl(record, record.Images);
        onChange(imageUrl);
        await loadImages();
      } else {
        alert('Failed to upload image');
      }
      
      setUploading(false);
    };

    return (
      <div className="space-y-4">
        {/* Upload Button */}
        <div>
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={uploading}
              onClick={(e) => {
                e.preventDefault();
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                input?.click();
              }}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Image
                </>
              )}
            </Button>
          </label>
        </div>

        {/* Current Selection */}
        {value && (
          <div className="border rounded-lg p-2">
            <p className="text-xs text-muted-foreground mb-2">Current Image:</p>
            <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
              <img 
                src={value} 
                alt="Selected" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs mt-2 truncate">{value}</p>
          </div>
        )}

        {/* Image Gallery */}
        <div>
          <p className="text-sm font-medium mb-2">Or select from library:</p>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : contentItems.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto border rounded-lg p-2">
              {contentItems.map((item) => {
                const imageUrl = getContentImageUrl(item, item.Images);
                const isSelected = value === imageUrl;
                
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChange(imageUrl)}
                    className={`relative aspect-square bg-gray-100 rounded overflow-hidden border-2 transition-all ${
                      isSelected 
                        ? 'border-primary shadow-md' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt="Content"
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-white rounded-full p-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-muted-foreground">No images uploaded yet</p>
            </div>
          )}
        </div>

        {/* Manual URL Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Or enter URL manually:</label>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    );
};

// Puck field that uses the wrapper component
export const ImageSelector: CustomField<string | undefined> = {
  type: 'custom',
  render: ({ value, onChange }) => {
    return <ImageSelectorContent value={value} onChange={onChange} />;
  },
};

export default ImageSelector;
