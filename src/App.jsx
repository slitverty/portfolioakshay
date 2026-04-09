import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import AdminControls from './admin/AdminControls';
import initialPortfolioData from './data/portfolio.json';

const STORAGE_KEY = 'portfolio_admin_data';

function getInitialData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
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
  const navigate = useNavigate();

  // Fetch from global Vercel KV on mount
  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const res = await fetch('/api/get-portfolio');
        if (res.ok) {
          const globalData = await res.json();
          // If the DB returned data and it looks valid
          if (globalData && globalData.hero && globalData.about && globalData.works && globalData.contact) {
            setData(globalData);
            // Optionally update local storage so it stays fresh
            localStorage.setItem(STORAGE_KEY, JSON.stringify(globalData));
          }
        }
      } catch (err) {
        console.warn('Could not fetch global data, falling back to local.', err);
      }
    };
    fetchGlobalData();
  }, []);

  const handleSaveData = async (newData) => {
    // 1. Update React state immediately (optimistic UI)
    setData(newData);

    // 2. Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('localStorage save failed:', e);
    }

    // 3. Send to Vercel KV via serverless function
    try {
      const res = await fetch('/api/save-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (!res.ok) {
        throw new Error('Server responded with ' + res.status);
      }
      console.log('✅ Global portfolio data updated on Vercel Redis');
    } catch (err) {
      console.error('Failed to write to Redis api:', err);
    }
    
    // 4. Navigate back to the main site when done saving
    navigate('/');
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Portfolio data={data} />} />
        <Route 
          path="/admin" 
          element={
            <AdminControls
              data={data}
              onSave={handleSaveData}
              onClose={() => navigate('/')}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
