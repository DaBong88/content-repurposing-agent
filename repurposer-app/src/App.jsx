import React, { useState } from 'react';
import AgentForm from './components/AgentForm';
import ResultsPanel from './components/ResultsPanel';
import { extractTextFromUrl, generateContentFormats } from './lib/gemini';
import { AlertCircle } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleRepurpose = async ({ url, context, refImages }) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const sourceText = await extractTextFromUrl(url);
      const formatsData = await generateContentFormats(sourceText, context, refImages);
      setResults(formatsData);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-shell">
      {/* Nav */}
      <nav className="app-nav">
        <div className="nav-logo">
          <div className="nav-logo-icon">V</div>
          VoiceWriter
        </div>
        <div className="nav-divider" />
        <span className="nav-breadcrumb">Content Repurposing</span>
        <div className="nav-spacer" />
        <span className="nav-badge">Gemini 2.5 Flash</span>
      </nav>

      {/* Body */}
      <div className="app-main">
        {/* Left: Config */}
        <aside className="config-panel">
          <AgentForm onSubmit={handleRepurpose} isLoading={isLoading} />
          {error && (
            <div style={{ padding: '0 20px 16px' }}>
              <div className="error-banner">
                <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>{error}</span>
              </div>
            </div>
          )}
        </aside>

        {/* Right: Results */}
        <main>
          <ResultsPanel results={results} />
        </main>
      </div>
    </div>
  );
}

export default App;
