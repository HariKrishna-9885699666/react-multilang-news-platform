import { useTranslation } from 'react-i18next';
import './ErrorMessage.css';

const ErrorMessage = ({ error, onRetry }) => {
  const { t } = useTranslation();

  const getErrorMessage = (error) => {
    if (typeof error === 'string') {
      if (error === 'API_LIMIT_EXCEEDED') {
        return t('errors.apiLimit');
      } else if (error === 'NETWORK_ERROR') {
        return t('errors.networkError');
      }
      return error;
    }
    return t('errors.fetchFailed');
  };

  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">{t('common.error')}</h2>
      <p className="error-message">{getErrorMessage(error)}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          {t('common.retry')}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
