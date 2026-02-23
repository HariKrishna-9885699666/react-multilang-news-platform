import axios from 'axios';
import config from '../config';

const translationCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000;

const getCacheKey = (text, targetLang) => {
  return `${text.substring(0, 50)}:${targetLang}`;
};

const getCachedTranslation = (key) => {
  const cached = translationCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  translationCache.delete(key);
  return null;
};

const setCachedTranslation = (key, data) => {
  translationCache.set(key, { data, timestamp: Date.now() });
};

export const translationService = {
  async translateText(text, targetLang, sourceLang = 'en') {
    if (!text || sourceLang === targetLang) {
      return text;
    }

    const cacheKey = getCacheKey(text, targetLang);
    const cached = getCachedTranslation(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(config.api.translationApiUrl + '/get', {
        params: {
          q: text,
          langpair: `${sourceLang}|${targetLang}`,
        },
        timeout: 5000,
      });

      if (response.data && response.data.responseData) {
        const translatedText = response.data.responseData.translatedText;
        setCachedTranslation(cacheKey, translatedText);
        return translatedText;
      }

      return text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  },

  async translateBatch(texts, targetLang, sourceLang = 'en') {
    if (!texts || texts.length === 0 || sourceLang === targetLang) {
      return texts;
    }

    try {
      const translations = await Promise.allSettled(
        texts.map((text) => this.translateText(text, targetLang, sourceLang))
      );

      return translations.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        }
        return texts[index];
      });
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts;
    }
  },

  async translateArticle(article, targetLang, sourceLang = 'en') {
    if (sourceLang === targetLang) {
      return article;
    }

    try {
      const [translatedTitle, translatedDescription] = await Promise.allSettled([
        this.translateText(article.title, targetLang, sourceLang),
        this.translateText(article.description || '', targetLang, sourceLang),
      ]);

      return {
        ...article,
        title: translatedTitle.status === 'fulfilled' ? translatedTitle.value : article.title,
        description: translatedDescription.status === 'fulfilled' ? translatedDescription.value : article.description,
        originalTitle: article.title,
        originalDescription: article.description,
        translated: true,
      };
    } catch (error) {
      console.error('Article translation error:', error);
      return article;
    }
  },

  async translateArticles(articles, targetLang, sourceLang = 'en') {
    if (!articles || articles.length === 0 || sourceLang === targetLang) {
      return articles;
    }

    try {
      const translatedArticles = await Promise.allSettled(
        articles.map((article) => this.translateArticle(article, targetLang, sourceLang))
      );

      return translatedArticles.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        }
        return articles[index];
      });
    } catch (error) {
      console.error('Articles translation error:', error);
      return articles;
    }
  },

  clearCache() {
    translationCache.clear();
  },
};

export default translationService;
