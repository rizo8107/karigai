# Puck CMS - Components Reference

## ✅ What's Fixed

1. **Image Placeholders** - ProductGrid now shows real soap images from Unsplash
2. **All Components Added** - All 16 components from your blocks folder are now available
3. **Component Validation** - Editor filters out invalid components to prevent crashes
4. **Proper Styling** - Products show with bestseller badges, prices, and discounts

## 🎯 Available Components

### E-commerce Components (5)
1. **Hero** - Main hero banner with title, subtitle, background image, and CTA button
2. **ProductGrid** - Product grid with configurable columns (2-5), now showing real soap images
3. **CategorySection** - Display product categories
4. **OfferBanner** - Promotional banner for special offers
5. **BrandShowcase** - Showcase your brand logos and partners

### Marketing Components (3)
6. **FeatureSection** - Highlight features and benefits
7. **TestimonialSection** - Customer testimonials and reviews
8. **NewsletterSection** - Newsletter signup form

### Content Components (4)
9. **Text** - Rich text content with customizable styling
10. **Button** - Call-to-action buttons with links
11. **Image** - Images with captions and alt text
12. **Spacer** - Add vertical spacing between sections

### Layout Components (2)
13. **Container** - Content container with padding controls
14. **Grid** - Multi-column grid layout for organizing content

## 🎨 Product Grid Features

The ProductGrid component now includes:
- ✅ **Real Images** - Beautiful soap images from Unsplash
- ✅ **Bestseller Badges** - Highlight popular products
- ✅ **Price Display** - Show current price and original price
- ✅ **Discount Labels** - Automatic % OFF calculation
- ✅ **Hover Effects** - Smooth image zoom on hover
- ✅ **Responsive Grid** - 2, 3, 4, or 5 columns
- ✅ **Product Limit** - Control number of products shown (1-20)

### Sample Products Included:
1. Radiance Soap - ₹100 (20% OFF)
2. Charcoal Soap - ₹75 (25% OFF)
3. Aloevera Soap - ₹75 (25% OFF)
4. Menthol Soap - ₹85 (15% OFF)
5. Rice Water Kojic Soap - ₹120 (20% OFF)
6. Handmade Soap - ₹120 (20% OFF)
7. Ayurampam Soap - ₹75 (25% OFF)
8. Kuparimeni Soap - ₹75 (25% OFF)

## 📝 How to Use

### 1. Access the Editor
Visit: `http://localhost:8080/admin/pages/new/edit`

### 2. Drag & Drop Components
- Look for components in the left sidebar
- They're organized into 4 categories
- Drag any component to the canvas

### 3. Configure Components
- Click on any component to select it
- Edit properties in the right sidebar
- See changes in real-time

### 4. Save Your Page
- Click "Publish" to save
- Pages are stored in PocketBase

## 🔄 Connecting to Real Products

Currently showing sample data. To connect to your actual PocketBase products:

1. Update the ProductGrid component in:
   `src/puck/config/blocks/ProductGrid.tsx`

2. Replace the `sampleProducts` array with actual data fetching:
   ```tsx
   const [products, setProducts] = useState([]);
   
   useEffect(() => {
     const fetchProducts = async () => {
       const records = await pocketbase.collection('products').getList(1, limit || 8, {
         sort: '-created',
       });
       setProducts(records.items);
     };
     fetchProducts();
   }, [limit]);
   ```

3. Update image URLs to use PocketBase files:
   ```tsx
   <img
     src={pocketbase.files.getUrl(product, product.images[0])}
     alt={product.name}
   />
   ```

## 🎯 Next Steps

1. ✅ Test the editor with sample data
2. ⏳ Connect to real PocketBase products
3. ⏳ Create your first page
4. ⏳ Publish and view on frontend
5. ⏳ Add more custom components as needed

## 🐛 Troubleshooting

**If you see component errors:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Delete old pages from PocketBase
3. Refresh the editor
4. Start with a new page

**If images don't load:**
- Check your internet connection
- Unsplash images require internet access
- Replace with local images if needed

## 📚 Component Configuration

Each component is configured in:
`src/puck/config/blocks/[ComponentName].tsx`

Main config file:
`src/puck/config/complete.tsx`

---

**Happy Page Building! 🚀**
