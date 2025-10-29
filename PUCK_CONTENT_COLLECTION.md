# 📸 Puck CMS - Content Collection Integration

## ✅ What's New

I've integrated a **PocketBase content collection** system that allows you to upload and manage all images/videos in one place, then use them throughout your Puck components.

## 🗄️ PocketBase Collection Setup

### Create the `content` Collection

In your PocketBase admin, create a new collection called `content` with these fields:

```
Collection Name: content
Fields:
├── Images (file) - Multiple files allowed, Image files only
└── Videos (file) - Multiple files allowed, Video files only
```

**Collection Schema:**
```json
{
  "id": "string",
  "collectionId": "pbc_1872121667",
  "collectionName": "content",
  "Images": "filename.jpg",
  "Videos": "filename.mp4",
  "created": "2022-01-01 10:00:00.123Z",
  "updated": "2022-01-01 10:00:00.123Z"
}
```

## 📁 New Files Created

### 1. Content Service (`src/lib/content-service.ts`)

Provides functions to interact with the content collection:

**Functions:**
- `getContentItems()` - Fetch all content items
- `uploadImage(file)` - Upload a new image
- `uploadVideo(file)` - Upload a new video
- `getContentImageUrl(record, filename)` - Get full URL for an image
- `getContentVideoUrl(record, filename)` - Get full URL for a video
- `deleteContentItem(id)` - Delete a content item
- `getOptimizedContentImageUrl(record, size, format)` - Get optimized image URL

**Example Usage:**
```typescript
import { getContentItems, uploadImage, getContentImageUrl } from '@/lib/content-service';

// Fetch all images
const items = await getContentItems();

// Upload new image
const file = document.querySelector('input[type="file"]').files[0];
const record = await uploadImage(file);

// Get image URL
const imageUrl = getContentImageUrl(record);
```

### 2. Image Selector Field (`src/puck/fields/ImageSelector.tsx`)

A custom Puck field that provides a beautiful UI for:
- ✅ Uploading new images
- ✅ Browsing existing images from library
- ✅ Selecting images from gallery
- ✅ Manual URL input (fallback)

**Features:**
- Thumbnail previews
- Upload with drag & drop
- Visual selection with checkmarks
- Loading states
- Optimized images

## 🎨 How to Use in Components

### Update Hero Component Example

Here's how to use the ImageSelector in your components:

```typescript
import { ImageSelector } from '@/puck/fields/ImageSelector';

export const Hero = {
  fields: {
    backgroundImage: ImageSelector, // Instead of { type: "text" }
    // ... other fields
  },
  defaultProps: {
    backgroundImage: "",
  },
  render: ({ backgroundImage }) => (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* ... */}
    </div>
  ),
};
```

### Update Image Component Example

```typescript
export const Image = {
  fields: {
    imageUrl: ImageSelector, // Use custom field
    alt: { type: "text", label: "Alt Text" },
  },
  render: ({ imageUrl, alt }) => (
    <img src={imageUrl} alt={alt} />
  ),
};
```

## 🖼️ Image Selector UI Features

When you click on an image field in Puck, you'll see:

### 1. **Upload Section**
- Click "Upload New Image" button
- Select an image from your computer
- Image uploads to PocketBase `content` collection
- Automatically selected after upload

### 2. **Current Selection**
- Shows preview of currently selected image
- Displays the image URL
- Updates in real-time

### 3. **Image Library**
- Grid of all uploaded images
- Click any image to select it
- Selected image shows checkmark overlay
- Scrollable gallery if many images

### 4. **Manual URL Input**
- Fallback option to paste external URLs
- Useful for images hosted elsewhere
- Works with any image URL

## 🔄 URL Generation

Images uploaded to the `content` collection are automatically optimized:

```
Original:
https://your-pocketbase.com/api/files/content/RECORD_ID/image.jpg

Optimized:
https://your-pocketbase.com/api/files/content/RECORD_ID/image.jpg?thumb=600x0&format=webp&quality=80
```

**Optimization Options:**
- `thumbnail` - 100px wide
- `small` - 300px wide
- `medium` - 600px wide (default)
- `large` - 1200px wide

**Formats:**
- `avif` - Best compression (modern browsers)
- `webp` - Good compression (most browsers)
- `jpeg` - Universal fallback

## 📝 Components to Update

Update these components to use `ImageSelector`:

### High Priority (Image Fields)
1. ✅ **Hero** - `backgroundImage` field
2. ✅ **Image** - `url` field  
3. ✅ **OfferBanner** - `backgroundImage` field
4. ✅ **CategorySection** - `image` field for each category
5. ✅ **BrandShowcase** - `logo` fields

### Medium Priority (Optional Images)
6. **FeatureSection** - icon/image fields
7. **TestimonialSection** - avatar images
8. **Container** - optional background images

## 🚀 Benefits

### Before (URL Input)
- ❌ Users had to host images elsewhere
- ❌ Manual URL copy/paste
- ❌ No image library
- ❌ No upload interface
- ❌ Hard to manage images

### After (Content Collection)
- ✅ Upload images directly in Puck
- ✅ Visual image library
- ✅ Click to select
- ✅ Centralized image management
- ✅ Automatic optimization
- ✅ Reuse images across pages

## 📖 Example Workflow

1. **Open Puck Editor**
   - Visit: `/admin/pages/new/edit`

2. **Add Hero Component**
   - Drag Hero from sidebar

3. **Upload Background Image**
   - Click on `backgroundImage` field
   - Click "Upload New Image"
   - Select image from computer
   - Image uploads and appears in library
   - Automatically selected

4. **Or Select from Library**
   - Browse uploaded images
   - Click to select any image
   - Preview updates instantly

5. **Publish Page**
   - Image URL saved to page data
   - Image served from PocketBase

## 🛠️ Advanced Usage

### Custom Image Sizes

```typescript
import { getOptimizedContentImageUrl } from '@/lib/content-service';

// Get thumbnail (100px)
const thumb = getOptimizedContentImageUrl(record, 'thumbnail', 'webp');

// Get large (1200px) in AVIF
const large = getOptimizedContentImageUrl(record, 'large', 'avif');
```

### Multiple Images

For components that need multiple images:

```typescript
export const Gallery = {
  fields: {
    images: {
      type: "array",
      arrayFields: {
        image: ImageSelector,
      },
    },
  },
};
```

### Video Support

The content collection also supports videos:

```typescript
import { uploadVideo, getContentVideoUrl } from '@/lib/content-service';

// Upload video
const videoRecord = await uploadVideo(videoFile);

// Get video URL
const videoUrl = getContentVideoUrl(videoRecord);
```

## 🔒 Security

Images uploaded through the content collection:
- ✅ Stored in PocketBase
- ✅ Served with proper CORS headers
- ✅ Cached for performance
- ✅ Can be protected with PocketBase rules

## 📊 Image Management

### View All Content
Create a simple admin page to manage your content:

```typescript
import { getContentItems, deleteContentItem } from '@/lib/content-service';

// List all images
const items = await getContentItems();

// Delete an image
await deleteContentItem(itemId);
```

---

**Your Puck CMS now has a professional image management system!** 🎉

Upload, browse, and select images directly within the editor - no external hosting needed!
