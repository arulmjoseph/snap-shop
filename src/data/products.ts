import cameraImage from "@/assets/camera-products.jpg";
import creatorImage from "@/assets/creator-kit.jpg";
import heroImage from "@/assets/camera-hero.jpg";

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  imagePosition?: string;
  gallery: string[];
  category: string;
  categorySlug: string;
  sku: string;
  inStock: boolean;
  stockCount: number;
  shortDescription: string;
  fullDescription: string;
  specs: Record<string, string>;
  options?: {
    name: string;
    values: string[];
  }[];
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "canon-eos-r6-mark-ii",
    brand: "CANON",
    name: "EOS R6 Mark II Mirrorless Camera Body",
    price: 5925,
    oldPrice: 6499,
    rating: 4.9,
    reviewsCount: 42,
    badge: "Best seller",
    image: cameraImage,
    gallery: [cameraImage, heroImage, creatorImage],
    category: "Mirrorless cameras",
    categorySlug: "mirrorless",
    sku: "CAN-R6MK2-BODY",
    inStock: true,
    stockCount: 8,
    shortDescription: "24.2MP full-frame CMOS sensor with up to 40 fps electronic shutter, 4K60p 10-bit raw video recording, and Dual Pixel CMOS AF II with human, animal, and vehicle tracking.",
    fullDescription: "Designed for multimedia creators who demand uncompromised performance, the Canon EOS R6 Mark II combines a high-speed 24.2MP full-frame sensor with DIGIC X processing. Shoot continuous bursts up to 40 fps electronically or 12 fps mechanically with full AF/AE tracking. Enjoy uncropped 4K 60p video oversampled from 6K, 6-stop in-body image stabilization (up to 8 stops with IBIS + IS lenses), and dual UHS-II SD card slots.",
    specs: {
      "Sensor": "24.2MP Full-Frame CMOS",
      "Video Resolution": "4K60p 10-Bit Oversampled from 6K",
      "Autofocus": "Dual Pixel CMOS AF II with AI Deep Learning",
      "Stabilization": "5-Axis In-Body Image Stabilization (Up to 8 Stops)",
      "ISO Range": "100–102,400 (Expandable to 204,800)",
      "Card Slots": "Dual SD/SDHC/SDXC (UHS-II)",
      "Weight": "670g (Body with Battery)"
    },
    options: [
      { name: "Kit Option", values: ["Body Only", "With 24-105mm f/4 L IS", "With 24-105mm f/4-7.1 IS"] },
      { name: "Warranty", values: ["2-Year Official UAE Warranty", "3-Year Care+ Package"] }
    ]
  },
  {
    id: "prod-2",
    slug: "sony-alpha-a7-iv",
    brand: "SONY",
    name: "Alpha a7 IV Mirrorless Camera Body",
    price: 6319,
    rating: 4.8,
    reviewsCount: 56,
    image: cameraImage,
    imagePosition: "30% center",
    gallery: [cameraImage, creatorImage, heroImage],
    category: "Mirrorless cameras",
    categorySlug: "mirrorless",
    sku: "SNY-A7M4-BODY",
    inStock: true,
    stockCount: 5,
    shortDescription: "33MP full-frame Exmor R BSI sensor, 4K 60p recording in 10-bit 4:2:2, Real-time Eye AF for Humans, Animals, and Birds.",
    fullDescription: "An all-arounder that goes beyond basic, the Sony Alpha a7 IV does double duty with strong stills and video performance. An advanced 33MP Exmor R CMOS sensor pairs with the BIONZ XR processor to deliver high resolution, low noise, and fast AF performance.",
    specs: {
      "Sensor": "33MP Full-Frame Exmor R BSI CMOS",
      "Video Resolution": "4K 60p in 10-Bit 4:2:2",
      "Autofocus": "759-Point Phase-Detection Real-time Eye AF",
      "Viewfinder": "3.68m-Dot EVF with 120 fps Refresh",
      "Weight": "658g"
    },
    options: [
      { name: "Kit Option", values: ["Body Only", "With 28-70mm Lens"] }
    ]
  },
  {
    id: "prod-3",
    slug: "dji-osmo-pocket-3-creator-combo",
    brand: "DJI",
    name: "Osmo Pocket 3 Creator Combo",
    price: 2035,
    oldPrice: 3149,
    rating: 4.9,
    reviewsCount: 88,
    badge: "-35%",
    image: creatorImage,
    imagePosition: "12% center",
    gallery: [creatorImage, heroImage, cameraImage],
    category: "Creator kits",
    categorySlug: "creator-kits",
    sku: "DJI-POCKET3-COMBO",
    inStock: true,
    stockCount: 14,
    shortDescription: "1-inch CMOS pocket gimbal camera with 2-inch rotatable screen, 4K120fps video, 3-axis mechanical stabilization, and DJI Mic 2 transmitter included.",
    fullDescription: "The all-new Pocket 3 features a powerful 1-inch CMOS sensor that puts detail-rich imaging right in the palm of your hand. With a 2-inch rotatable touchscreen and full-pixel fast focusing, go horizontal or vertical for more precise awareness and control.",
    specs: {
      "Sensor": "1-inch CMOS",
      "Display": "2-inch OLED Rotatable Touchscreen",
      "Stabilization": "3-Axis Mechanical Gimbal",
      "Audio": "Built-in 3-Mic Array + DJI Mic 2 Transmitter",
      "Battery Life": "Up to 166 mins (16-min Fast Charge to 80%)"
    }
  },
  {
    id: "prod-4",
    slug: "sigma-24-70mm-f2-8-dg-dn-ii-art",
    brand: "SIGMA",
    name: "24–70mm f/2.8 DG DN II Art Lens",
    price: 4749,
    rating: 4.9,
    reviewsCount: 19,
    image: cameraImage,
    imagePosition: "90% center",
    gallery: [cameraImage, heroImage],
    category: "Camera lenses",
    categorySlug: "lenses",
    sku: "SIG-2470-ART2-E",
    inStock: true,
    stockCount: 6,
    shortDescription: "Flagship standard zoom lens redesigned for mirrorless cameras. Exceptional optical performance, HLA high-speed motor, and aperture click switch.",
    fullDescription: "The SIGMA 24-70mm f/2.8 DG DN II Art is the flagship lens evolution designed specifically for full-frame mirrorless cameras. Featuring ultra-high rendering performance across the zoom range, compact lightweight chassis, and high-speed linear actuator focusing.",
    specs: {
      "Focal Length": "24 to 70mm",
      "Max Aperture": "f/2.8",
      "Lens Mount": "Sony E-Mount / Leica L-Mount",
      "Filter Thread": "82 mm",
      "Weight": "745g"
    },
    options: [
      { name: "Mount", values: ["Sony E-Mount", "Leica/Panasonic L-Mount"] }
    ]
  },
  {
    id: "prod-5",
    slug: "hollyland-lark-m2-duo",
    brand: "HOLLYLAND",
    name: "LARK M2 Duo Wireless Microphone System",
    price: 339,
    rating: 4.7,
    reviewsCount: 31,
    badge: "Popular",
    image: creatorImage,
    imagePosition: "42% center",
    gallery: [creatorImage, heroImage],
    category: "Audio",
    categorySlug: "audio",
    sku: "HOL-LARKM2-DUO",
    inStock: true,
    stockCount: 22,
    shortDescription: "Ultra-lightweight button mic weighing only 9g, 48kHz/24-bit Hi-Fi sound quality, 300m range, 40-hour total battery life with charging case.",
    fullDescription: "LARK M2 is a fashionable wireless microphone that exceeds expectations for vlogging and interviews. Button-sized lightweight design (9g), environmental noise cancellation (ENC), plug-and-play setup for cameras, iPhones, and Android devices.",
    specs: {
      "Audio Quality": "48kHz / 24-Bit Hi-Fi",
      "Range": "Up to 300m (1000ft) Line of Sight",
      "Tx Weight": "9g per button transmitter",
      "Battery Life": "10 hours per charge, 40 hours with charging case"
    },
    options: [
      { name: "Version", values: ["Camera Version (Duo)", "Mobile USB-C + Lightning", "Combo (Camera + Mobile)"] }
    ]
  },
  {
    id: "prod-6",
    slug: "nikon-z8-mirrorless-body",
    brand: "NIKON",
    name: "Nikon Z8 Mirrorless Camera Body",
    price: 12499,
    oldPrice: 13299,
    rating: 5.0,
    reviewsCount: 14,
    badge: "Save 800",
    image: cameraImage,
    gallery: [cameraImage, heroImage],
    category: "Mirrorless cameras",
    categorySlug: "mirrorless",
    sku: "NIK-Z8-BODY",
    inStock: true,
    stockCount: 3,
    shortDescription: "45.7MP stacked CMOS sensor, EXPEED 7 processor, 8K60p N-RAW video recording, blackout-free real-time viewfinder, compact Z9 performance.",
    fullDescription: "Built using flagship Z9 technology in a 30% smaller body, the Nikon Z8 is the ultimate hybrid camera for stills and motion picture creators. Enjoy 8K/60p internal RAW video, 120 fps burst shooting, and 4-axis tilting monitor.",
    specs: {
      "Sensor": "45.7MP Full-Frame Stacked CMOS",
      "Video": "Internal 8K60p N-RAW & 4K120p",
      "Shutter": "Fully Electronic (No Mechanical Shutter)",
      "Card Slots": "CFexpress Type B / XQD + SD UHS-II",
      "Weight": "910g"
    }
  },
  {
    id: "prod-7",
    slug: "canon-rf-70-200mm-f2-8-l-is-usm",
    brand: "CANON",
    name: "RF 70–200mm f/2.8 L IS USM Telephoto Lens",
    price: 8270,
    oldPrice: 9450,
    rating: 4.9,
    reviewsCount: 27,
    image: cameraImage,
    imagePosition: "85% center",
    gallery: [cameraImage, heroImage],
    category: "Camera lenses",
    categorySlug: "lenses",
    sku: "CAN-RF70200-28",
    inStock: true,
    stockCount: 4,
    shortDescription: "Ultra-compact f/2.8 telephoto zoom lens with Dual Nano USM motors, 5-stop optical image stabilizer, weather-sealed L-series build quality.",
    fullDescription: "A modern staple telephoto zoom, the Canon RF 70-200mm f/2.8 L IS USM delivers dramatic image quality in a remarkably short and lightweight form factor.",
    specs: {
      "Focal Length": "70 to 200mm",
      "Max Aperture": "f/2.8",
      "Stabilization": "5 Stops Optical",
      "Filter Size": "77 mm",
      "Weight": "1070g"
    }
  },
  {
    id: "prod-8",
    slug: "peak-design-everyday-backpack-20l",
    brand: "PEAK DESIGN",
    name: "Everyday Camera Backpack 20L V2",
    price: 1099,
    rating: 4.8,
    reviewsCount: 65,
    image: creatorImage,
    imagePosition: "85% center",
    gallery: [creatorImage, heroImage],
    category: "Creator kits",
    categorySlug: "creator-kits",
    sku: "PD-EDB-20-BK-2",
    inStock: true,
    stockCount: 11,
    shortDescription: "Iconic award-winning camera & everyday pack with MagLatch hardware, FlexFold customizable dividers, and weatherproof 100% recycled nylon shell.",
    fullDescription: "The Everyday Backpack 20L is built around accessibility, organization, expansion, and protection. Dual side zips, MagLatch top access, and modular internal organization.",
    specs: {
      "Capacity": "17L min to 20L max",
      "Laptop Carry": "Up to 15-inch Macbook Pro",
      "Material": "400D Weatherproof 100% Recycled Nylon",
      "Color": "Black / Charcoal / Midnight Blue"
    },
    options: [
      { name: "Color", values: ["Black", "Charcoal", "Midnight Blue", "Sage"] }
    ]
  }
];

export const MOCK_CATEGORIES = [
  { name: "All Products", slug: "all", count: MOCK_PRODUCTS.length },
  { name: "Mirrorless cameras", slug: "mirrorless", count: 4 },
  { name: "Camera lenses", slug: "lenses", count: 2 },
  { name: "Creator kits", slug: "creator-kits", count: 2 },
  { name: "Audio gear", slug: "audio", count: 1 },
  { name: "Lighting & studio", slug: "lighting", count: 1 },
];

export const MOCK_BRANDS = ["All Brands", "CANON", "SONY", "NIKON", "DJI", "SIGMA", "HOLLYLAND", "PEAK DESIGN"];
