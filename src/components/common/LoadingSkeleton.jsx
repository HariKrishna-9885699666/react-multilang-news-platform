import './LoadingSkeleton.css';

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="news-grid">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton skeleton-text skeleton-text-short"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text skeleton-text-medium"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
