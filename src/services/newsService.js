import { newsApiClient, gNewsClient } from './apiClient';
import config from '../config';
import { getCacheKey, getCachedData, setCachedData } from '../utils/cacheDB';

export const newsService = {
  async getTopHeadlines(params = {}) {
    const { category = 'general', country = 'us', language = 'en', page = 1, pageSize = 20, from } = params;
    
    const cacheKey = getCacheKey('headlines', { category, country, language, page, from });
    const cached = await getCachedData(cacheKey);
    if (cached) {
      console.log('Using cached data from IndexedDB');
      return cached;
    }

    try {
      if (config.api.newsApiKey) {
        const apiParams = { category, country, page, pageSize };
        if (from) {
          apiParams.from = from;
        }
        
        const response = await newsApiClient.get('/top-headlines', {
          params: apiParams,
        });
        
        const result = {
          articles: response.data.articles || [],
          totalResults: response.data.totalResults || 0,
          source: 'newsapi',
        };
        
        await setCachedData(cacheKey, result);
        return result;
      } else if (config.api.gNewsApiKey) {
        const apiParams = { category, country, lang: language, page, max: pageSize };
        if (from) {
          apiParams.from = from;
        }
        
        const response = await gNewsClient.get('/top-headlines', {
          params: apiParams,
        });
        
        const result = {
          articles: response.data.articles || [],
          totalResults: response.data.totalArticles || 0,
          source: 'gnews',
        };
        
        await setCachedData(cacheKey, result);
        return result;
      } else {
        return this.getMockData(category, from);
      }
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  },

  async searchNews(query, params = {}) {
    const { language = 'en', page = 1, pageSize = 20, from } = params;
    
    const cacheKey = getCacheKey('search', { query, language, page, from });
    const cached = await getCachedData(cacheKey);
    if (cached) {
      console.log('Using cached search data from IndexedDB');
      return cached;
    }

    try {
      if (config.api.newsApiKey) {
        const apiParams = { q: query, language, page, pageSize, sortBy: 'publishedAt' };
        if (from) {
          apiParams.from = from;
        }
        
        const response = await newsApiClient.get('/everything', {
          params: apiParams,
        });
        
        const result = {
          articles: response.data.articles || [],
          totalResults: response.data.totalResults || 0,
          source: 'newsapi',
        };
        
        await setCachedData(cacheKey, result);
        return result;
      } else if (config.api.gNewsApiKey) {
        const apiParams = { q: query, lang: language, page, max: pageSize };
        if (from) {
          apiParams.from = from;
        }
        
        const response = await gNewsClient.get('/search', {
          params: apiParams,
        });
        
        const result = {
          articles: response.data.articles || [],
          totalResults: response.data.totalArticles || 0,
          source: 'gnews',
        };
        
        await setCachedData(cacheKey, result);
        return result;
      } else {
        return this.getMockData('search', from);
      }
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  },

  getMockData(category = 'general', from = null) {
    const now = Date.now();
    const articles = [
      {
        title: `Sample ${category} news article 1`,
        description: 'This is a sample news article. Please configure your API keys in the .env file to fetch real news.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/800x600?text=News+Image',
        publishedAt: new Date(now).toISOString(),
        source: { name: 'Sample Source' },
        author: 'Sample Author',
      },
      {
        title: `Sample ${category} news article 2`,
        description: 'Get your free API key from NewsAPI.org or GNews.io to start fetching real-time news from around the world.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/800x600?text=News+Image+2',
        publishedAt: new Date(now - 3600000).toISOString(),
        source: { name: 'Sample Source' },
        author: 'Sample Author',
      },
      {
        title: `Sample ${category} news article 3`,
        description: 'This platform supports multiple languages and dynamic translation. Configure your environment variables to enable all features.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/800x600?text=News+Image+3',
        publishedAt: new Date(now - 7200000).toISOString(),
        source: { name: 'Sample Source' },
        author: 'Sample Author',
      },
      {
        title: `Sample ${category} news article 4 (older)`,
        description: 'This is an older article for testing date filtering.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/800x600?text=News+Image+4',
        publishedAt: new Date(now - 86400000 * 8).toISOString(), // 8 days ago
        source: { name: 'Sample Source' },
        author: 'Sample Author',
      },
      {
        title: `Sample ${category} news article 5 (very old)`,
        description: 'This is a very old article for testing date filtering.',
        url: '#',
        urlToImage: 'https://via.placeholder.com/800x600?text=News+Image+5',
        publishedAt: new Date(now - 86400000 * 35).toISOString(), // 35 days ago
        source: { name: 'Sample Source' },
        author: 'Sample Author',
      },
    ];

    // Filter by date if from is provided
    let filteredArticles = articles;
    if (from) {
      const fromDate = new Date(from);
      filteredArticles = articles.filter(article => {
        const publishedDate = new Date(article.publishedAt);
        return publishedDate >= fromDate;
      });
    }

    return {
      articles: filteredArticles,
      totalResults: filteredArticles.length,
      source: 'mock',
    };
  },

  clearCache() {
    console.log('Cache cleared - will be automatically managed by IndexedDB');
  },
};

export default newsService;
