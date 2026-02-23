import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NewsProvider } from './context/NewsContext';
import Header from './components/layout/Header';
import Home from './pages/Home';
import ContactModal from './components/common/ContactModal';
import './i18n';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <NewsProvider>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
            <ContactModal />
          </div>
        </NewsProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
