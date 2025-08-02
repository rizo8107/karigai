/**
 * Tamil Nadu Pincode Utility
 * 
 * This file contains utility functions to check if a pincode belongs to Tamil Nadu
 * Based on district-wise pincode ranges
 */

// Tamil Nadu district pincode ranges
const TN_PINCODE_RANGES: { [district: string]: { min: number; max: number }[] } = {
  'Ariyalur': [{ min: 621701, max: 621901 }],
  'Chennai': [{ min: 600001, max: 600130 }],
  'Coimbatore': [{ min: 641000, max: 641700 }],
  'Cuddalore': [{ min: 607001, max: 607471 }],
  'Dharmapuri': [{ min: 635001, max: 635260 }],
  'Dindigul': [{ min: 624001, max: 624461 }],
  'Erode': [{ min: 638001, max: 638522 }],
  'Kanchipuram': [{ min: 631501, max: 631981 }],
  'Kanyakumari': [{ min: 629001, max: 629267 }],
  'Karur': [{ min: 639001, max: 639242 }],
  'Krishnagiri': [{ min: 635001, max: 635302 }],
  'Madurai': [{ min: 625001, max: 625400 }],
  'Nagapattinam': [{ min: 609001, max: 609396 }],
  'Namakkal': [{ min: 637001, max: 637384 }],
  'Nilgiris': [{ min: 643001, max: 643182 }],
  'Perambalur': [{ min: 621001, max: 621133 }],
  'Pudukkottai': [{ min: 622001, max: 622347 }],
  'Ramanathapuram': [{ min: 623001, max: 623312 }],
  'Salem': [{ min: 636001, max: 636502 }],
  'Sivaganga': [{ min: 630001, max: 630320 }],
  'Thanjavur': [{ min: 609001, max: 609516 }],
  'Theni': [{ min: 625001, max: 625164 }],
  'Thoothukudi': [{ min: 628001, max: 628427 }],
  'Tiruchirappalli': [{ min: 620001, max: 620485 }],
  'Tirunelveli': [{ min: 627001, max: 627555 }],
  'Tiruvallur': [{ min: 601001, max: 601380 }],
  'Tiruvannamalai': [{ min: 606001, max: 606486 }],
  'Tiruvarur': [{ min: 610001, max: 610348 }],
  'Vellore': [{ min: 632001, max: 632677 }],
  'Villupuram': [{ min: 605001, max: 605654 }],
  'Virudhunagar': [{ min: 626001, max: 626279 }]
};

/**
 * Check if a pincode belongs to Tamil Nadu
 * @param pincode The pincode to check
 * @returns True if the pincode belongs to Tamil Nadu, false otherwise
 */
export const isTamilNaduPincode = (pincode: string | number): boolean => {
  // Convert pincode to number if it's a string
  const pincodeNum = typeof pincode === 'string' ? parseInt(pincode, 10) : pincode;
  
  // If pincode is not a valid number, return false
  if (isNaN(pincodeNum)) {
    return false;
  }
  
  // Check if pincode falls within any Tamil Nadu district range
  for (const district in TN_PINCODE_RANGES) {
    for (const range of TN_PINCODE_RANGES[district]) {
      if (pincodeNum >= range.min && pincodeNum <= range.max) {
        return true;
      }
    }
  }
  
  // If no match found, it's not a Tamil Nadu pincode
  return false;
};

/**
 * Get the district name for a Tamil Nadu pincode
 * @param pincode The pincode to check
 * @returns The district name if found, null otherwise
 */
export const getTamilNaduDistrict = (pincode: string | number): string | null => {
  // Convert pincode to number if it's a string
  const pincodeNum = typeof pincode === 'string' ? parseInt(pincode, 10) : pincode;
  
  // If pincode is not a valid number, return null
  if (isNaN(pincodeNum)) {
    return null;
  }
  
  // Check if pincode falls within any Tamil Nadu district range
  for (const district in TN_PINCODE_RANGES) {
    for (const range of TN_PINCODE_RANGES[district]) {
      if (pincodeNum >= range.min && pincodeNum <= range.max) {
        return district;
      }
    }
  }
  
  // If no match found, return null
  return null;
};
