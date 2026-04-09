import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Covers from './components/Covers';
import Contact from './components/Contact';
import AdminControls from './admin/AdminControls';
import initialPortfolioData from './data/portfolio.json';

const STORAGE_KEY = 'portfolio_admin_data';

function getInitialData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Basic validation: must have expected top-level keys
      if (parsed && parsed.hero && parsed.about && parsed.works && parsed.contact) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load stored portfolio data:', e);
  }
  return initialPortfolioData;
}

function App() {
  const [data, setData] = useState(getInitialData);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleSaveData = async (newData) => {
    // 1. Update React state immediately
    setData(newData);

    // 2. Persist to localStorage (instant, survives reloads)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('localStorage save failed:', e);
    }

    // 3. Close admin panel so the user sees the updated page
    setIsAdminOpen(false);

    // 4. Sync to the JSON file for deployment persistence (background)
    try {
      if (import.meta.env.DEV) {
        const res = await fetch('/api/save-portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData)
        });
        if (!res.ok) throw new Error('Server responded with ' + res.status);
        console.log('✅ portfolio.json updated on disk');
      }
    } catch (err) {
      console.error('Failed to write portfolio.json:', err);
    }
  };

  return (
    <div className="app-container">
      {/* Admin Button Top Right */}
      <button
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 50,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '0.85rem',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}
        onClick={() => setIsAdminOpen(true)}
      >
        AC
      </button>

      {isAdminOpen && (
        <AdminControls
          data={data}
          onSave={handleSaveData}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      <Hero data={data.hero} />
      <About data={data.about} />
      <Works data={data.works} />
      <Covers data={data.covers} />
      <Contact data={data.contact} />
    </div>
  );
}

export default App;
