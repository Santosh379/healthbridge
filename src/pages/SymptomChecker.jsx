import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { symptomsList, symptomCategories, analyzeSymptoms } from '../data/symptoms';
import { Stethoscope, AlertCircle, CheckCircle, AlertTriangle, Activity, ArrowRight, RotateCcw, Mic, MicOff, Search, ChevronDown, Home, Heart, Shield, X } from 'lucide-react';
import './SymptomChecker.css';

export default function SymptomChecker() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [detailedMode, setDetailedMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const recognitionRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSymptom = (name) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
    setResult(null);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const analysis = analyzeSymptoms(selected);
      setResult(analysis);
      setAnalyzing(false);
    }, 1800);
  };

  const handleReset = () => { setSelected([]); setResult(null); };

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input not supported. Please use Chrome or Edge.');
      return;
    }
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; recognition.continuous = false; recognition.interimResults = false;
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase();
      symptomsList.forEach(sym => {
        if (transcript.includes(sym.name.toLowerCase()) && !selected.includes(sym.name)) {
          setSelected(prev => [...prev, sym.name]);
        }
      });
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const filteredSymptoms = symptomsList.filter(s => {
    const matchCategory = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const notSelected = !selected.includes(s.name);
    return matchCategory && matchSearch && notSelected;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return 'var(--success-500)';
      case 'Medium': return 'var(--warning-500)';
      case 'High': return 'var(--danger-500)';
      case 'Critical': return '#dc2626';
      default: return 'var(--primary-500)';
    }
  };

  return (
    <div className="symptom-checker animate-fade-in">
      <div className="page-header">
        <h1>{t('symptomChecker')}</h1>
        <p>Select your symptoms for AI-powered health analysis — or use voice input</p>
      </div>

      <div className="checker-layout">
        <div className="checker-main">
          {/* Searchable Dropdown */}
          <div className="symptom-dropdown-card glass-card">
            <div className="sd-header">
              <h2><Stethoscope size={20} /> Select Your Symptoms</h2>
              <div className="sd-header-actions">
                <div className="mode-toggle">
                  <button className={`mode-btn ${!detailedMode ? 'active' : ''}`} onClick={() => setDetailedMode(false)}>Quick</button>
                  <button className={`mode-btn ${detailedMode ? 'active' : ''}`} onClick={() => setDetailedMode(true)}>Detailed</button>
                </div>
                <button className={`voice-btn-lg ${isListening ? 'listening' : ''}`} onClick={startVoice}>
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  <span>{isListening ? 'Listening...' : 'Voice'}</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="category-tabs">
              <button className={`cat-tab ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>
                All ({symptomsList.length})
              </button>
              {symptomCategories.map(cat => (
                <button key={cat.id} className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => setActiveCategory(cat.id)} style={{ '--cat-color': cat.color }}>
                  <span className="cat-icon">{cat.icon}</span> {cat.name}
                </button>
              ))}
            </div>

            {/* Dropdown Search */}
            <div className="symptom-dropdown-area" ref={dropdownRef}>
              <div className="sd-search-box" onClick={() => { setDropdownOpen(true); searchRef.current?.focus(); }}>
                <Search size={18} className="sd-search-icon" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={`Search ${activeCategory === 'all' ? '80+' : ''} symptoms... (e.g., Headache, Fever, Cough)`}
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setDropdownOpen(true); }}
                  onFocus={() => setDropdownOpen(true)}
                  className="sd-search-input"
                />
                <ChevronDown size={18} className={`sd-chevron ${dropdownOpen ? 'open' : ''}`} />
              </div>

              {dropdownOpen && (
                <div className="sd-dropdown-list">
                  {filteredSymptoms.length > 0 ? (
                    filteredSymptoms.map(symptom => (
                      <button
                        key={symptom.id}
                        className="sd-dropdown-item"
                        onClick={() => { toggleSymptom(symptom.name); setSearchQuery(''); }}
                      >
                        <span className="sd-item-icon">{symptom.icon}</span>
                        <span className="sd-item-name">{symptom.name}</span>
                        <span className="sd-item-cat">{symptomCategories.find(c => c.id === symptom.category)?.name}</span>
                      </button>
                    ))
                  ) : (
                    <div className="sd-empty">
                      <Search size={20} />
                      <span>No symptoms found matching "{searchQuery}"</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Symptoms Chips */}
            {selected.length > 0 && (
              <div className="selected-area">
                <div className="selected-header">
                  <span>🩺 {selected.length} symptom{selected.length > 1 ? 's' : ''} selected</span>
                  <button className="btn btn-secondary btn-sm" onClick={handleReset}><RotateCcw size={14} /> Clear All</button>
                </div>
                <div className="selected-tags">
                  {selected.map(s => {
                    const sym = symptomsList.find(x => x.name === s);
                    return (
                      <span key={s} className="sel-tag" onClick={() => toggleSymptom(s)}>
                        {sym?.icon} {s} <X size={12} />
                      </span>
                    );
                  })}
                </div>
                <button className="btn btn-primary btn-lg analyze-btn-v2" onClick={handleAnalyze} disabled={analyzing}>
                  {analyzing ? <><Activity size={18} className="spin-anim" /> Analyzing...</> : <><Stethoscope size={18} /> Analyze {selected.length} Symptom{selected.length > 1 ? 's' : ''}</>}
                </button>
              </div>
            )}

            {selected.length === 0 && (
              <div className="sd-hint">
                <p>💡 <strong>Tip:</strong> Start typing a symptom name above, or use <strong>voice input</strong> to describe your symptoms. Select multiple symptoms for more accurate analysis.</p>
              </div>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="checker-result">
          {result ? (
            <div className="result-card-v2 glass-card">
              {/* Primary Diagnosis */}
              <div className="result-primary" style={{ '--sev-color': getSeverityColor(result.primary.severity) }}>
                <div className="result-sev-badge" style={{ background: getSeverityColor(result.primary.severity) }}>
                  {result.primary.severity === 'Critical' || result.primary.severity === 'High' ? <AlertTriangle size={18} /> : result.primary.severity === 'Medium' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                  {result.primary.severity}
                </div>
                <h2>{result.primary.condition}</h2>
                {result.primary.matchPercentage > 0 && <span className="match-pct">{result.primary.matchPercentage}% Match</span>}
                <p className="result-desc">{result.primary.description}</p>

                <div className="result-meta-grid">
                  <div className="result-meta-item">
                    <Stethoscope size={16} />
                    <div><span className="rmi-label">Specialist</span><span className="rmi-value">{result.primary.specialist}</span></div>
                  </div>
                  <div className="result-meta-item">
                    <Activity size={16} />
                    <div><span className="rmi-label">Urgency</span><span className="rmi-value">{result.primary.urgency}</span></div>
                  </div>
                </div>

                <div className="result-recommendation">
                  <Shield size={16} /> <strong>Recommendation:</strong> {result.primary.recommendation}
                </div>

                {/* Home Remedies */}
                {detailedMode && result.primary.homeRemedies && (
                  <div className="result-section">
                    <h3><Home size={16} /> Home Remedies</h3>
                    <ul className="remedies-list">
                      {result.primary.homeRemedies.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}

                {detailedMode && result.primary.whenToSeeDoctor && (
                  <div className="result-section when-to-see">
                    <h3><AlertCircle size={16} /> When to See a Doctor</h3>
                    <p>{result.primary.whenToSeeDoctor}</p>
                  </div>
                )}

                {/* Matched Symptoms */}
                {result.primary.matchedSymptoms && (
                  <div className="matched-symptoms">
                    <span className="matched-label">Matched:</span>
                    {result.primary.matchedSymptoms.map((s, i) => <span key={i} className="matched-tag">{s}</span>)}
                  </div>
                )}
              </div>

              {/* Alternative Diagnoses */}
              {result.alternatives?.length > 0 && (
                <div className="result-alternatives">
                  <h3>Other Possible Conditions</h3>
                  {result.alternatives.map((alt, i) => (
                    <div key={i} className="alt-item">
                      <div className="alt-info">
                        <span className="alt-name">{alt.condition}</span>
                        <span className="alt-match">{alt.matchPercentage}% match</span>
                      </div>
                      <span className={`badge ${alt.severity === 'Low' ? 'badge-success' : alt.severity === 'Medium' ? 'badge-warning' : 'badge-danger'}`}>{alt.severity}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="result-actions-v2">
                {(result.primary.severity === 'Critical' || result.primary.severity === 'High') && (
                  <Link to="/emergency" className="btn btn-danger"><AlertTriangle size={16} /> Emergency Help</Link>
                )}
                <Link to="/doctors" className="btn btn-primary">Find {result.primary.specialist} <ArrowRight size={16} /></Link>
              </div>
            </div>
          ) : (
            <div className="result-placeholder-v2 glass-card">
              <div className="rp-icon"><Activity size={48} /></div>
              <h3>AI Symptom Analysis</h3>
              <p>Select symptoms from the dropdown above or use <strong>voice input</strong> to describe them. Our AI analyzes 80+ symptoms across 20+ conditions.</p>
              <div className="rp-features">
                <span><CheckCircle size={14} /> Multi-symptom scoring</span>
                <span><Heart size={14} /> Home remedies</span>
                <span><Shield size={14} /> Urgency assessment</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
