import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import newsService from '../services/newsService';
import translationService from '../services/translationService';

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = 20;
  const totalPages = Math.ceil(totalResults / pageSize);

  const fetchNews = async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const result = await newsService.getTopHeadlines({
        category: params.category || category,
        language: i18n.language,
        page: params.page || currentPage,
        pageSize,
      });

      let articles = result.articles;

      if (i18n.language !== 'en' && articles.length > 0) {
        articles = await translationService.translateArticles(
          articles,
          i18n.language,
          'en'
        );
      }

      setNews(articles);
      setTotalResults(result.totalResults);
    } catch (err) {
      setError(err.message);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const searchNews = async (query, params = {}) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      const result = await newsService.searchNews(query, {
        language: i18n.language,
        page: params.page || currentPage,
        pageSize,
      });

      let articles = result.articles;

      if (i18n.language !== 'en' && articles.length > 0) {
        articles = await translationService.translateArticles(
          articles,
          i18n.language,
          'en'
        );
      }

      setNews(articles);
      setTotalResults(result.totalResults);
    } catch (err) {
      setError(err.message);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
    setSearchQuery('');
  };

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (searchQuery) {
      searchNews(searchQuery, { page: currentPage });
    } else {
      fetchNews({ category, page: currentPage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, currentPage, i18n.language]);

  const value = {
    news,
    loading,
    error,
    currentPage,
    totalPages,
    category,
    searchQuery,
    fetchNews,
    searchNews,
    changeCategory,
    changePage,
    setSearchQuery,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export default NewsContext;
