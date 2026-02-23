import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNews } from '../context/NewsContext';
import CategoryTabs from '../components/layout/CategoryTabs';
import NewsCard from '../components/common/NewsCard';
import Pagination from '../components/common/Pagination';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorMessage from '../components/common/ErrorMessage';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const {
    news,
    loading,
    error,
    category,
    changeCategory,
    currentPage,
    totalPages,
    changePage,
    fetchNews,
    searchNews,
  } = useNews();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      searchNews(searchQuery.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    fetchNews({ category, page: 1 });
  };

  const handleRetry = () => {
    if (isSearching && searchQuery) {
      searchNews(searchQuery);
    } else {
      fetchNews({ category, page: currentPage });
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">{t('news.topHeadlines')}</h1>
          <p className="hero-subtitle">{t('app.description')}</p>
          
          <form onSubmit={handleSearch} className="search-bar">
            <div className="search-input-wrapper">
              <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('common.searchPlaceholder')}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="clear-btn"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <button type="submit" className="search-btn btn btn-primary" disabled={loading}>
              {t('nav.search')}
            </button>
          </form>
        </div>
      </div>

      {!isSearching && <CategoryTabs activeCategory={category} onCategoryChange={changeCategory} />}
      
      <div className="container">
        {isSearching && (
          <div className="search-results-header">
            <h2>
              {t('nav.search')}: <span className="search-query">"{searchQuery}"</span>
            </h2>
            <button onClick={handleClearSearch} className="back-btn">
              ← {t('common.loadMore')}
            </button>
          </div>
        )}

        {error ? (
          <ErrorMessage error={error} onRetry={handleRetry} />
        ) : loading ? (
          <LoadingSkeleton count={6} />
        ) : news.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📰</div>
            <h2>{t('common.noResults')}</h2>
            <p>{isSearching ? 'Try different keywords' : t('app.description')}</p>
            {isSearching && (
              <button onClick={handleClearSearch} className="btn btn-primary">
                {t('common.retry')}
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="news-grid">
              {news.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
