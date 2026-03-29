import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { medicineDatabase, checkInteractions } from '../data/medicines';
import { Pill, AlertTriangle, AlertCircle, CheckCircle, Plus, X, Search, Shield } from 'lucide-react';
import './MedicineChecker.css';

export default function MedicineChecker() {
  const { t } = useLanguage();
  const [medicines, setMedicines] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState(null);

  const handleInput = (val) => {
    setInput(val);
    if (val.length >= 2) {
      const matches = medicineDatabase.filter(m =>
        m.name.toLowerCase().includes(val.toLowerCase()) ||
        m.aliases.some(a => a.toLowerCase().includes(val.toLowerCase()))
      );
      setSuggestions(matches.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  const addMedicine = (med) => {
    if (!medicines.includes(med.name)) {
      setMedicines([...medicines, med.name]);
    }
    setInput('');
    setSuggestions([]);
    setResults(null);
  };

  const removeMedicine = (name) => {
    setMedicines(medicines.filter(m => m !== name));
    setResults(null);
  };

  const handleCheck = () => {
    const interactions = checkInteractions(medicines);
    setResults(interactions);
  };

  const getSeverityInfo = (sev) => {
    switch (sev) {
      case 'high': return { icon: <AlertTriangle size={20} />, label: 'DANGEROUS', color: '#dc2626', bg: 'rgba(239,68,68,0.1)' };
      case 'medium': return { icon: <AlertCircle size={20} />, label: 'CAUTION', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' };
      default: return { icon: <CheckCircle size={20} />, label: 'MONITOR', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' };
    }
  };

  return (
    <div className="medicine-checker animate-fade-in">
      <div className="page-header">
        <h1><Pill size={28} /> Medicine Interaction Checker</h1>
        <p>Enter your medications to check for dangerous drug interactions — this could save your life.</p>
      </div>

      <div className="mc-layout">
        <div className="mc-input-panel glass-card">
          <h2>Your Medications</h2>
          <p className="mc-hint">Type a medicine name below. We support 36+ common drugs and their brand names.</p>

          <div className="mc-search-area">
            <div className="mc-search-box">
              <Search size={18} className="mc-search-icon" />
              <input type="text" value={input} onChange={e => handleInput(e.target.value)} placeholder="Search medicine (e.g., Paracetamol, Aspirin, Warfarin)..." className="mc-search-input" />
            </div>
            {suggestions.length > 0 && (
              <div className="mc-suggestions">
                {suggestions.map((s, i) => (
                  <button key={i} className="mc-suggestion-item" onClick={() => addMedicine(s)}>
                    <Pill size={14} />
                    <div>
                      <span className="mc-sug-name">{s.name}</span>
                      <span className="mc-sug-cat">{s.category}</span>
                    </div>
                    <Plus size={14} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {medicines.length > 0 && (
            <div className="mc-medicine-list">
              {medicines.map((m, i) => {
                const info = medicineDatabase.find(d => d.name === m);
                return (
                  <div key={i} className="mc-med-chip">
                    <Pill size={14} />
                    <div>
                      <span className="mc-med-name">{m}</span>
                      {info && <span className="mc-med-cat">{info.category}</span>}
                    </div>
                    <button className="mc-remove" onClick={() => removeMedicine(m)}><X size={14} /></button>
                  </div>
                );
              })}
            </div>
          )}

          <button className="btn btn-primary btn-lg mc-check-btn" onClick={handleCheck} disabled={medicines.length < 2}>
            <Shield size={18} /> Check Interactions ({medicines.length} medicines)
          </button>

          {medicines.length < 2 && medicines.length > 0 && (
            <p className="mc-min-hint">Add at least 2 medicines to check interactions</p>
          )}
        </div>

        <div className="mc-results-panel">
          {results !== null ? (
            results.length > 0 ? (
              <div className="mc-results">
                <div className="mc-results-header">
                  <AlertTriangle size={22} />
                  <h2>{results.length} Interaction{results.length > 1 ? 's' : ''} Found</h2>
                </div>
                {results.map((r, i) => {
                  const info = getSeverityInfo(r.severity);
                  return (
                    <div key={i} className="mc-interaction-card glass-card" style={{ '--int-color': info.color, '--int-bg': info.bg }}>
                      <div className="mc-int-header">
                        <div className="mc-int-icon" style={{ color: info.color }}>{info.icon}</div>
                        <div>
                          <span className="mc-int-severity" style={{ color: info.color }}>{info.label}</span>
                          <h3>{r.pair[0]} + {r.pair[1]}</h3>
                        </div>
                      </div>
                      <p className="mc-int-warning">{r.warning}</p>
                      <div className="mc-int-advice">
                        <Shield size={14} />
                        <span>{r.advice}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mc-safe glass-card">
                <CheckCircle size={56} />
                <h2>No Interactions Found ✅</h2>
                <p>Your medications appear to be safe to take together. However, always consult your doctor or pharmacist for personalized advice.</p>
              </div>
            )
          ) : (
            <div className="mc-placeholder glass-card">
              <Pill size={48} />
              <h3>Drug Interaction Safety</h3>
              <p>1 in 5 hospital admissions are due to drug interactions. Enter your medications to check for dangerous combinations.</p>
              <div className="mc-placeholder-stats">
                <div><strong>36+</strong><span>Drugs</span></div>
                <div><strong>18</strong><span>Interactions</span></div>
                <div><strong>3</strong><span>Risk Levels</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
