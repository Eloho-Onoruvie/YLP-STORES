export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Journals' | 'Sermon Notes' | 'Bibles' | 'Books' | 'Devotionals' | 'Christian Gifts';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImages?: string[];
  description: string;
  longDescription: string;
  features: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  badge?: string;
  details: {
    format?: string;
    pages?: number;
    dimensions?: string;
    isbn?: string;
    language?: string;
    coverMaterial?: string;
  };
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'my-growth-journal',
    name: 'My Growth Journal',
    tagline: 'A guided journal for intentional spiritual growth, prayer, and daily reflection.',
    category: 'Journals',
    price: 28.00,
    originalPrice: 34.00,
    rating: 4.9,
    reviewCount: 148,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Designed to help you become more intentional about devotion, prayer, scripture reflection, and daily spiritual growth.',
    longDescription: 'My Growth Journal is created to be your quiet companion in your daily quiet time with God. Structured with intentional weekly themes, daily scripture prompts, prayer tracking pages, and monthly gratitude reflections. Crafted with premium soft-touch cream hardcover, gold foil stamping, and ribbon bookmark.',
    features: [
      '12 Months of guided spiritual reflection prompts',
      'Daily prayer tracker and scripture meditation spaces',
      'Weekly memory verse sections & answered prayer logs',
      '120gsm archival-grade bleed-proof cream paper',
      'Gold foil cover detail with double satin ribbon markers'
    ],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    details: {
      format: 'Hardcover with Gold Foil',
      pages: 240,
      dimensions: '6.5 x 8.8 inches',
      language: 'English',
      coverMaterial: 'Vegan Leatherette'
    },
    reviews: [
      {
        id: 'rev-1',
        userName: 'Hannah M.',
        rating: 5,
        date: '2 days ago',
        comment: 'This journal transformed my morning quiet time. The prompts are so gentle and grounding. Beautiful quality!',
        verified: true
      },
      {
        id: 'rev-2',
        userName: 'Grace O.',
        rating: 5,
        date: '1 week ago',
        comment: 'Purchased for myself and two sisters. The paper quality is amazing and gold foil detail feels so special.',
        verified: true
      }
    ]
  },
  {
    id: 'my-sermon-notes',
    name: 'My Sermon Notes',
    tagline: 'Structured notebook for capturing Sunday messages, key scriptures, and application.',
    category: 'Sermon Notes',
    price: 24.00,
    rating: 4.8,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80',
    description: 'Keep your church notes organized and meaningful with structured templates for message points and personal application.',
    longDescription: 'Never lose a Sunday message key takeaway again. My Sermon Notes provides dedicated double-page spreads for 52 weeks of sermons, complete with sections for speaker, scripture focus, main message points, personal takeaways, and weekly action steps.',
    features: [
      '52 Weeks of structured sermon layouts',
      'Key scripture index at the front of notebook',
      'Actionable application prompts for weekday integration',
      'Soft sky-blue cloth cover with gold embossed cross',
      'Lies flat for comfortable note-taking during services'
    ],
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    details: {
      format: 'Flexibound Linen Cover',
      pages: 192,
      dimensions: '5.8 x 8.3 inches',
      language: 'English'
    },
    reviews: [
      {
        id: 'rev-3',
        userName: 'Sarah P.',
        rating: 5,
        date: '3 days ago',
        comment: 'I love bringing this to church every Sunday! It helps me stay focused and actually apply what I learned during the week.',
        verified: true
      }
    ]
  },
  {
    id: 'illuminated-faith-bible',
    name: 'The Illuminated Faith Study Bible',
    tagline: 'Complete ESV Bible with wide margins, commentary notes, and peaceful illustrations.',
    category: 'Bibles',
    price: 55.00,
    originalPrice: 65.00,
    rating: 5.0,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1509021436468-d510090e3963?w=800&auto=format&fit=crop&q=80',
    description: 'An heirloom-quality study Bible designed for deep reading, journaling, and scripture illumination.',
    longDescription: 'Features 2-inch ruled margins for personal journaling and verse mapping, single-column paragraph layout, book introductions, historical maps, and elegant typography that makes reading the Word effortless.',
    features: [
      'Single-column paragraph layout with 2-inch ruled margins',
      'Over 400 hand-drawn scripture typography illustrations',
      'Includes concordance, cross-references, and map section',
      'Gilded gold page edges with dual ribbon bookmarks',
      'Includes protective keepsake gift box'
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    details: {
      format: 'LeatherSoft Single Column',
      pages: 1420,
      dimensions: '7.2 x 9.5 inches',
      isbn: '978-1433568980',
      language: 'English'
    },
    reviews: [
      {
        id: 'rev-4',
        userName: 'Rebecca T.',
        rating: 5,
        date: '5 days ago',
        comment: 'Breathtaking Bible! The wide margins leave plenty of space for verse mapping and prayer notes.',
        verified: true
      }
    ]
  },
  {
    id: 'walking-in-grace-devotional',
    name: 'Walking in Grace 365-Day Devotional',
    tagline: 'Daily scriptures and heart-warming reflections to anchor your soul in God’s promise.',
    category: 'Devotionals',
    price: 22.00,
    rating: 4.9,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    description: 'Start every morning with short, powerful devotional entries that point your heart toward Christ.',
    longDescription: 'Walking in Grace offers 365 daily devotionals filled with biblical wisdom, uplifting reflections, key verse readings, and a short closing prayer. Perfect for busy mornings or peaceful bedtime routines.',
    features: [
      '365 Short daily entries with verse & prayer',
      'Beautiful hardcover with soft pastel sky-blue finish',
      'Ribbon marker for easy daily bookmarking',
      'Thematic index covering peace, trust, hope, and strength'
    ],
    inStock: true,
    isFeatured: true,
    details: {
      format: 'Hardcover',
      pages: 384,
      dimensions: '5.5 x 7.5 inches'
    },
    reviews: [
      {
        id: 'rev-5',
        userName: 'Chloe K.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'My go-to gift for friends! Every entry feels like a fresh drink of water for the soul.',
        verified: true
      }
    ]
  },
  {
    id: 'abide-in-him-cards',
    name: 'Abide in Him Scripture Deck',
    tagline: '52 Encouraging verse cards on luxury cardstock with acrylic display stand.',
    category: 'Christian Gifts',
    price: 18.00,
    rating: 4.9,
    reviewCount: 84,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    description: 'Display a weekly verse on your desk, nightstand, or kitchen counter to keep God’s truth front of mind.',
    longDescription: 'A curated collection of 52 gold-foil stamped scripture cards designed to provide weekly strength and truth. Includes a clear acrylic desktop block stand to rotate cards throughout the year.',
    features: [
      '52 Thick 350gsm matte cardstock scripture cards',
      'Gold foil border detail on every card',
      'Solid crystal-clear acrylic desk holder included',
      'Housed in a rigid foil-stamped magnetic box'
    ],
    inStock: true,
    isFeatured: false,
    isBestseller: true,
    details: {
      format: 'Card Deck + Acrylic Holder',
      dimensions: '4 x 4 inches'
    },
    reviews: [
      {
        id: 'rev-6',
        userName: 'Miriam D.',
        rating: 5,
        date: '1 month ago',
        comment: 'I keep this right on my work desk. It brings so much calm during stressful workdays.',
        verified: true
      }
    ]
  },
  {
    id: 'be-still-ceramic-mug',
    name: 'Be Still & Know Ceramic Mug',
    tagline: 'Soft sky blue 14oz ceramic mug with Psalm 46:10 gold script and rim.',
    category: 'Christian Gifts',
    price: 19.50,
    rating: 4.8,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    description: 'Sip your morning tea or coffee while resting in the promise of Psalm 46:10.',
    longDescription: 'Crafted from heavy ceramic with a smooth matte sky-blue glaze, hand-painted gold rim, and gold foil text "Be still & know — Psalm 46:10". Comfortable 14oz capacity for morning devotions.',
    features: [
      '14 oz High-grade ceramic mug',
      'Hand-painted real gold rim and handle detail',
      'Matte soft blue exterior with glossy cream interior',
      'Comes packaged in a signature YLP gift box'
    ],
    inStock: true,
    isFeatured: false,
    details: {
      format: 'Ceramic Drinkware',
      dimensions: '14 oz Capacity'
    },
    reviews: []
  },
  {
    id: 'proverbs-31-planner',
    name: 'Proverbs 31 Intentional Life Planner',
    tagline: '12-Month undated planner with goal setting, habit trackers, and weekly scriptures.',
    category: 'Journals',
    price: 32.00,
    originalPrice: 38.00,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80',
    description: 'Organize your schedule, family goals, quiet time, and personal growth with faith at the center.',
    longDescription: 'An undated 12-month planner featuring monthly spreads, weekly vertical layouts, habit tracking, meal planning prompts, and weekly scripture reflections inspired by Proverbs 31.',
    features: [
      'Undated 12-month format — start anytime',
      'Monthly overview + weekly goal setting layouts',
      'Includes 2 sticker sheets with gold foil icons',
      'Inner back pocket for notes and receipts'
    ],
    inStock: true,
    isFeatured: true,
    details: {
      format: 'Hardcover Spiral Bound',
      pages: 260,
      dimensions: '7.5 x 9.5 inches'
    },
    reviews: []
  },
  {
    id: 'daughters-of-the-king-book',
    name: 'Daughters of the King: Walking in Your True Identity',
    tagline: 'An inspiring book by Elizabeth Vance on discovering your royal identity in Christ.',
    category: 'Books',
    price: 21.99,
    rating: 4.9,
    reviewCount: 154,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    description: 'Learn to quiet insecurity, embrace your God-given authority, and walk confidently as a daughter of the King.',
    longDescription: 'In Daughters of the King, author Elizabeth Vance guides women through a transformative exploration of biblical identity, spiritual warfare, and stepping into purpose without fear or performance pressure.',
    features: [
      '10 Empowering chapters with study reflection questions',
      'Includes personal prayer guides at the end of each section',
      'Perfect for individual reading or small group Bible studies'
    ],
    inStock: true,
    isFeatured: false,
    isBestseller: true,
    details: {
      format: 'Paperback',
      pages: 224,
      isbn: '978-0310356782',
      language: 'English'
    },
    reviews: []
  }
];
