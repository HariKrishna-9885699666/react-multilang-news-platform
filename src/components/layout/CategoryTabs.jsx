import { useTranslation } from 'react-i18next';
import config from '../../config';
import './CategoryTabs.css';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const { t } = useTranslation();

  return (
    <div className="category-tabs">
      <div className="container">
        <div className="tabs-wrapper">
          {config.categories.map((category) => (
            <button
              key={category.id}
              className={`tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              {t(`categories.${category.id}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
