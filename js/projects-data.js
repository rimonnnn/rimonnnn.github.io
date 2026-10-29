/* =========================================================
   projects-data.js — project details shown in the modal.
   Edit this file to add or change a project.
   Must load BEFORE project-modal.js.
========================================================= */
window.projectDetails = {
  news: {
    label: 'Functional App · Completed · API Integrated',
    title: 'News App',
    images: [
      { src: 'assets/en_search_news.jpg', fallback: 'https://rimonnnn.github.io/assets/news_home.jpg', alt: 'News App home feed screen' },
      { src: 'assets/search_news.jpg', fallback: 'https://rimonnnn.github.io/assets/news_categories.jpg', alt: 'News App categories screen' },
      { src: 'assets/en_details_news.jpg', fallback: 'https://rimonnnn.github.io/assets/news_article_details.jpg', alt: 'News App article details screen' },
      { src: 'assets/ar_details_news.jpg', fallback: 'https://rimonnnn.github.io/assets/news_search.jpg', alt: 'News App search screen' }
    ],
    overview: 'A live news Flutter app for browsing headlines through API data, with search, categories, article details, localization, and clear loading/error handling.',
    purpose: 'Build an API-based Flutter app that demonstrates real content fetching, category filtering, search, article details, and localization.',
    role: 'Built the UI, integrated NewsAPI with Dio, managed Cubit states, implemented routing, localization, and reusable widgets.',
    features: ['Live API headlines', 'Search flow', 'News categories', 'Article details screen', 'Arabic/English localization', 'Loading and error states'],
    technical: ['Dio for REST API requests', 'Cubit/Bloc for state management', 'GoRouter for navigation', 'Easy Localization for multilingual support', 'Cached Network Image for network images', 'ScreenUtil for responsive sizing'],
    challenges: 'Handled API loading, empty results, and error states clearly so the user experience stays understandable instead of showing broken screens.',
    tech: ['Flutter', 'Dart', 'Cubit', 'Bloc', 'Dio', 'NewsAPI', 'GoRouter', 'Easy Localization', 'Cached Network Image', 'ScreenUtil'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rimonnnn/news_app', primary: true },
      { label: 'Demo Video', url: 'https://drive.google.com/file/d/1yh2RKrWxusozg1gjavGbvnTWAoYrISUx/view?usp=drive_link' }
    ]
  },
  meals: {
    label: 'Local Storage App · Completed · SQLite',
    title: 'Meals App',
    images: [
      { src: 'assets/meals_app_1.jpg', fallback: 'https://rimonnnn.github.io/assets/meals_home.jpg', alt: 'Meals App recipe list screen' },
      { src: 'assets/meals_app_2.jpg', fallback: 'https://rimonnnn.github.io/assets/meals_details.jpg', alt: 'Meals App recipe details screen' },
      { src: 'assets/meals_app_3.jpg', fallback: 'https://rimonnnn.github.io/assets/meals_onboarding.jpg', alt: 'Meals App onboarding screen' },
      { src: 'assets/project_meals_app_photo.jpg', fallback: 'https://rimonnnn.github.io/assets/meals_favorites.jpg', alt: 'Meals App favorites screen' }
    ],
    overview: 'A local-storage Flutter recipe app for saving and viewing meals without depending on an online backend, with onboarding, validation, and responsive screens.',
    purpose: 'Create an offline-friendly app that proves local persistence, form handling, navigation, and clean screen structure.',
    role: 'Implemented the UI, SQLite flow, onboarding persistence, form validation, navigation, and responsive layouts.',
    features: ['Meal recipe screens', 'Local SQLite storage', 'Onboarding persistence', 'Form validation', 'Responsive UI', 'Clean navigation flow'],
    technical: ['SQLite for saved meal data', 'SharedPreferences for onboarding state', 'GoRouter for screen navigation', 'ScreenUtil for responsive UI', 'Reusable form and layout widgets'],
    challenges: 'Separated local data handling from UI flow so the app remains easier to maintain and expand.',
    tech: ['Flutter', 'Dart', 'SQLite', 'SharedPreferences', 'GoRouter', 'ScreenUtil', 'Form Validation'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rimonnnn/meals-app-', primary: true },
      { label: 'Demo Video', url: 'https://drive.google.com/file/d/1lrQaTsGKwYp64qPKxSP401-SRwm5Ph_c/view?usp=drive_link' }
    ]
  },
  shopino: {
    label: 'Functional App · Completed · Clean Architecture',
    title: 'Shopino',
    images: [
      { src: 'assets/splash_screen.jpg', fallback: 'https://rimonnnn.github.io/assets/splash_screen.jpg', alt: 'Shopino splash screen' },
      { src: 'assets/product_details.jpg', fallback: 'https://rimonnnn.github.io/assets/product_details.jpg', alt: 'Shopino product details screen' },
      { src: 'assets/cart.jpg', fallback: 'https://rimonnnn.github.io/assets/cart.jpg', alt: 'Shopino cart screen' },
      { src: 'assets/favorite.jpg', fallback: 'https://rimonnnn.github.io/assets/favorite.jpg', alt: 'Shopino favorites screen' }
    ],
    overview: 'A production-style Flutter e-commerce app covering authentication, product browsing, cart, and favorites, built with Clean Architecture, Cubit/Bloc, and full API integration.',
    purpose: 'Build a realistic shopping app flow that demonstrates product browsing, user actions, session handling, and API-driven screens end to end.',
    role: 'Designed and implemented the full app structure, authentication flow, API layer, state management, product modules, cart logic, and local session handling.',
    features: ['Authentication flow (login/signup)', 'Product listing', 'Product details with image gallery', 'Cart management', 'Favorites', 'Local token storage', 'API-driven screens'],
    technical: ['Clean Architecture (data/domain/presentation)', 'Cubit/Bloc state management', 'Dio for REST APIs', 'dartz Either for error handling', 'GetIt for dependency injection', 'GoRouter for navigation', 'Local storage for auth/session data'],
    challenges: 'Kept the architecture layered and testable while resolving real-world issues like GoRouter/BLoC navigation bugs, duplicate GlobalKey errors, and secure token storage across login/signup/logout flows.',
    tech: ['Flutter', 'Dart', 'Cubit/Bloc', 'Dio', 'GoRouter', 'GetIt', 'Clean Architecture', 'REST APIs'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rimonnnn/shopino_store', primary: true },
      { label: 'Demo Video', url: 'https://drive.google.com/file/d/1hLKaIuwPIpzSWSK5bf1QOYVSc8mJMEfF/view?usp=drivesdk' }
    ]
  },
  finance: {
    label: 'UI Project · Provider · Completed',
    title: 'Finance App UI',
    image: 'assets/project_finance_app_photo.jpg',
    fallbackImage: 'https://rimonnnn.github.io/assets/finance_app.png',
    imageAlt: 'Finance App UI screenshot showing dashboard and statistics screens',
    overview: 'A polished finance mobile UI project showing onboarding, authentication screens, OTP UI, dashboard screens, profile screens, and reusable custom components.',
    purpose: 'Demonstrate modern Flutter UI implementation, screen flow, reusable widgets, and responsive dashboard layouts.',
    role: 'Built reusable UI components, navigation flow, authentication screens, dashboard UI, profile UI, and Provider-based state handling.',
    features: ['Onboarding screens', 'Authentication UI', 'OTP UI', 'Dashboard screens', 'Profile screens', 'Reusable custom UI components'],
    technical: ['Provider and ChangeNotifier for simple state handling', 'GoRouter for navigation', 'ScreenUtil for responsive sizing', 'Flutter SVG support', 'Pin Code input UI', 'Carousel Slider for onboarding'],
    challenges: 'Kept the project clearly positioned as UI-focused without pretending it has backend integration.',
    tech: ['Flutter', 'Dart', 'Provider', 'ChangeNotifier', 'GoRouter', 'ScreenUtil', 'Flutter SVG', 'Pin Code', 'Carousel Slider', 'Custom UI'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rimonnnn/financeApp', primary: true },
      { label: 'Demo Video', url: 'https://drive.google.com/file/d/1J96z7iNbL92opdPAS02uuOmmN3QUyCTT/view?usp=drive_link' }
    ]
  },
  gridworld: {
    label: 'AI Project · Reinforcement Learning · Q-Learning',
    title: 'Grid World Q-Learning Game',
    image: './assets/grid_world_game.png',
    fallbackImage: 'assets/grid_world_game.png',
    imageAlt: 'Grid World Q-Learning Game cover showing agent, fire cells, and goal',
    overview: 'An interactive Python/Tkinter game demonstrating Q-Learning where an agent learns to reach a goal while avoiding fire cells using rewards, penalties, exploration, and a Q-table.',
    purpose: 'Show reinforcement learning basics through a visual grid environment where decisions improve over time based on Q-values and reward feedback.',
    role: 'Built the grid environment, movement rules, reward system, Q-table storage, learning flow, Tkinter interface, and playable web version.',
    features: ['Agent movement inside a grid', 'Start, goal, and fire cells', 'Reward and penalty system', 'Q-table learning', 'JSON persistence', 'Playable web version'],
    aiConcepts: ['Reinforcement Learning', 'Q-Learning', 'Q-table', 'Rewards and penalties', 'Exploration vs exploitation', 'State-action values'],
    technical: ['Q-Learning update logic', 'Grid environment design', 'Reward shaping', 'Tkinter UI for visualization', 'JSON storage for learned Q-values', 'Web version for portfolio interaction'],
    challenges: 'The main challenge was making the learning process understandable visually, not just mathematically. The solution was to keep the grid simple, show clear states, and connect actions with rewards, penalties, and saved Q-values.',
    tech: ['Python', 'Reinforcement Learning', 'Q-Learning', 'Tkinter', 'JSON', 'HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rimonnnn/grid_world_game.git', primary: true },
      { label: 'Try Game', url: 'grid_world_game/index.html', type: 'game' }
    ]
  }
};
