import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './NewsCard.css';

const NewsCard = ({ article }) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';
  const imageUrl = imageError ? defaultImage : (article.urlToImage || article.image || defaultImage);

  return (
    <article className="news-card fade-in">
      <div className="news-card-image-wrapper">
        <img
          src={imageUrl}
          alt={article.title}
          className="news-card-image"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-card-source">
            {article.source?.name || t('news.source')}
          </span>
          <span className="news-card-date">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <h3 className="news-card-title">{article.title}</h3>
        {article.description && (
          <p className="news-card-description">{article.description}</p>
        )}
        {article.author && (
          <p className="news-card-author">
            {t('news.author')}: {article.author}
          </p>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card-link"
        >
          {t('common.readMore')}
          <span>→</span>
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
