import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNews } from '../context/NewsContext';
import NewsCard from '../components/common/NewsCard';
import Pagination from '../components/common/Pagination';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorMessage from '../components/common/ErrorMessage';
import './Search.css';

const Search = () => {
  const { t } = useTranslation();
  const {
    news,
    loading,
    error,
    searchQuery,
    searchNews,
    currentPage,
    totalPages,
    changePage,
  } = useNews();

  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      searchNews(inputValue.trim());
    }
  };

  const handleRetry = () => {
    if (searchQuery) {
      searchNews(searchQuery);
    }
  };

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-header">
          <h1 className="page-title">{t('nav.search')}</h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('common.searchPlaceholder')}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              🔍 {t('nav.search')}
            </button>
          </form>
        </div>

        {error ? (
          <ErrorMessage error={error} onRetry={handleRetry} />
        ) : !searchQuery ? (
          <div className="search-empty">
            <div className="search-icon">🔍</div>
            <h2>{t('nav.search')}</h2>
            <p>{t('common.searchPlaceholder')}</p>
          </div>
        ) : loading ? (
          <LoadingSkeleton count={6} />
        ) : news.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📰</div>
            <h2>{t('common.noResults')}</h2>
            <p>Try searching with different keywords</p>
          </div>
        ) : (
          <>
            <div className="search-results-header">
              <p className="search-results-count">
                Found {news.length} results for "{searchQuery}"
              </p>
            </div>
            
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

export default Search;
