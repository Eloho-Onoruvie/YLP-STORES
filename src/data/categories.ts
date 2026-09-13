export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  count: number;
  featuredImage: string;
}

export const BOOK_CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat-fiction',
    name: 'Fiction',
    slug: 'fiction',
    description: 'Immersive stories, captivating literary works, and deep character studies.',
    iconName: 'BookOpen',
    count: 8,
    featuredImage: 'https://images.unsplash.com/photo-1474939557548-f842486be195?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-scifi',
    name: 'Science Fiction',
    slug: 'science-fiction',
    description: 'Futuristic worlds, technological marvels, and cosmic journeys.',
    iconName: 'Rocket',
    count: 6,
    featuredImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-fantasy',
    name: 'Fantasy',
    slug: 'fantasy',
    description: 'Mythical realms, ancient magic, and epic legendary quests.',
    iconName: 'Sparkles',
    count: 5,
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-mystery',
    name: 'Mystery & Thriller',
    slug: 'mystery',
    description: 'Edge-of-your-seat suspense, detective investigations, and shock twists.',
    iconName: 'Compass',
    count: 7,
    featuredImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-romance',
    name: 'Romance',
    slug: 'romance',
    description: 'Heartwarming love stories, emotional connections, and passionate tales.',
    iconName: 'Heart',
    count: 5,
    featuredImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-biography',
    name: 'Biography & Memoir',
    slug: 'biography',
    description: 'Inspiring life stories, historical figures, and powerful memoirs.',
    iconName: 'User',
    count: 4,
    featuredImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-business',
    name: 'Business & Leadership',
    slug: 'business',
    description: 'Entrepreneurship, strategy, management, and career excellence.',
    iconName: 'Briefcase',
    count: 6,
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-self-dev',
    name: 'Self Development',
    slug: 'self-development',
    description: 'Mindset mastery, productivity habits, happiness, and personal growth.',
    iconName: 'Zap',
    count: 6,
    featuredImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-technology',
    name: 'Technology & AI',
    slug: 'technology',
    description: 'Cutting-edge innovation, software engineering, robotics, and future tech.',
    iconName: 'Cpu',
    count: 5,
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-history',
    name: 'History',
    slug: 'history',
    description: 'Fascinating accounts of civilizations, momentous wars, and world events.',
    iconName: 'Landmark',
    count: 4,
    featuredImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-philosophy',
    name: 'Philosophy & Ethics',
    slug: 'philosophy',
    description: 'Timeless human wisdom, stoicism, logic, and existential inquiry.',
    iconName: 'Brain',
    count: 4,
    featuredImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-finance',
    name: 'Finance & Investing',
    slug: 'finance',
    description: 'Wealth creation, stock markets, real estate, and financial freedom.',
    iconName: 'TrendingUp',
    count: 5,
    featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80'
  }
];
