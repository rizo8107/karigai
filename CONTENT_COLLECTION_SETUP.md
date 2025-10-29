# 🚀 Quick Setup Guide - Content Collection

## ✅ What I Built For You

A complete image management system for your Puck CMS that lets you upload and manage all images in one place!

## 📋 Step 1: Create PocketBase Collection

Go to your PocketBase admin and create a collection:

**Collection Name:** `content`

**Fields:**
1. `Images` 
   - Type: File
   - Multiple: Yes (allow multiple files)
   - Accept: Image files only

2. `Videos`
   - Type: File  
   - Multiple: Yes (allow multiple files)
   - Accept: Video files only

## 📁 Step 2: Files Created

I've created these new files for you:

### 1. **Content Service** 
`src/lib/content-service.ts`
- Upload images/videos
- Fetch content items
- Generate optimized URLs
- Delete content

### 2. **Image Selector Field**
`src/puck/fields/ImageSelector.tsx`
- Custom Puck field
- Upload interface
- Image gallery browser
- Visual selection

## 🎨 Step 3: Use in Components

### Example: Update Hero Component

**Before:**
```typescript
fields: {
  backgroundImage: {
    type: "text",
    label: "Background Image URL",
  },
}
```

**After:**
```typescript
import { ImageSelector } from '@/puck/fields/ImageSelector';

fields: {
  backgroundImage: ImageSelector,  // Just replace with this!
}
```

That's it! Now users can:
- ✅ Upload images directly
- ✅ Browse image library
- ✅ Click to select images
- ✅ Or paste URLs manually

## 🖼️ What Users Will See

When clicking on an image field in Puck:

1. **Upload Button** - Upload new images
2. **Current Selection** - Preview of selected image
3. **Image Library** - Grid of all uploaded images (click to select)
4. **Manual Input** - Fallback URL input

## 💡 Components to Update

Replace `type: "text"` with `ImageSelector` in these components:

**High Priority:**
- [ ] Hero - `backgroundImage`
- [ ] Image - `url` 
- [ ] OfferBanner - `backgroundImage`
- [ ] CategorySection - category images

**Optional:**
- [ ] FeatureSection - icons/images
- [ ] TestimonialSection - avatars
- [ ] Container - background images

## 🔧 Example Usage in Code

```typescript
// Import the ImageSelector
import { ImageSelector } from '@/puck/fields/ImageSelector';

// Use in any component
export const MyComponent = {
  fields: {
    heroImage: ImageSelector,
    logoImage: ImageSelector,
    backgroundImage: ImageSelector,
    // ... other fields
  },
  render: ({ heroImage }) => (
    <img src={heroImage} alt="Hero" />
  ),
};
```

## 🎯 Benefits

### For Content Editors
- ✅ Upload images directly in editor
- ✅ Visual image library
- ✅ No need for external image hosting
- ✅ Reuse images across pages
- ✅ One-click selection

### For Developers
- ✅ Automatic image optimization
- ✅ Centralized media management
- ✅ PocketBase integration
- ✅ Clean, simple API

## 📸 Image Optimization

Images are automatically optimized:
- **Formats:** AVIF, WebP, JPEG
- **Sizes:** Thumbnail (100px), Small (300px), Medium (600px), Large (1200px)
- **Quality:** 80% (good balance)

**Example URL:**
```
https://your-pb.com/api/files/content/RECORD_ID/image.jpg?thumb=600x0&format=webp&quality=80
```

## 🔄 How It Works

1. User clicks image field in Puck
2. Image selector UI opens
3. User uploads or selects image
4. Image URL stored in page data
5. Image served from PocketBase

## 📚 Full Documentation

See `PUCK_CONTENT_COLLECTION.md` for:
- Detailed API reference
- Advanced usage examples
- Custom implementations
- Security considerations

---

**Ready to use!** Start by creating the `content` collection in PocketBase, then update your components to use `ImageSelector`! 🎉
