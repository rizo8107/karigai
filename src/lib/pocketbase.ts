import PocketBase, { type RecordModel } from 'pocketbase';
export type { RecordModel };

console.log('Initializing PocketBase client with URL:', import.meta.env.VITE_POCKETBASE_URL);

// Initialize PocketBase instance
export const pocketbase = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090');

// Check if superuser credentials are provided and authenticate if they are
const initSuperUserAuth = async () => {
  const email = import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL;
  const password = import.meta.env.VITE_POCKETBASE_ADMIN_PASSWORD;
  
  if (email && password) {
    try {
      console.log('Authenticating as superuser with provided credentials');
      await pocketbase.admins.authWithPassword(email, password);
      console.log('Superuser authentication successful');
    } catch (error: unknown) {
      console.error('Failed to authenticate as superuser:', error);
    }
  } else {
    console.log('No superuser credentials found in environment variables');
  }
};

// Initialize superuser authentication
initSuperUserAuth();

// Export collection names as constants
export enum Collections {
    PRODUCTS = 'products',
    USERS = 'users',
    ORDERS = 'orders',
    ADDRESSES = 'addresses',
    CARTS = 'carts',
    ASSETS = 'assets',
    SLIDER_IMAGES = 'slider_images',
    THEME_SETTINGS = 'theme_settings'
}

// Type definitions for PocketBase records
export interface ProductRecord {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    list_order?: number;
    colors: Array<{
        name: string;
        value: string;
        hex: string;
    }>;
    features: string[];
    dimensions: string;
    material: string;
    care: string[];
    category: string;
    tags: string[];
    bestseller: boolean;
    new: boolean;
    inStock: boolean;
    reviews?: number;
    created: string;
    updated: string;
}

export interface UserRecord {
    id: string;
    email: string;
    name: string;
    phone?: string;
    address?: string;
    created: string;
    updated: string;
}

export interface OrderRecord {
    id: string;
    user: string; // References users.id
    products: Array<{
        productId: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: string;
    created: string;
    updated: string;
}

export interface AddressRecord {
    id: string;
    user: string; // References users.id
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    created: string;
    updated: string;
}

export interface User extends RecordModel {
    email: string;
    name: string;
    avatar?: string;
    phone?: string;
}

export interface Product extends RecordModel {
    $id: string;
    name: string;
    description: string;
    price: number;
    original_price?: number;
    images: string[];
    list_order?: number;
    colors: ProductColor[];
    features: string[];
    dimensions: string;
    material: string;
    care: string[];
    category: string;
    tags: string[];
    bestseller: boolean;
    new: boolean;
    inStock: boolean;
    reviews?: number;
    createdAt?: string;
    updatedAt?: string;
    videoUrl?: string;
    videoThumbnail?: string;
    videoDescription?: string;
    specifications: {
        material: string;
        dimensions: string;
        weight: string;
        capacity: string;
        style: string;
        pattern: string;
        closure: string;
        waterResistant: boolean;
    };
    care_instructions: {
        cleaning: string[];
        storage: string[];
    };
    usage_guidelines: {
        recommended_use: string[];
        pro_tips: string[];
    };
}

export interface ProductColor {
    name: string;
    value: string;
    hex: string;
}

export interface Address extends RecordModel {
    user: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    phone?: string;
}

export interface Order extends RecordModel {
    user: string;
    products: CartProduct[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: string;
}

export interface CartProduct {
    id: string;
    quantity: number;
    color: string;
}

export interface ProductFilter {
    category?: string;
    bestseller?: boolean;
    new?: boolean;
    inStock?: boolean;
}

export interface CartRecord {
    id: string;
    user: string; // References users.id
    items: string; // JSON string of CartItem[]
    created: string;
    updated: string;
}

export interface Cart extends RecordModel {
    user: string;
    items: CartItem[];
}

export interface CartItem {
    productId: string;
    product: Product;
    quantity: number;
    color: string;
}

interface ListOptions {
    filter?: string;
    signal?: AbortSignal;
    $autoCancel?: boolean;
    sort?: string;
}

// Auth functions
export async function signIn(email: string, password: string) {
    const authData = await pocketbase.collection('users').authWithPassword(email, password);
    return authData;
}

export async function signInWithGoogle() {
    try {
        // Get the OAuth2 URL for Google
        const authData = await pocketbase.collection('users').authWithOAuth2({ 
            provider: 'google',
            // Use simpler configuration with fewer options to avoid issues
            createData: {
                emailVisibility: true
            }
        });

        console.log('Google auth successful:', authData);
        return authData;
    } catch (e: unknown) {
        const error = e as { status?: number; response?: { data?: { code?: number } }, message?: string };
        console.error('Google sign-in error:', error);
        
        // More specific error message for the user
        if (error?.status === 400 || (error?.response?.data?.code === 400)) {
            throw new Error('Authentication failed. Please check your Google account settings and try again.');
        } else if (error?.message?.includes('popup_closed')) {
            throw new Error('The sign-in window was closed. Please try again.');
        }
        
        throw error;
    }
}

export async function signUp(email: string, password: string, name: string) {
    const user = await pocketbase.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name,
    });
    return user;
}

export async function signOut() {
    pocketbase.authStore.clear();
}

// Product functions
export async function getProducts(filter?: ProductFilter, signal?: AbortSignal): Promise<Product[]> {
    try {
        const filterRules: string[] = [];
        
        if (filter) {
            if (filter.category) {
                filterRules.push(`category = "${filter.category}"`);
            }
            if (filter.bestseller !== undefined) {
                filterRules.push(`bestseller = ${filter.bestseller}`);
            }
            if (filter.new !== undefined) {
                filterRules.push(`new = ${filter.new}`);
            }
            if (filter.inStock !== undefined) {
                filterRules.push(`inStock = ${filter.inStock}`);
            }
        }

        const filterString = filterRules.length > 0 ? filterRules.join(' && ') : '';
        
        const options: ListOptions = {
            $autoCancel: false
        };

        if (signal) {
            options.signal = signal;
        }

        if (filterString) {
            options.filter = filterString;
        }

        console.log('Fetching products with options:', options);
        const records = await pocketbase.collection(Collections.PRODUCTS).getList(1, 100, options);
        console.log(`Successfully fetched ${records.items.length} products`);

        // Process products even if reviews fail
        let processedProducts = records.items.map(record => {
            // Helper function to safely parse JSON fields
            const safeParseJson = <T>(value: unknown, defaultValue: T): T => {
                if (value === null || value === undefined) return defaultValue;
                if (typeof value === 'object') return value as T;
                try {
                    if (typeof value === 'string') {
                        if (value === '' || value === 'null') return defaultValue;
                        return JSON.parse(value) as T;
                    }
                    return defaultValue;
                } catch (e) {
                    console.warn(`Failed to parse JSON field:`, e);
                    return defaultValue;
                }
            };
            
            // Process the record with safe defaults for all fields
            return {
                ...record,
                $id: record.id,
                name: record.name || '',
                description: record.description || '',
                price: typeof record.price === 'number' ? record.price : 0,
                original_price: typeof record.original_price === 'number' ? record.original_price : 0,
                images: Array.isArray(record.images) 
                    ? record.images.map((image: string) => `${record.id}/${image}`)
                    : [],
                list_order: typeof (record as any).list_order === 'number' ? (record as any).list_order : undefined,
                colors: safeParseJson(record.colors, []),
                features: safeParseJson(record.features, []),
                care: safeParseJson(record.care, []),
                tags: safeParseJson(record.tags, []),
                specifications: safeParseJson(record.specifications, {
                    material: '',
                    dimensions: '',
                    weight: '',
                    capacity: '',
                    style: '',
                    pattern: '',
                    closure: '',
                    waterResistant: false
                }),
                care_instructions: safeParseJson(record.care_instructions, { cleaning: [], storage: [] }),
                usage_guidelines: safeParseJson(record.usage_guidelines, { recommended_use: [], pro_tips: [] }),
                category: record.category || '',
                material: record.material || '',
                dimensions: record.dimensions || '',
                bestseller: Boolean(record.bestseller),
                new: Boolean(record.new),
                inStock: Boolean(record.inStock),
                createdAt: record.created,
                updatedAt: record.updated,
                reviews: 0 // Default to 0 reviews initially
            };
        }) as unknown as Product[];

        // Try to get review counts, but don't block product display if this fails
        try {
            const reviewCounts = await Promise.all(
                records.items.map(record => 
                    pocketbase.collection('reviews').getList(1, 1, {
                        filter: `product = "${record.id}"`,
                        fields: 'id',
                        $autoCancel: false
                    })
                )
            );
            
            // Update products with review counts
            processedProducts = processedProducts.map((product, index) => ({
                ...product,
                reviews: reviewCounts[index].totalItems
            }));
        } catch (reviewError) {
            console.warn('Failed to fetch review counts:', reviewError);
            // Continue with products that have default review count of 0
        }

        // Ordering: first by positive list_order (ascending), then random for items with list_order <= 0 or undefined
        const withOrder = processedProducts
            .filter(p => typeof (p as any).list_order === 'number' && ((p as any).list_order as number) > 0)
            .sort((a, b) => ((a as any).list_order as number) - ((b as any).list_order as number));
        const withoutOrder = processedProducts
            .filter(p => (p as any).list_order === undefined || ((p as any).list_order as number) <= 0)
            .sort(() => Math.random() - 0.5);

        processedProducts = [...withOrder, ...withoutOrder];

        return processedProducts;
    } catch (e: unknown) {
        const error = e as { name?: string };
        if (error?.name === 'AbortError') {
            throw e;
        }
        console.error('Error fetching products:', error);
        // Return empty array instead of throwing to prevent UI from breaking
        return [];
    }
}

export async function getProduct(id: string) {
    console.log(`[PROD DEBUG] getProduct called for product ${id}`);
    console.log(`[PROD DEBUG] PocketBase URL: ${pocketbase.baseUrl}`);
    
    try {
        const startTime = Date.now();
        const options = {
            $autoCancel: false,
            requestKey: `prod_getProduct_${id}_${Date.now()}` // Unique key to prevent request cancellation
        };
        
        // Get the product
        console.log(`[PROD DEBUG] Fetching product data for ${id}`);
        const record = await pocketbase.collection('products').getOne<Product>(id, options);
        
        // Get the review count with auto-cancel disabled
        console.log(`[PROD DEBUG] Fetching review count for ${id}`);
        const reviewCount = await pocketbase.collection('reviews').getList(1, 1, {
            filter: `product = "${id}"`,
            fields: 'id',
            $autoCancel: false,
            requestKey: `prod_reviewCount_${id}_${Date.now()}`
        });
        
        const endTime = Date.now();
        console.log(`[PROD DEBUG] getProduct completed in ${endTime - startTime}ms`);
        
        // Helper function to safely parse JSON fields
        const safeParseJson = <T>(value: unknown, defaultValue: T): T => {
            if (value === null || value === undefined) return defaultValue;
            if (typeof value === 'object') return value as T;
            try {
                if (typeof value === 'string') {
                    if (value === '' || value === 'null') return defaultValue;
                    return JSON.parse(value) as T;
                }
                return defaultValue;
            } catch (e) {
                console.warn(`Failed to parse JSON field:`, e);
                return defaultValue;
            }
        };
        
        // Default specifications object with all required properties
        const defaultSpecifications = {
            material: '',
            dimensions: '',
            weight: '',
            capacity: '',
            style: '',
            pattern: '',
            closure: '',
            waterResistant: false
        };
        
        return {
            ...record,
            $id: record.id,
            name: record.name || '',
            description: record.description || '',
            price: typeof record.price === 'number' ? record.price : 0,
            original_price: typeof record.original_price === 'number' ? record.original_price : 0,
            images: Array.isArray(record.images) 
                ? record.images.map((image: string) => `${record.id}/${image}`)
                : [],
            colors: safeParseJson(record.colors, []),
            features: safeParseJson(record.features, []),
            care: safeParseJson(record.care, []),
            tags: safeParseJson(record.tags, []),
            specifications: safeParseJson(record.specifications, defaultSpecifications),
            care_instructions: safeParseJson(record.care_instructions, { cleaning: [], storage: [] }),
            usage_guidelines: safeParseJson(record.usage_guidelines, { recommended_use: [], pro_tips: [] }),
            category: record.category || '',
            material: record.material || '',
            dimensions: record.dimensions || '',
            bestseller: Boolean(record.bestseller),
            new: Boolean(record.new),
            inStock: Boolean(record.inStock),
            reviews: reviewCount.totalItems // Set the actual review count
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`[PROD DEBUG] Error fetching product ${id}:`, errorMessage);
        throw error; // Re-throw to allow proper error handling in UI
    }
}

// Address functions
export async function getAddresses() {
    if (!pocketbase.authStore.model?.id) return [];
    return await pocketbase.collection('addresses').getFullList<Address>({
        filter: `user = "${pocketbase.authStore.model.id}"`,
    });
}

export async function createAddress(address: Omit<Address, keyof RecordModel>) {
    if (!pocketbase.authStore.model?.id) throw new Error('Not authenticated');
    return await pocketbase.collection('addresses').create({
        ...address,
        user: pocketbase.authStore.model.id,
    });
}

export async function updateAddress(id: string, address: Partial<Omit<Address, keyof RecordModel>>) {
    return await pocketbase.collection('addresses').update(id, address);
}

export async function deleteAddress(id: string) {
    return await pocketbase.collection('addresses').delete(id);
}

// Order functions
export async function getOrders() {
    if (!pocketbase.authStore.model?.id) return [];
    return await pocketbase.collection('orders').getFullList<Order>({
        filter: `user = "${pocketbase.authStore.model.id}"`,
        expand: 'shippingAddress',
    });
}

export async function createOrder(order: Omit<Order, keyof RecordModel>) {
    if (!pocketbase.authStore.model?.id) throw new Error('Not authenticated');
    return await pocketbase.collection('orders').create({
        ...order,
        user: pocketbase.authStore.model.id,
    });
}

// Profile functions
export async function updateProfile(data: Partial<Omit<User, keyof RecordModel>>) {
    if (!pocketbase.authStore.model?.id) throw new Error('Not authenticated');
    return await pocketbase.collection('users').update(pocketbase.authStore.model.id, data);
}

export async function uploadAvatar(file: File) {
    if (!pocketbase.authStore.model?.id) throw new Error('Not authenticated');
    const formData = new FormData();
    formData.append('avatar', file);
    return await pocketbase.collection('users').update(pocketbase.authStore.model.id, formData);
}

// Auth state
export function isAuthenticated() {
    return pocketbase.authStore.isValid;
}

export function getCurrentUser(): User | null {
    const model = pocketbase.authStore.model;
    return model ? model as User : null;
}

// Subscribe to auth changes
export function onAuthStateChange(callback: (isAuthenticated: boolean) => void) {
    console.log('Setting up auth state change listener');
    
    // Immediately trigger callback with current state to ensure proper initialization
    const initialState = pocketbase.authStore.isValid;
    console.log('Initial auth state:', initialState ? 'authenticated' : 'not authenticated');
    
    // Execute callback once on setup with the current state
    setTimeout(() => {
        callback(initialState);
    }, 0);
    
    // Set up the listener for future changes
    pocketbase.authStore.onChange((token, model) => {
        const isAuth = !!token && !!model;
        console.log('Auth state changed:', isAuth ? 'authenticated' : 'not authenticated');
        callback(isAuth);
    });
}

export interface SliderImage extends RecordModel {
    image: string;
    alt: string;
    order: number;
    active: boolean;
    link: string;
    title: string;
    description: string;
}

// Slider images functions
export async function getSliderImages(signal?: AbortSignal): Promise<SliderImage[]> {
    try {
        const options: ListOptions = {
            filter: 'active = true',
            sort: '+order',
            $autoCancel: false
        };

        if (signal) {
            options.signal = signal;
        }

        const records = await pocketbase.collection(Collections.SLIDER_IMAGES).getList(1, 10, options);

        return records.items.map(record => ({
            ...record,
            image: pocketbase.files.getURL(record, record.image)
        })) as SliderImage[];
    } catch (e: unknown) {
        const error = e as { name?: string };
        if (error?.name === 'AbortError') {
            throw e;
        }
        console.error('Error fetching slider images:', error);
        return [];
    }
}

export interface Review {
    id: string;
    user: string;
    product: string;
    rating: number;
    title: string;
    content: string;
    images: string[];
    verified_purchase: boolean;
    helpful_votes: number;
    created: string;
    updated: string;
    expand?: {
        user: User;
        comments: ReviewComment[];
    };
}

export interface ReviewComment {
    id: string;
    review: string;
    user: string;
    content: string;
    created: string;
    updated: string;
    expand?: {
        user: User;
    };
}

export interface ThemeSettings extends RecordModel {
    name: string;
    is_active: boolean;
    primary_color: string;
    primary_color_hover: string;
    primary_color_hsl: string;
    accent_color: string;
    accent_color_hsl: string;
    text_on_primary: string;
    dark_mode_primary_color_hsl: string;
    dark_mode_accent_color_hsl: string;
}

// Function to create a review
export const createReview = async (
    productId: string,
    rating: number,
    title: string,
    content: string,
    images: File[],
    verifiedPurchase: boolean = false
): Promise<Review> => {
    if (!pocketbase.authStore.model?.id) {
        throw new Error('User must be authenticated to create a review');
    }

    const formData = new FormData();
    formData.append('user', pocketbase.authStore.model.id);
    formData.append('product', productId);
    formData.append('rating', rating.toString());
    formData.append('title', title);
    formData.append('content', content);
    formData.append('verified_purchase', verifiedPurchase.toString());
    formData.append('helpful_votes', '0');
    
    // Add images if any
    images.forEach(image => {
        formData.append('images', image);
    });

    try {
        // Create the review in the reviews collection
        const review = await pocketbase.collection('reviews').create(formData);
        
        // Get the current review count
        const reviewsCount = await pocketbase.collection('reviews').getList(1, 1, {
            filter: `product = "${productId}"`,
            $autoCancel: false
        });

        // Update the reviews count in the product record
        await pocketbase.collection('products').update(productId, {
            'reviews': reviewsCount.totalItems
        });

        return review as unknown as Review;
    } catch (error) {
        console.error('Error creating review:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to create review');
    }
};

// Function to get reviews for a product
export async function getProductReviews(productId: string): Promise<Review[]> {
  console.log(`[PROD DEBUG] getProductReviews called for product ${productId}`);
  console.log(`[PROD DEBUG] PocketBase URL: ${pocketbase.baseUrl}`);
  
  try {
    const startTime = Date.now();
    const options = {
      filter: `product = "${productId}"`,
      sort: '-created',
      expand: 'user,comments.user',
      $autoCancel: false,
      requestKey: `prod_reviews_${productId}_${Date.now()}` // Unique key to prevent request cancellation
    };
    
    const result = await pocketbase.collection('reviews').getFullList(options);
    
    const endTime = Date.now();
    console.log(`[PROD DEBUG] Reviews request completed in ${endTime - startTime}ms, found ${result.length} reviews`);
    
    return result as unknown as Review[];
  } catch (error) {
    // Handle error safely
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[PROD DEBUG] Error fetching reviews for product ${productId}:`, errorMessage);
    return []; // Return empty array instead of throwing to prevent product display failure
  }
}

// Function to add a comment to a review
export const addReviewComment = async (reviewId: string, content: string): Promise<ReviewComment> => {
    return await pocketbase.collection('review_comments').create({
        review: reviewId,
        user: pocketbase.authStore.model?.id,
        content
    });
};

// Function to vote on a review
export const voteReview = async (reviewId: string): Promise<Review> => {
    const review = await pocketbase.collection('reviews').getOne(reviewId);
    return await pocketbase.collection('reviews').update(reviewId, {
        helpful_votes: (review.helpful_votes || 0) + 1
    });
};

// Theme settings functions
export const getActiveTheme = async (): Promise<ThemeSettings | null> => {
    try {
        const result = await pocketbase.collection(Collections.THEME_SETTINGS).getList(1, 1, {
            filter: 'is_active=true',
            sort: '-created'
        });
        
        if (result.items.length > 0) {
            return result.items[0] as unknown as ThemeSettings;
        }
        return null;
    } catch (error) {
        console.error('Error fetching active theme:', error);
        return null;
    }
};

export const getAllThemes = async (): Promise<ThemeSettings[]> => {
    try {
        const result = await pocketbase.collection(Collections.THEME_SETTINGS).getFullList({
            sort: '-created'
        });
        return result as unknown as ThemeSettings[];
    } catch (error) {
        console.error('Error fetching themes:', error);
        return [];
    }
};

export const createTheme = async (theme: { 
    name: string;
    is_active: boolean;
    primary_color: string;
    primary_color_hover: string;
    primary_color_hsl: string;
    accent_color: string;
    accent_color_hsl: string;
    text_on_primary: string;
    dark_mode_primary_color_hsl: string;
    dark_mode_accent_color_hsl: string;
}): Promise<ThemeSettings> => {
    try {
        // If this theme is active, deactivate all other themes first
        if (theme.is_active) {
            await deactivateAllThemes();
        }
        
        const result = await pocketbase.collection(Collections.THEME_SETTINGS).create(theme);
        return result as unknown as ThemeSettings;
    } catch (error) {
        console.error('Error creating theme:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to create theme');
    }
};

export const updateTheme = async (id: string, theme: Partial<{
    name: string;
    is_active: boolean;
    primary_color: string;
    primary_color_hover: string;
    primary_color_hsl: string;
    accent_color: string;
    accent_color_hsl: string;
    text_on_primary: string;
    dark_mode_primary_color_hsl: string;
    dark_mode_accent_color_hsl: string;
}>): Promise<ThemeSettings> => {
    try {
        // If this theme is being set to active, deactivate all other themes first
        if (theme.is_active) {
            await deactivateAllThemes();
        }
        
        const result = await pocketbase.collection(Collections.THEME_SETTINGS).update(id, theme);
        return result as unknown as ThemeSettings;
    } catch (error) {
        console.error('Error updating theme:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to update theme');
    }
};

export const deleteTheme = async (id: string): Promise<boolean> => {
    try {
        await pocketbase.collection(Collections.THEME_SETTINGS).delete(id);
        return true;
    } catch (error) {
        console.error('Error deleting theme:', error);
        return false;
    }
};

export const activateTheme = async (id: string): Promise<ThemeSettings> => {
    try {
        // Deactivate all themes first
        await deactivateAllThemes();
        
        // Then activate the selected theme
        const result = await pocketbase.collection(Collections.THEME_SETTINGS).update(id, {
            is_active: true
        });
        
        return result as unknown as ThemeSettings;
    } catch (error) {
        console.error('Error activating theme:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to activate theme');
    }
};

// Helper function to deactivate all themes
async function deactivateAllThemes(): Promise<void> {
    try {
        const activeThemes = await pocketbase.collection(Collections.THEME_SETTINGS).getFullList({
            filter: 'is_active=true'
        });
        
        // Update each active theme to be inactive
        for (const theme of activeThemes) {
            await pocketbase.collection(Collections.THEME_SETTINGS).update(theme.id, {
                is_active: false
            });
        }
    } catch (error) {
        console.error('Error deactivating themes:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to deactivate themes');
    }
}; 