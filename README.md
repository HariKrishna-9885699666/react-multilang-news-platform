# 📰 MultiLang News Platform

A modern, production-ready React application for browsing global news in multiple languages with real-time translation capabilities.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Yarn](https://img.shields.io/badge/Yarn-4.12.0-2C8EBB)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF)

## 🌟 Features

### Core Features
- **🌍 Multi-Language Support**: Browse news in 12 languages including English, Hindi, Spanish, French, German, Telugu, Tamil, Kannada, Malayalam, Portuguese, Japanese, and Chinese
- **🚩 Language Flags**: Country flag emojis in language selector for better visual identification
- **🔄 Real-Time Translation**: Automatic content translation powered by MyMemory API
- **📱 Fully Responsive Design**: Mobile-first approach, works seamlessly across all devices (desktop, tablet, mobile)
- **⚡ Fast & Optimized**: IndexedDB caching with 1-hour expiry, code splitting, and lazy loading
- **🎨 Modern UI/UX**: Beautiful, vibrant color scheme with smooth animations and hover effects
- **🌓 Light/Dark Theme**: Toggle between light and dark modes with smooth transitions
- **📰 Multiple News Sources**: Support for NewsAPI and GNews with automatic fallback
- **🔍 Integrated Search**: Search functionality directly on home page (no separate screen)
- **📑 Category Browsing**: Browse by 12 categories (General, Business, Technology, Sports, Entertainment, Health, Science, World, Politics, Finance, Lifestyle, Travel)
- **💼 Developer Contact**: Floating contact modal with developer information and social links
- **🖼️ Fallback Images**: Default news images when original images fail to load
- **♿ Accessible**: WCAG compliant with keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- Yarn 4.12.0 (Berry)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd react-multilang-news-platform
```

2. **Install dependencies**

```bash
yarn install
```

3. **Configure API Keys**

Copy the environment template and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
VITE_NEWS_API_KEY=your_newsapi_key_here
VITE_GNEWS_API_KEY=your_gnews_key_here
```

**Get free API keys:**
- NewsAPI: https://newsapi.org/register (Free tier: 100 requests/day)
- GNews: https://gnews.io/register (Free tier: 100 requests/day)

> **Note**: The app works with mock data if no API keys are configured, perfect for development and testing the UI.

4. **Start the development server**

```bash
yarn dev
```

Open http://localhost:5173 in your browser.

## 📁 Project Structure

```
react-multilang-news-platform/
├── src/
│   ├── components/          # React components
│   │   ├── common/          # Reusable components
│   │   │   ├── ContactModal.jsx     # Floating developer contact modal
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── LanguageSelector.jsx # Language switcher with flags
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   ├── NewsCard.jsx         # News article card with fallback images
│   │   │   ├── Pagination.jsx
│   │   │   └── ThemeToggle.jsx      # Light/Dark theme switcher
│   │   └── layout/          # Layout components
│   │       ├── CategoryTabs.jsx     # 12 news categories
│   │       └── Header.jsx
│   ├── pages/               # Page components
│   │   └── Home.jsx                 # Home page with integrated search
│   ├── services/            # API service layer
│   │   ├── apiClient.js
│   │   ├── newsService.js
│   │   └── translationService.js
│   ├── context/             # React Context for state management
│   │   ├── NewsContext.jsx          # News state management
│   │   ├── ThemeContext.jsx         # Theme state management
│   │   └── index.js
│   ├── locales/             # Translation files for 12 languages
│   │   ├── en/translation.json
│   │   ├── hi/translation.json
│   │   ├── es/translation.json
│   │   ├── fr/translation.json
│   │   ├── de/translation.json
│   │   ├── te/translation.json
│   │   ├── ta/translation.json
│   │   ├── kn/translation.json
│   │   ├── ml/translation.json
│   │   ├── pt/translation.json
│   │   ├── ja/translation.json
│   │   └── zh/translation.json
│   ├── config/              # App configuration
│   │   └── index.js
│   ├── utils/               # Utility functions
│   │   └── cacheDB.js               # IndexedDB caching utility
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   ├── i18n.js              # i18next configuration
│   └── index.css            # Global styles with CSS variables
├── public/
│   └── favicon.svg          # Custom SVG favicon
├── .env                     # Environment variables
├── .env.example             # Environment template
├── package.json             # Version 2.0.0
├── vite.config.js
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_NEWS_API_KEY` | NewsAPI key | No* | - |
| `VITE_GNEWS_API_KEY` | GNews API key | No* | - |
| `VITE_TRANSLATION_API_URL` | Translation API endpoint | No | MyMemory API |
| `VITE_DEFAULT_LANGUAGE` | Default app language | No | en |
| `VITE_APP_NAME` | Application name | No | MultiLang News Platform |

*At least one news API key is recommended for production use.

### Supported Languages

| Code | Language | Native Name | Flag |
|------|----------|-------------|------|
| en | English | English | 🇬🇧 |
| hi | Hindi | हिन्दी | 🇮🇳 |
| es | Spanish | Español | 🇪🇸 |
| fr | French | Français | 🇫🇷 |
| de | German | Deutsch | 🇩🇪 |
| te | Telugu | తెలుగు | 🇮🇳 |
| ta | Tamil | தமிழ் | 🇮🇳 |
| kn | Kannada | ಕನ್ನಡ | 🇮🇳 |
| ml | Malayalam | മലയാളം | 🇮🇳 |
| pt | Portuguese | Português | 🇵🇹 |
| ja | Japanese | 日本語 | 🇯🇵 |
| zh | Chinese | 中文 | 🇨🇳 |

### News Categories

- General
- Business
- Technology
- Sports
- Entertainment
- Health
- Science
- World
- Politics
- Finance
- Lifestyle
- Travel

## 🛠️ Available Scripts

```bash
# Development server (with hot reload)
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint
```

## 🏗️ Architecture

### Technology Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Package Manager**: Yarn 4.12.0 (Berry)
- **Routing**: React Router DOM 7.5.0
- **Internationalization**: i18next + react-i18next
- **HTTP Client**: Axios
- **State Management**: React Context API

### Key Features Implementation

#### 1. Multi-Language Support
- Uses `i18next` with browser language detection
- Stores language preference in localStorage
- Lazy loads translation bundles for performance

#### 2. News Fetching
- Abstracted API layer supporting multiple news providers
- IndexedDB persistent caching with 1-hour expiry
- Automatic cache cleanup every 10 minutes
- Automatic fallback to mock data
- Error handling with retry mechanism
- Default images for failed news article images

#### 3. Translation Service
- Integrates with MyMemory Translation API
- Batch translation support
- 30-minute cache for translated content
- Graceful fallback to original content

#### 4. Performance Optimizations
- Code splitting with React lazy loading
- Image lazy loading
- Request debouncing for search
- Pagination for large datasets
- Efficient caching strategies

## 🎨 UI/UX Features

- **Modern Design**: Clean, vibrant interface with gradient accents
- **Light/Dark Theme**: Toggle switch with smooth transitions and persistent preference
- **Fully Responsive**: Mobile-first design with optimized layouts for all screen sizes
- **Smooth Animations**: Fade-in effects, hover states, and smooth transitions
- **Loading States**: Skeleton screens for better perceived performance
- **Error Boundaries**: Graceful error handling with retry options
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation
- **Visual Feedback**: Hover effects, active states, and clear call-to-actions
- **Category Grid**: Equal-width category boxes with responsive 12-column grid
- **Contact Modal**: Compact developer contact card with social links
- **Flag Indicators**: Visual language identification with country flags

## 📊 Performance Metrics

Target metrics (Lighthouse):
- Performance: > 85
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 85

## 🔒 Security

- API keys stored in environment variables
- No secrets in source code
- HTTPS-only API calls
- Input validation and sanitization
- Rate limit handling

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
yarn build

# Publish directory
dist
```

### Environment Variables
Don't forget to add your environment variables in the deployment platform:
- `VITE_NEWS_API_KEY`
- `VITE_GNEWS_API_KEY`

## 🧪 Testing

The application includes:
- Mock data for testing without API keys
- Error boundary for catching runtime errors
- Comprehensive error messages

## 📝 API Integration Guide

### NewsAPI Integration

```javascript
// Already configured in src/services/newsService.js
// Just add your API key to .env:
VITE_NEWS_API_KEY=your_key_here
```

### GNews Integration

```javascript
// Already configured in src/services/newsService.js
// Just add your API key to .env:
VITE_GNEWS_API_KEY=your_key_here
```

### Custom Translation API

Update `VITE_TRANSLATION_API_URL` in `.env` to use a custom translation service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- NewsAPI for news data
- GNews for alternative news source
- MyMemory for translation services
- React community for excellent tools and libraries

## 📞 Support & Contact

**Developer**: Hari Krishna Anem  
**Education**: B.Tech (CSIT)  
**Location**: Hyderabad, India  

### Contact
- 📱 Phone: +91 9885699666
- 📧 Email: anemharikrishna@gmail.com
- 💻 GitHub: [HariKrishna-9885699666](https://github.com/HariKrishna-9885699666)
- 💼 LinkedIn: [anemharikrishna](https://linkedin.com/in/anemharikrishna)
- ✍️ Blog: [hashnode.com/@HariKrishna-9885699666](https://hashnode.com/@HariKrishna-9885699666)
- 🌐 Portfolio: [harikrishna.is-a-good.dev](https://harikrishna.is-a-good.dev)

For issues and questions:
1. Check existing documentation
2. Review closed issues on GitHub
3. Open a new issue with detailed description

## 🗺️ Roadmap

### Completed in Version 2.0
- [x] Light/Dark theme toggle
- [x] 12+ language support (including Indian languages)
- [x] Integrated search on home page
- [x] Modern UI with vibrant colors
- [x] IndexedDB caching with auto-cleanup
- [x] Developer contact modal
- [x] Country flags in language selector
- [x] Default fallback images for news articles
- [x] Responsive category grid layout

### Future Enhancements
- [ ] Server-Side Rendering (Next.js migration)
- [ ] Progressive Web App (PWA) support
- [ ] Push notifications for breaking news
- [ ] User authentication
- [ ] Saved articles feature
- [ ] AI-powered news summarization
- [ ] Personalized recommendations
- [ ] Social sharing features
- [ ] Bookmarking and favorites
- [ ] Advanced filtering (by source, date range, popularity)

## 📈 Metrics & Analytics

To add analytics:
1. Install analytics package (e.g., `react-ga4`)
2. Add tracking ID to environment variables
3. Initialize in `src/main.jsx`

---

**Version**: 2.0.0  
**Built with ❤️ using React 19.2.0, Vite 7.3.1, and Yarn 4.12.0**  
**Author**: Hari Krishna Anem
