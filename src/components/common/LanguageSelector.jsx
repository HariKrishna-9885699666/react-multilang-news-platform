import { useTranslation } from 'react-i18next';
import config from '../../config';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  const currentLang = config.supportedLanguages.find(
    (lang) => lang.code === i18n.language
  ) || config.supportedLanguages[0];

  return (
    <div className="language-selector">
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="language-select"
      >
        {config.supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.nativeName}
          </option>
        ))}
      </select>
      <div className="language-display">
        <span className="language-flag">{currentLang.flag}</span>
        <span className="language-name">{currentLang.nativeName}</span>
        <span className="language-arrow">▼</span>
      </div>
    </div>
  );
};

export default LanguageSelector;
