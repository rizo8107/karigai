import { pocketbase, type RecordModel } from './pocketbase';

// Interface for the navbar configuration
export interface NavbarConfig {
  showShop: boolean;
  showAbout: boolean;
  showContact: boolean;
  showGifting: boolean;
  showBlog: boolean;
  showBestsellers: boolean;
  showNewArrivals: boolean;
  isActive: boolean;
}

// Default configuration in case of fetch failure
const DEFAULT_NAVBAR_CONFIG: NavbarConfig = {
  showShop: true,
  showAbout: true,
  showContact: true,
  showGifting: true,
  showBlog: true,
  showBestsellers: true,
  showNewArrivals: true,
  isActive: true,
};

/**
 * Maps a PocketBase record to the NavbarConfig interface
 */
const mapRecordToConfig = (record: RecordModel): NavbarConfig => {
  return {
    showShop: record.show_shop ?? true,
    showAbout: record.show_about ?? true,
    showContact: record.show_contact ?? true,
    showGifting: record.show_gifting ?? true,
    showBlog: record.show_blog ?? true,
    showBestsellers: (record as any).show_bestsellers ?? true,
    showNewArrivals: (record as any).show_new_arrivals ?? true,
    isActive: record.is_active ?? true,
  };
};

/**
 * Gets the active navbar configuration from PocketBase
 */
export async function getNavbarConfig(): Promise<NavbarConfig> {
  try {
    const records = await pocketbase.collection('navbar_config').getList(1, 1, {
      filter: 'is_active=true',
    });

    if (records.items.length > 0) {
      return mapRecordToConfig(records.items[0]);
    }

    return DEFAULT_NAVBAR_CONFIG;
  } catch (error) {
    console.error('Failed to fetch navbar config:', error);
    return DEFAULT_NAVBAR_CONFIG;
  }
}
