import type { Book } from '../types';

export const MOCK_BOOKS: Book[] = [
  {
    id: 'book-1',
    title: 'The Echoes of Eternity',
    author: 'Elena Vance',
    authorBio: 'Elena Vance is an award-winning novelist renowned for her rich worldbuilding and emotional storytelling. She has published over 12 bestsellers globally.',
    description: 'An atmospheric tale of forgotten memories, ancient temporal gateways, and a scholar who uncovers a secret that could reshape the universe.',
    longDescription: 'In the quiet coastal village of Oakhaven, archivist Clara Vance stumbles upon a leather-bound journal written in an unidentifiable script. As she decipher its pages, she awakens a dormant temporal mechanism beneath the cliffside lighthouse—opening a doorway to parallel eras. Faced with guardians from past centuries, Clara must decide whether to restore lost timelines or protect the fragile present.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    price: 24.99,
    originalPrice: 29.99,
    category: 'Fiction',
    genre: 'Literary Fiction',
    rating: 4.8,
    reviews: 342,
    pages: 412,
    publishedDate: '2024-03-15',
    isbn: '978-0385547344',
    publisher: 'Aetheria House',
    language: 'English',
    format: 'Hardcover',
    featured: true,
    bestseller: true,
    popular: true,
    recommended: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Whispering Library',
        content: [
          'The rain tapped a soft, rhythm against the leaded glass windows of the St. Jude Archive. High above the cobblestone alleyways, Clara adjusted her spectacles and carefully lifted the velvet cloth covering the ledger.',
          'It was heavier than expected, bound in deep indigo leather embossed with silver constellation motifs. No author name was printed on the spine—only a solitary symbol resembling an hourglass enclosed in a serpent circle.',
          'As she traced her index finger over the silver foil, a subtle hum vibrated through the wooden table. The ink on the title page began to swirl as though caught in a gentle whirlpool.'
        ]
      },
      {
        id: 'c2',
        title: 'Chapter 2: The Lighthouse Threshold',
        content: [
          'By midnight, the storm had intensified. Waves collided against the jagged basalt rocks beneath the North Sentinel Lighthouse. Clara carried her brass lantern and the mysterious ledger up the spiral stairs.',
          'At the apex, where the great Fresnel lens usually reflected its beam out to sea, stood a beam of iridescent light that did not originate from bulb or flame. It shimmered in shades of violet and pale gold.',
          'Step by step, Clara approached the illumination. When her fingertips touched the light, the salty sea breeze vanished, replaced by the scent of cedar dust and ancient parchment.'
        ]
      },
      {
        id: 'c3',
        title: 'Chapter 3: Fractured Timelines',
        content: [
          'The sanctuary beyond the light was vast, illuminated by floating orb lamps. Thousands of tall bookshelves stretched into an infinite mist above.',
          'A figure in a dark tailored coat turned from a mahogany desk. "You were not supposed to find the third key so soon, Miss Vance," he said, his voice calm yet carrying the weight of centuries.'
        ]
      }
    ],
    customerReviews: [
      {
        id: 'r1',
        userName: 'Marcus Sterling',
        rating: 5,
        date: '2024-04-02',
        title: 'Breathtaking prose and unforgettable atmosphere',
        comment: 'Elena Vance has crafted a masterpiece. The pacing is deliberate and elegant, building to a climax that left me silent for an hour after finishing.',
        helpfulCount: 42
      },
      {
        id: 'r2',
        userName: 'Sophia Chen',
        rating: 4,
        date: '2024-04-18',
        title: 'Captivating temporal fiction',
        comment: 'Loved the lighthouse setting and character development. Highly recommended for fans of atmospheric mystery and speculative fiction.',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'book-2',
    title: 'Quantum Horizon',
    author: 'Dr. Aris Thorne',
    authorBio: 'Dr. Aris Thorne is a theoretical physicist and award-winning science fiction author whose work blends cutting-edge quantum mechanics with human drama.',
    description: 'When humanity’s first warp probe sends back signals from beyond the heliopause, a crew of specialists embarks on a mission into uncharted spacetime.',
    longDescription: 'Deep space vessel *Eventide* reaches the outer rim of our solar system, where quantum anomalies begin defying known physics. Commander Maya Lin and her crew discover an artificial structure orbiting a black hole proxy. As telemetry fails and temporal dilation separates the crew from Earth, they discover the artifact was built by humanity—millions of years in the future.',
    cover: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
    price: 19.99,
    originalPrice: 24.99,
    category: 'Science Fiction',
    genre: 'Hard Sci-Fi',
    rating: 4.9,
    reviews: 512,
    pages: 528,
    publishedDate: '2024-01-20',
    isbn: '978-0451499120',
    publisher: 'Hyperion Press',
    language: 'English',
    format: 'Paperback',
    featured: true,
    bestseller: true,
    newRelease: true,
    popular: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Signal at 100 AU',
        content: [
          'The telemetry board on bridge 4 flashed amber. Commander Maya Lin zoomed in on the frequency analysis.',
          'The signal was not background radiation. It was a structured binary sequence pulsed at precise intervals of 1.618 seconds—the Golden Ratio.',
          '"Adjust sensor array theta to intercept," Maya commanded. "Let us hear what the void is whispering to us."'
        ]
      },
      {
        id: 'c2',
        title: 'Chapter 2: The Void Structure',
        content: [
          'The silhouette against the event horizon was larger than Manhattan. Perfectly hexagonal, constructed from zero-friction metamaterial.',
          'As Eventide drew within five hundred kilometers, the ship’s chronometers began drifting by six seconds every minute.'
        ]
      }
    ],
    customerReviews: [
      {
        id: 'r3',
        userName: 'David Miller',
        rating: 5,
        date: '2024-02-10',
        title: 'Mind-bending sci-fi at its absolute finest!',
        comment: 'If you loved Interstellar and Contact, this book will blow your mind. Deep science combined with heartfelt human relationships.',
        helpfulCount: 88
      }
    ]
  },
  {
    id: 'book-3',
    title: 'The Sovereign Mind',
    author: 'Julian Mercer',
    authorBio: 'Julian Mercer is a cognitive scientist, executive coach, and author who has lectured at Oxford and Stanford on habit formation and mental resilience.',
    description: 'Master your focus, eliminate decision fatigue, and build indestructible mental clarity in an age of relentless distraction.',
    longDescription: 'In *The Sovereign Mind*, Julian Mercer synthesizes neurobiology, stoic philosophy, and modern cognitive psychology to offer a actionable framework for modern professionals. Learn how to reclaim your attention, design high-flow daily rituals, and develop emotional fortitude under high-pressure conditions.',
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
    price: 21.50,
    originalPrice: 26.00,
    category: 'Self Development',
    genre: 'Psychology & Growth',
    rating: 4.7,
    reviews: 820,
    pages: 310,
    publishedDate: '2023-11-05',
    isbn: '978-0735211292',
    publisher: 'Crown Vanguard',
    language: 'English',
    format: 'Hardcover',
    featured: true,
    bestseller: true,
    recommended: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Attention Economy',
        content: [
          'Attention is the most precious currency of the 21st century. Every notification, message, and algorithm is engineered to capture your cognitive bandwidth.',
          'To regain sovereignty over your life, you must first audit where your mental energy bleeds out daily.'
        ]
      },
      {
        id: 'c2',
        title: 'Chapter 2: Designing Deep Work Blocks',
        content: [
          'Shallow tasks create the illusion of productivity while eroding your capacity for high-value creation.',
          'Structuring 90-minute hyper-focused blocks allows the brain to enter deep flow states where complex problem solving becomes effortless.'
        ]
      }
    ]
  },
  {
    id: 'book-4',
    title: 'Whispers in the Mist',
    author: 'Charlotte Bronte-Smith',
    authorBio: 'Charlotte Bronte-Smith writes historical mysteries set in Victorian London and rural Scottish highlands.',
    description: 'A dark gothic thriller following a young governess who arrives at Blackwood Manor, only to find the estate hides deadly family secrets.',
    longDescription: 'Set in the windswept Yorkshire moors of 1888, Victoria Ashley takes a position as companion to the reclusive Lord Blackwood. When mysterious footsteps echo in the night and old portraits are found damaged, Victoria embarks on a dangerous quest to uncover the truth before she becomes the manor’s next victim.',
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    price: 16.99,
    originalPrice: 21.99,
    category: 'Mystery',
    genre: 'Gothic Suspense',
    rating: 4.6,
    reviews: 289,
    pages: 384,
    publishedDate: '2024-02-14',
    isbn: '978-0062693662',
    publisher: 'Gothic Willow Press',
    language: 'English',
    format: 'Paperback',
    newRelease: true,
    popular: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Carriage to Blackwood',
        content: [
          'The fog rolled thick over the moors, obscuring the iron gates of Blackwood Manor.',
          'Victoria clutched her travel satchel. The driver refused to step down, merely pointing up the winding stone steps toward the heavy oak door.'
        ]
      }
    ]
  },
  {
    id: 'book-5',
    title: 'Principles of Modern AI Systems',
    author: 'Dr. Marcus Vance & Sarah Jenkins',
    authorBio: 'Dr. Vance leads AI research at Vanguard Labs, while Sarah Jenkins is a senior principal machine learning engineer with 15+ years experience.',
    description: 'The definitive architectural guide for building, scaling, and deploying LLM applications, neural networks, and agentic systems.',
    longDescription: 'Master the engineering principles behind large language models, retrieval-augmented generation (RAG), autonomous AI agents, and enterprise-grade machine learning pipelines. Includes code patterns, evaluation frameworks, and system optimization techniques.',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    price: 49.99,
    originalPrice: 59.99,
    category: 'Technology',
    genre: 'Artificial Intelligence',
    rating: 4.9,
    reviews: 440,
    pages: 640,
    publishedDate: '2024-04-01',
    isbn: '978-1492051299',
    publisher: 'O’Tech Media',
    language: 'English',
    format: 'Paperback',
    featured: true,
    bestseller: true,
    newRelease: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Foundations of Agentic Architecture',
        content: [
          'Modern AI systems have evolved beyond passive pattern matchers into proactive agents capable of tool reasoning, state maintenance, and goal decomposition.',
          'In this chapter, we analyze the core loop of perceive, plan, execute, and verify.'
        ]
      }
    ]
  },
  {
    id: 'book-6',
    title: 'The Art of Capital & Wealth',
    author: 'Harrison Sterling',
    authorBio: 'Harrison Sterling is a veteran hedge fund manager, angel investor, and financial columnist whose insights are read by millions worldwide.',
    description: 'Unlocking timeless investment strategies, compounding assets, and building multigenerational financial freedom.',
    longDescription: 'Financial success is less about complex mathematical formulas and more about discipline, asset allocation, and understanding market psychology. Harrison Sterling breaks down high-yield wealth building strategies for modern investors.',
    cover: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    price: 27.99,
    originalPrice: 32.99,
    category: 'Finance',
    genre: 'Investing & Wealth',
    rating: 4.8,
    reviews: 630,
    pages: 360,
    publishedDate: '2023-09-12',
    isbn: '978-0593191720',
    publisher: 'Portfolio Wealth',
    language: 'English',
    format: 'Hardcover',
    bestseller: true,
    recommended: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Magic of Asymmetric Risk',
        content: [
          'True wealth accumulation comes from placing bets where your downside is strictly limited, while your upside remains virtually uncapped.',
          'We begin by analyzing how world-class capital allocators structure their portfolios.'
        ]
      }
    ]
  },
  {
    id: 'book-7',
    title: 'Kingdom of Starlight',
    author: 'Lyra Nightingale',
    authorBio: 'Lyra Nightingale is a Sunday Times bestselling fantasy novelist praised for her lyrical magic systems and captivating character arcs.',
    description: 'In a world where stars fall as crystalline blades, an exiled princess must reclaim her throne from shadow sorcerers.',
    longDescription: 'Princess Celestia was betrayed on the night of the Blood Moon. Cast out into the forbidden Whispering Woods, she discovers an ancient order of Starlight Knights who harness the elemental power of fallen meteors. Together, they launch a rebellion against the Eclipse Usurper.',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    price: 18.50,
    originalPrice: 22.50,
    category: 'Fantasy',
    genre: 'Epic Fantasy',
    rating: 4.9,
    reviews: 940,
    pages: 576,
    publishedDate: '2024-01-10',
    isbn: '978-0593356784',
    publisher: 'Celestial Realm Press',
    language: 'English',
    format: 'Hardcover',
    featured: true,
    popular: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Fallen Meteor',
        content: [
          'The sky split open like blue silk torn by a diamond blade. A streak of azure flame thundered across the horizon, embedding itself into the obsidian ridge.',
          'Celestia drew her cloak tighter against the frost. "That was no ordinary star," she whispered.'
        ]
      }
    ]
  },
  {
    id: 'book-8',
    title: 'The Stoic Leader',
    author: 'Marcus Aurelius Vance',
    authorBio: 'Marcus Aurelius Vance is a philosopher and executive advisor to Fortune 500 CEOs on ethical leadership and crisis management.',
    description: 'Timeless lessons from ancient philosophy applied to modern organizational leadership and team management.',
    longDescription: 'Navigating volatility, uncertainty, complexity, and ambiguity requires an unshakable inner compass. *The Stoic Leader* provides practical frameworks based on Seneca, Epictetus, and Marcus Aurelius to maintain composure and drive mission success.',
    cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
    price: 22.00,
    originalPrice: 27.00,
    category: 'Philosophy',
    genre: 'Leadership & Ethics',
    rating: 4.7,
    reviews: 310,
    pages: 288,
    publishedDate: '2023-10-18',
    isbn: '978-1524763282',
    publisher: 'Sentinel Philosophy',
    language: 'English',
    format: 'Hardcover',
    recommended: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Controlling the Controllables',
        content: [
          'You cannot control market downturns, supply chain disruptions, or competitor moves. You can only control your judgment, your response, and your character.',
          'This fundamental distinction is the cornerstone of stoic endurance.'
        ]
      }
    ]
  },
  {
    id: 'book-9',
    title: 'Letters from Florence',
    author: 'Isabella Rossini',
    authorBio: 'Isabella Rossini is an Italian-American author whose historical romance novels have been translated into 24 languages.',
    description: 'A passionate love story set against the backdrop of post-war Florence, art restoration, and hidden family letters.',
    longDescription: 'In the summer of 1952, art conservator Sofia travels to Florence to repair flood-damaged frescoes in an ancient monastery. There she meets Matteo, an enigmatic architect with a painful past. When they uncover letters hidden behind a 15th-century altarpiece, they unlock a tragic love story that echoes their own growing feelings.',
    cover: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
    price: 15.99,
    originalPrice: 19.99,
    category: 'Romance',
    genre: 'Historical Romance',
    rating: 4.6,
    reviews: 480,
    pages: 352,
    publishedDate: '2024-02-01',
    isbn: '978-0316420123',
    publisher: 'Tuscan Sun Books',
    language: 'English',
    format: 'Paperback',
    popular: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Arrival at Santa Maria',
        content: [
          'The morning sunlight washed over the red-tiled roofs of Florence in warm amber light.',
          'Sofia stepped out of the taxi, breathing in the scent of roasted espresso and damp river stone.'
        ]
      }
    ]
  },
  {
    id: 'book-10',
    title: 'Architects of Destiny: Churchill & Roosevelt',
    author: 'Prof. Arthur Pendelton',
    authorBio: 'Prof. Arthur Pendelton holds the Chair of Modern History at Cambridge and has authored several prize-winning WWII biographies.',
    description: 'A gripping dual biography exploring how two extraordinary leaders forged an alliance that saved western democracy.',
    longDescription: 'Through newly unsealed private correspondence and diplomatic logs, Professor Pendelton provides an intimate look into the strategic debates, personal warmth, and geopolitical chess matches between Winston Churchill and Franklin D. Roosevelt during World War II.',
    cover: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80',
    price: 32.50,
    originalPrice: 38.00,
    category: 'History',
    genre: 'Biography & WWII',
    rating: 4.9,
    reviews: 210,
    pages: 680,
    publishedDate: '2023-11-30',
    isbn: '978-0307266569',
    publisher: 'Clarendon History',
    language: 'English',
    format: 'Hardcover',
    bestseller: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Midnight Cable',
        content: [
          'On May 15, 1940, five days after becoming Prime Minister, Winston Churchill sat at his desk at 10 Downing Street and drafted his first secret message to President Roosevelt.'
        ]
      }
    ]
  },
  {
    id: 'book-11',
    title: 'Zero to Exponential',
    author: 'Vikram Patel',
    authorBio: 'Vikram Patel is a serial entrepreneur, startup founder, and venture capitalist who has backed over 40 unicorn companies.',
    description: 'How modern tech startups scale from initial napkin idea to global market dominance using hypergrowth playbook strategies.',
    longDescription: 'Building a venture-backed powerhouse requires mastering viral distribution, product-led growth, network effects, and high-velocity team execution. Vikram Patel shares first-principles lessons from Silicon Valley and global tech hubs.',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    price: 24.99,
    originalPrice: 29.99,
    category: 'Business',
    genre: 'Entrepreneurship',
    rating: 4.8,
    reviews: 750,
    pages: 320,
    publishedDate: '2024-03-01',
    isbn: '978-0525538318',
    publisher: 'Vanguard Enterprise',
    language: 'English',
    format: 'Hardcover',
    featured: true,
    newRelease: true,
    recommended: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Product-Market Fit Engine',
        content: [
          'Before scaling your marketing spending, you must achieve non-linear customer retention. True product-market fit happens when users get upset if your product goes down for an hour.'
        ]
      }
    ]
  },
  {
    id: 'book-12',
    title: 'The Midnight Alchemist',
    author: 'Gideon Cross',
    authorBio: 'Gideon Cross is a fantasy author and occult researcher known for dark academia and mysterious gothic worlds.',
    description: 'An underground secret society in 19th-century Prague experiments with alchemy to synthesize human dreams.',
    longDescription: 'In the shadowy alleyways of Old Town Prague, apprentice apothecary Julian joins the Order of the Silver Crucible. When their experimental elixir begins materializing nightmares into physical reality, Julian must race to destroy the formula before the entire city is engulfed.',
    cover: 'https://images.unsplash.com/photo-1474939557548-f842486be195?w=800&auto=format&fit=crop&q=80',
    price: 17.99,
    originalPrice: 22.99,
    category: 'Fantasy',
    genre: 'Dark Academia',
    rating: 4.7,
    reviews: 380,
    pages: 448,
    publishedDate: '2023-10-05',
    isbn: '978-1250170025',
    publisher: 'Alchemic Press',
    language: 'English',
    format: 'Paperback',
    popular: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Cobalt Vial',
        content: [
          'The cobbles of the Charles Bridge glistened under pale moonlight. Julian held the cold glass vial carefully inside his wool coat.'
        ]
      }
    ]
  },
  {
    id: 'book-13',
    title: 'Cybernetic Genesis',
    author: 'Nova Vance',
    authorBio: 'Nova Vance is a cyberpunk and futuristic fiction pioneer whose stories explore synthetic human consciousness.',
    description: 'In Neo-Tokyo 2099, a rogue android detective uncovers a conspiracy to wipe human memories from the global grid.',
    longDescription: 'Detective Kaelen-7 is a synthetic investigator built for homicide cases. When a high-ranking tech mogul is found murdered with zero digital footprint, Kaelen discovers a subterranean movement dedicated to preserving organic human memories before the total digital cloud migration.',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    price: 18.99,
    originalPrice: 23.99,
    category: 'Science Fiction',
    genre: 'Cyberpunk',
    rating: 4.8,
    reviews: 290,
    pages: 390,
    publishedDate: '2024-02-28',
    isbn: '978-0425284620',
    publisher: 'Neo-Grid Books',
    language: 'English',
    format: 'Paperback',
    newRelease: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Rain in Sector 9',
        content: [
          'Neon signs flickered through the acid rain in Sector 9. Kaelen wiped rain off his optical visor as the forensic scanner initialized.'
        ]
      }
    ]
  },
  {
    id: 'book-14',
    title: 'The Silent Investigator',
    author: 'Detective Ray Lawson',
    authorBio: 'Ray Lawson spent 25 years in homicide investigation before becoming a full-time crime novelist.',
    description: 'A cold case in Chicago reopens when new DNA evidence connects a senator to a crime committed thirty years ago.',
    longDescription: 'Detective Thomas Cole thought he had retired for good. But when an anonymous package arrives at his doorstep containing a victim’s locket from 1994, Cole is dragged back into a labyrinth of political corruption, cover-ups, and deadly betrayal.',
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    price: 15.50,
    originalPrice: 19.50,
    category: 'Mystery',
    genre: 'Crime Thriller',
    rating: 4.5,
    reviews: 410,
    pages: 368,
    publishedDate: '2023-08-14',
    isbn: '978-1501171345',
    publisher: 'Hardline Thrillers',
    language: 'English',
    format: 'Paperback',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Unopened Box',
        content: [
          'The brown paper package had no return address. Just Cole’s name written in shaky blue ballpoint pen.'
        ]
      }
    ]
  },
  {
    id: 'book-15',
    title: 'Atomic Habits for Creative Mindsets',
    author: 'Samantha Reed',
    authorBio: 'Samantha Reed is an artist, author, and creativity consultant who helps designers, writers, and musicians unblock creative flow.',
    description: 'Transform daily routines into powerful creative breakthroughs with micro-habits designed specifically for artists.',
    longDescription: 'Creative work often fails not from lack of talent, but from chaotic systems. Samantha Reed presents actionable micro-habits to eliminate perfectionism, establish daily studio routines, and produce meaningful work consistently.',
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
    price: 20.00,
    originalPrice: 25.00,
    category: 'Self Development',
    genre: 'Creativity & Flow',
    rating: 4.8,
    reviews: 670,
    pages: 272,
    publishedDate: '2024-01-05',
    isbn: '978-0735211299',
    publisher: 'Creative Catalyst',
    language: 'English',
    format: 'Paperback',
    bestseller: true,
    recommended: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The 15-Minute Studio Rule',
        content: [
          'You do not need an uninterrupted four-hour block to create something remarkable. You only need fifteen minutes of undivided devotion every single morning.'
        ]
      }
    ]
  },
  {
    id: 'book-16',
    title: 'The Quantum Investor',
    author: 'Alexander Wright',
    authorBio: 'Alexander Wright is a quantitative strategist and algorithms researcher on Wall Street.',
    description: 'Leveraging data science, machine learning models, and algorithmic hedging in modern market trading.',
    longDescription: 'Traditional fundamental analysis is no longer enough. *The Quantum Investor* introduces retail and professional traders to quantitative risk modeling, sentiment analysis scripts, and automated portfolio rebalancing.',
    cover: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    price: 39.99,
    originalPrice: 48.00,
    category: 'Finance',
    genre: 'Quantitative Trading',
    rating: 4.7,
    reviews: 195,
    pages: 420,
    publishedDate: '2023-12-10',
    isbn: '978-1119560111',
    publisher: 'Financial Data Press',
    language: 'English',
    format: 'Hardcover',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Algorithmic Alpha',
        content: [
          'In quantitative investing, alpha is not found in intuition—it is uncovered in non-obvious statistical anomalies across multi-asset correlations.'
        ]
      }
    ]
  },
  {
    id: 'book-17',
    title: 'Beyond the Event Horizon',
    author: 'Prof. Carl Saganov',
    authorBio: 'Prof. Carl Saganov is an astrophysicist and science communicator who has hosted documentaries on cosmology.',
    description: 'A journey through black holes, wormholes, dark matter, and the ultimate fate of our universe.',
    longDescription: 'Written with wonder and scientific rigor, *Beyond the Event Horizon* takes readers on a tour of cosmology’s greatest mysteries—from the Big Bang singularity to cosmic inflation and multiverse theories.',
    cover: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
    price: 23.50,
    originalPrice: 28.00,
    category: 'Science Fiction',
    genre: 'Astrophysics & Cosmos',
    rating: 4.9,
    reviews: 890,
    pages: 350,
    publishedDate: '2023-07-22',
    isbn: '978-0399588174',
    publisher: 'Cosmos Science Press',
    language: 'English',
    format: 'Hardcover',
    featured: true,
    recommended: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Fabric of Spacetime',
        content: [
          'Imagine universe as an infinite trampoline. Mass bends the fabric, and what we experience as gravity is simply objects sliding along these curved contours.'
        ]
      }
    ]
  },
  {
    id: 'book-18',
    title: 'The Paris Antiquarian',
    author: 'Claire Delacroix',
    authorBio: 'Claire Delacroix lives in Paris where she curates rare 18th-century manuscripts.',
    description: 'A charming story about a small bookshop along the Seine, a lost love letter, and second chances.',
    longDescription: 'When Jean-Luc inherits his grandfather’s quaint antiquarian bookstore on the Left Bank in Paris, he plans to sell it immediately. But inside an ornate edition of Victor Hugo, he finds a series of unmailed letters from 1944 that change his life forever.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    price: 17.50,
    originalPrice: 21.00,
    category: 'Fiction',
    genre: 'Contemporary Fiction',
    rating: 4.7,
    reviews: 530,
    pages: 328,
    publishedDate: '2024-01-18',
    isbn: '978-0451496587',
    publisher: 'Seine River Editions',
    language: 'English',
    format: 'Paperback',
    popular: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Left Bank Shop',
        content: [
          'The smell of old paper, leather polish, and dried lavender hit Jean-Luc as he turned the brass key in the door of *Librairie Saint-Germain*.'
        ]
      }
    ]
  },
  {
    id: 'book-19',
    title: 'Biomimicry & Future Design',
    author: 'Dr. Evelyn Thorne',
    authorBio: 'Dr. Evelyn Thorne is a bio-engineer and industrial designer whose work merges nature with sustainable tech.',
    description: 'How nature’s 3.8 billion years of evolution are inspiring revolutionary engineering and sustainable architecture.',
    longDescription: 'From bullet trains modeled after kingfisher beaks to self-cooling buildings inspired by termite mounds, *Biomimicry & Future Design* reveals how copying nature’s formulas solves humanity’s toughest engineering challenges.',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    price: 29.99,
    originalPrice: 35.00,
    category: 'Technology',
    genre: 'Design & Engineering',
    rating: 4.8,
    reviews: 140,
    pages: 380,
    publishedDate: '2024-03-10',
    isbn: '978-0062458193',
    publisher: 'Green Tech Publishing',
    language: 'English',
    format: 'Hardcover',
    newRelease: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Nature’s R&D Department',
        content: [
          'Nature does not generate toxic waste, nor does it require high-voltage furnaces to create materials stronger than steel. It synthesizes life at room temperature.'
        ]
      }
    ]
  },
  {
    id: 'book-20',
    title: 'The Empire of Silk & Spice',
    author: 'Tariq Al-Mansoor',
    authorBio: 'Tariq Al-Mansoor is a renowned historian specializing in medieval trade routes and cultural exchanges.',
    description: 'An epic historical narrative detailing the Silk Road caravans that connected China, Persia, and the Mediterranean.',
    longDescription: 'Explore the bustling bazaars of Samarkand, the mountain passes of the Pamirs, and the court of Kublai Khan through the eyes of merchants, envoys, and scholars who bridged East and West.',
    cover: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80',
    price: 31.00,
    originalPrice: 36.00,
    category: 'History',
    genre: 'World History',
    rating: 4.8,
    reviews: 260,
    pages: 512,
    publishedDate: '2023-09-25',
    isbn: '978-0307278562',
    publisher: 'Silk Road Books',
    language: 'English',
    format: 'Hardcover',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Caravan Out of Dunhuang',
        content: [
          'Two hundred camels laden with jade, silk bolts, and rhubarb powder stepped into the shifting sands of the Taklamakan Desert.'
        ]
      }
    ]
  },
  {
    id: 'book-21',
    title: 'Mindfulness for High Performers',
    author: 'Kaitlyn Vance',
    authorBio: 'Kaitlyn Vance is a meditation teacher and executive performance consultant for Olympic athletes.',
    description: 'Reduce stress, sharpen intuition, and stay calm in high-stakes environments using evidence-based mindfulness.',
    longDescription: 'High performance without inner peace leads to burnout. Kaitlyn Vance delivers actionable 5-minute breathing techniques, cognitive reframing drills, and evening decompression habits.',
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
    price: 18.99,
    originalPrice: 22.99,
    category: 'Self Development',
    genre: 'Mindfulness',
    rating: 4.6,
    reviews: 390,
    pages: 240,
    publishedDate: '2023-10-12',
    isbn: '978-1501144318',
    publisher: 'Zenith Life Press',
    language: 'English',
    format: 'Paperback',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Physiology of Calm',
        content: [
          'Your nervous system cannot distinguish between a physical tiger and a high-stress email. By controlling vagal tone through breathwork, you override panic instantly.'
        ]
      }
    ]
  },
  {
    id: 'book-22',
    title: 'The Shadow of the Crown',
    author: 'Sebastian King',
    authorBio: 'Sebastian King writes political thrillers set in modern European capitals.',
    description: 'A disgraced intelligence analyst uncovers a rogue faction within NATO planning a silent coup.',
    longDescription: 'When secret intelligence logs are leaked to journalist Maya Lin, analyst David Shaw becomes the prime suspect. On the run across Berlin and Vienna, Shaw must prove his innocence before the conspiracy triggers an international conflict.',
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    price: 16.99,
    originalPrice: 20.99,
    category: 'Mystery',
    genre: 'Political Thriller',
    rating: 4.7,
    reviews: 340,
    pages: 400,
    publishedDate: '2024-02-10',
    isbn: '978-0525538325',
    publisher: 'Vanguard Thrillers',
    language: 'English',
    format: 'Paperback',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Safehouse Berlin',
        content: [
          'The rain swept across Alexanderplatz. David checked his rear-view mirror three times before pulling into the underground garage.'
        ]
      }
    ]
  },
  {
    id: 'book-23',
    title: 'Enchanted Highlands',
    author: 'Fiona MacLeod',
    authorBio: 'Fiona MacLeod is a Scottish author renowned for romantic tales set in Isle of Skye.',
    description: 'A cozy romance about a castle restoration, an unexpected inheritance, and a rugged Scottish laird.',
    longDescription: 'Callum MacIntyre needs an architect to restore his ancestral castle before winter. American restorer Emma arrives in Inverness expecting a straightforward job, but finds herself enchanted by the misty lochs and Callum’s fierce devotion to his heritage.',
    cover: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
    price: 14.99,
    originalPrice: 18.99,
    category: 'Romance',
    genre: 'Contemporary Romance',
    rating: 4.8,
    reviews: 620,
    pages: 336,
    publishedDate: '2023-12-01',
    isbn: '978-1420148912',
    publisher: 'Highland Heart Books',
    language: 'English',
    format: 'Paperback',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Road to Skye',
        content: [
          'The single-lane road wound through heather-covered hills as mist descended over Loch Ness.'
        ]
      }
    ]
  },
  {
    id: 'book-24',
    title: 'The Great Philosophy Reader',
    author: 'Prof. Jonathan Gray',
    authorBio: 'Prof. Gray is Chair of Philosophy at Oxford University.',
    description: 'Essential writings from Plato and Aristotle to Kant, Nietzsche, and Hannah Arendt with commentary.',
    longDescription: 'An accessible anthology covering 2,500 years of human inquiry into truth, morality, justice, and the nature of consciousness. Ideal for students, thinkers, and lifelong learners.',
    cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
    price: 28.99,
    originalPrice: 34.99,
    category: 'Philosophy',
    genre: 'Ethics & Epistemology',
    rating: 4.9,
    reviews: 430,
    pages: 600,
    publishedDate: '2023-08-01',
    isbn: '978-0199540020',
    publisher: 'Oxford Academic',
    language: 'English',
    format: 'Hardcover',
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Allegory of the Cave',
        content: [
          'Plato invites us to picture human beings living in an underground cave, chained since childhood so that they can only see the shadows cast upon the wall before them.'
        ]
      }
    ]
  },
  {
    id: 'book-25',
    title: 'The Biography of Leonardo da Vinci',
    author: 'Walter Isaacson-Smith',
    authorBio: 'Walter Isaacson-Smith is a biographer known for bestsellers on Steve Jobs, Einstein, and Benjamin Franklin.',
    description: 'The monumental life of history’s greatest genius, based on thousands of pages of da Vinci’s personal notebooks.',
    longDescription: 'Leonardo da Vinci’s genius was rooted in insatiable curiosity. He dissected human bodies, calculated bird wing dynamics, designed flying machines, and painted the Mona Lisa. This biography weaves art, science, and human vulnerability.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    price: 35.00,
    originalPrice: 40.00,
    category: 'Biography',
    genre: 'Renaissance & Art',
    rating: 4.9,
    reviews: 1120,
    pages: 624,
    publishedDate: '2023-10-17',
    isbn: '978-1501139154',
    publisher: 'Simon & Schuster Heritage',
    language: 'English',
    format: 'Hardcover',
    bestseller: true,
    featured: true,
    recommended: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: The Youth of Vinci',
        content: [
          'Born out of wedlock in 1452 in the hill town of Vinci, Leonardo was blessed with an unquenchable desire to observe everything around him.'
        ]
      }
    ]
  },
  {
    id: 'book-26',
    title: 'Mastering React & Modern Web Dev',
    author: 'Alex Rivera',
    authorBio: 'Alex Rivera is a frontend architect and tech speaker who has built web apps serving millions of users.',
    description: 'Build enterprise-grade single page apps with modern React, TypeScript, state management, and tailwind styling.',
    longDescription: 'Learn step-by-step techniques to structure clean component trees, leverage client state, optimize render performance, and craft delightful user experiences.',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    price: 34.99,
    originalPrice: 42.00,
    category: 'Technology',
    genre: 'Web Development',
    rating: 4.9,
    reviews: 580,
    pages: 450,
    publishedDate: '2024-02-15',
    isbn: '978-1492070001',
    publisher: 'DevCraft Press',
    language: 'English',
    format: 'Paperback',
    newRelease: true,
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Component Design Patterns',
        content: [
          'Clean web applications rely on clear separation of concerns. Decouple presentation components from business logic stores to ensure maximum testability and maintainability.'
        ]
      }
    ]
  }
];
