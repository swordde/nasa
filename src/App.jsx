import React, { useState } from 'react';
import { AuthProvider } from './hooks/useAuth.jsx';
import Header from './components/Header';
import Hero from './components/Hero';
import KnowledgeGraph from './components/KnowledgeGraph';
import Welcome from './components/Welcome';
import SearchPage from './components/SearchPage';
import ResourcesPage from './components/ResourcesPage';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'search':
        return <SearchPage setCurrentPage={setCurrentPage} />;
      case 'resources':
        return <ResourcesPage setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <UserProfile setCurrentPage={setCurrentPage} />;
      case 'home':
      default:
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <KnowledgeGraph setCurrentPage={setCurrentPage} />
            <Welcome setCurrentPage={setCurrentPage} />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
