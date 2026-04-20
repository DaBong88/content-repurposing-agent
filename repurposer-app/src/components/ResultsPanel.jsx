import React, { useState } from 'react';
import { Copy, Check, Layers } from 'lucide-react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: false, breaks: true, linkify: true });

const TABS = [
  { id: 'ig-post',     label: 'Instagram Post',     dot: true },
  { id: 'ig-carousel', label: 'Carousel',            dot: true },
  { id: 'x-thread',    label: 'X Thread',            dot: true },
  { id: 'linkedin',    label: 'LinkedIn',            dot: true },
  { id: 'meta-story',  label: 'Meta Story',          dot: true },
  { id: 'blog',        label: 'Blog Article',        dot: true },
];

const FORMAT_LABELS = {
  'ig-post': 'Instagram Post',
  'ig-carousel': 'Instagram Carousel',
  'x-thread': 'X (Twitter) Thread',
  'linkedin': 'LinkedIn Post',
  'meta-story': 'Meta Story',
  'blog': 'Blog Article',
};

export default function ResultsPanel({ results }) {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [copied, setCopied] = useState(false);

  const hasResults = results && Object.keys(results).length > 0;

  const handleCopy = () => {
    if (!hasResults) return;
    const text = typeof results[activeTab] === 'string' ? results[activeTab] : JSON.stringify(results[activeTab], null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="result-panel">
      {/* Tab bar */}
      <div className="result-header">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-dot" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="result-body">
        {!hasResults ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Layers size={18} strokeWidth={1.5} />
            </div>
            <h3>Nothing yet</h3>
            <p>Paste a URL in the sidebar and click "Repurpose Content" to generate your content.</p>
          </div>
        ) : (
          results[activeTab] ? (
            <div className="content-card">
              <div className="content-card-header">
                <span className="content-card-title">{FORMAT_LABELS[activeTab]}</span>
                <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                  {copied ? <><Check size={12} />Copied</> : <><Copy size={12} />Copy</>}
                </button>
              </div>
              <div
                className="content-body"
                dangerouslySetInnerHTML={{ __html: md.render(String(results[activeTab])) }}
              />
            </div>
          ) : (
            <div className="empty-state">
              <p>Content for this format isn't available.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
