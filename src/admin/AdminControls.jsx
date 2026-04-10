import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Check } from 'lucide-react';
import './AdminControls.css';

const AdminControls = ({ data, onSave, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorLabel, setErrorLabel] = useState('');

  // Clone the data for editing — re-sync when `data` prop changes (e.g. panel re-opened)
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(data)));
  const [saveStatus, setSaveStatus] = useState(null); // null | 'saving' | 'saved'

  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(data)));
  }, [data]);
  const [activeTab, setActiveTab] = useState('Hero');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '90210') {
      setIsAuthenticated(true);
      setErrorLabel('');
    } else {
      setErrorLabel('Incorrect Passcode');
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    // Brief visual feedback before parent closes the panel
    setTimeout(() => {
      onSave(formData);
      setSaveStatus('saved');
      setErrorLabel('');
    }, 300);
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedChange = (section, nestedObject, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedObject]: {
          ...prev[section][nestedObject],
          [field]: value
        }
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const handleAboutFeatureChange = (index, field, value) => {
    setFormData(prev => {
      const newFeatures = [...prev.about.features];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      return {
        ...prev,
        about: { ...prev.about, features: newFeatures }
      };
    });
  };

  const addArrayItem = (section, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), { id: Date.now(), ...defaultItem }]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const tabs = ['Hero', 'About', 'Works', 'Covers', 'Contact'];

  return (
    <div className="admin-overlay">
      {!isAuthenticated ? (
        <motion.div
          className="admin-login"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Admin Access</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              className="admin-input-dark"
              placeholder="Code"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              autoFocus
            />
            {errorLabel && <div className="error-msg">{errorLabel}</div>}
            <button type="submit" className="admin-btn">Enter Dashboard</button>
            <button type="button" className="admin-btn admin-close" onClick={onClose}>Cancel</button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          className="admin-dashboard-ui"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="admin-header">
            <div>
              <h2>Portfolio Controls</h2>
              <div className="admin-tabs">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="actions">
              <button className="admin-btn admin-btn-save" onClick={handleSave} disabled={saveStatus === 'saving'}>
                {saveStatus === 'saving' ? (
                  <><Check size={16} /> Saving...</>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button className="admin-btn admin-close" onClick={onClose}><X size={20} /></button>
            </div>
          </div>

          <div className="admin-editor-wrapper styled-scroll">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="tab-content"
              >
                {activeTab === 'Hero' && (
                  <div className="form-section">
                    <label>Main Title</label>
                    <input className="ui-input" value={formData.hero.title} onChange={e => handleChange('hero', 'title', e.target.value)} />

                    <label>Subtitle / Roles</label>
                    <input className="ui-input" value={formData.hero.subtitle} onChange={e => handleChange('hero', 'subtitle', e.target.value)} placeholder="Singer | Sound Engineer" />
                  </div>
                )}

                {activeTab === 'About' && (
                  <div className="form-section">
                    <label>Biography Text</label>
                    <textarea className="ui-textarea" rows="4" value={formData.about.text} onChange={e => handleChange('about', 'text', e.target.value)} />

                    <h3 className="sub-heading">Features Grid</h3>
                    {formData.about.features.map((feature, i) => (
                      <div key={i} className="card-editor">
                        <label>Feature {i + 1} Title</label>
                        <input className="ui-input" value={feature.title} onChange={e => handleAboutFeatureChange(i, 'title', e.target.value)} />
                        <label>Feature {i + 1} Description</label>
                        <textarea className="ui-textarea" rows="2" value={feature.description} onChange={e => handleAboutFeatureChange(i, 'description', e.target.value)} />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Works' && (
                  <div className="form-section flex-col">
                    <div className="section-head">
                      <p>Manage your video features</p>
                      <button className="add-btn" onClick={() => addArrayItem('works', { title: "New Work", role: "", description: "", videoUrl: "", youtubeUrl: "" })}>
                        <Plus size={16} /> Add Project
                      </button>
                    </div>
                    {formData.works?.map((work, i) => (
                      <div key={work.id || i} className="card-editor">
                        <div className="card-editor-header">
                          <h4>{work.title || 'Untitled Project'}</h4>
                          <button className="delete-btn" onClick={() => removeArrayItem('works', i)}><Trash2 size={16} /></button>
                        </div>
                        <label>Title</label>
                        <input className="ui-input" value={work.title} onChange={e => handleArrayChange('works', i, 'title', e.target.value)} />
                        <label>Role</label>
                        <input className="ui-input" value={work.role} onChange={e => handleArrayChange('works', i, 'role', e.target.value)} />
                        <label>Description</label>
                        <textarea className="ui-textarea" rows="2" value={work.description} onChange={e => handleArrayChange('works', i, 'description', e.target.value)} />
                        <label>YouTube Embed URL</label>
                        <input className="ui-input" value={work.videoUrl || ''} onChange={e => handleArrayChange('works', i, 'videoUrl', e.target.value)} />
                        <label>Original YouTube Link</label>
                        <input className="ui-input" value={work.youtubeUrl || ''} onChange={e => handleArrayChange('works', i, 'youtubeUrl', e.target.value)} />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <div style={{ flex: 1 }}>
                            <label>Spotify Link </label>
                            <input className="ui-input" value={work.spotifyUrl || ''} onChange={e => handleArrayChange('works', i, 'spotifyUrl', e.target.value)} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label>Instagram Link </label>
                            <input className="ui-input" value={work.instaUrl || ''} onChange={e => handleArrayChange('works', i, 'instaUrl', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Covers' && (
                  <div className="form-section flex-col">
                    <div className="section-head">
                      <p>Manage secondary visual features/covers</p>
                      <button className="add-btn" onClick={() => addArrayItem('covers', { title: "New Cover", videoUrl: "" })}>
                        <Plus size={16} /> Add Cover
                      </button>
                    </div>
                    {formData.covers?.map((cover, i) => (
                      <div key={cover.id || i} className="card-editor">
                        <div className="card-editor-header">
                          <h4>{cover.title || 'Untitled Cover'}</h4>
                          <button className="delete-btn" onClick={() => removeArrayItem('covers', i)}><Trash2 size={16} /></button>
                        </div>
                        <label>Title</label>
                        <input className="ui-input" value={cover.title} onChange={e => handleArrayChange('covers', i, 'title', e.target.value)} />
                        <label>Instagram Reel URL</label>
                        <input className="ui-input" value={cover.videoUrl || ''} onChange={e => handleArrayChange('covers', i, 'videoUrl', e.target.value)} />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Contact' && (
                  <div className="form-section">
                    <label>Contact Intro Text</label>
                    <textarea className="ui-textarea" rows="3" value={formData.contact.text} onChange={e => handleChange('contact', 'text', e.target.value)} />

                    <label>Email Address</label>
                    <input className="ui-input" value={formData.contact.email} onChange={e => handleChange('contact', 'email', e.target.value)} />

                    <h3 className="sub-heading">Social Links</h3>
                    <label>YouTube URL</label>
                    <input className="ui-input" value={formData.contact.socials?.youtube || ''} onChange={e => handleNestedChange('contact', 'socials', 'youtube', e.target.value)} />

                    <label>Spotify URL</label>
                    <input className="ui-input" value={formData.contact.socials?.spotify || ''} onChange={e => handleNestedChange('contact', 'socials', 'spotify', e.target.value)} />

                    <label>Instagram URL</label>
                    <input className="ui-input" value={formData.contact.socials?.instagram || ''} onChange={e => handleNestedChange('contact', 'socials', 'instagram', e.target.value)} />
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminControls;
