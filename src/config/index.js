export const config = {
  api: {
    newsApiKey: import.meta.env.VITE_NEWS_API_KEY,
    gNewsApiKey: import.meta.env.VITE_GNEWS_API_KEY,
    translationApiUrl: import.meta.env.VITE_TRANSLATION_API_URL || 'https://api.mymemory.translated.net',
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'MultiLang News Platform',
    defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'en',
  },
  api_endpoints: {
    newsApi: import.meta.env.PROD ? '/api/news' : 'https://newsapi.org/v2',
    gNews: 'https://gnews.io/api/v4',
  },
  categories: [
    { id: 'general', label: 'General' },
    { id: 'business', label: 'Business' },
    { id: 'technology', label: 'Technology' },
    { id: 'sports', label: 'Sports' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'health', label: 'Health' },
    { id: 'science', label: 'Science' },
    { id: 'world', label: 'World' },
    { id: 'politics', label: 'Politics' },
    { id: 'finance', label: 'Finance' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'travel', label: 'Travel' },
  ],
  supportedLanguages: [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  ],
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
};

export default config;
