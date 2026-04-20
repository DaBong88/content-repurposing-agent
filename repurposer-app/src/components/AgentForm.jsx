import React, { useState } from 'react';
import { Sparkles, Link as LinkIcon, FileText, Image as ImageIcon, X, KeyRound } from 'lucide-react';

export default function AgentForm({ onSubmit, isLoading }) {
  const [url, setUrl] = useState('');
  const [context, setContext] = useState('');
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [refImages, setRefImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ data: reader.result.split(',')[1], mimeType: file.type, name: file.name });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }))).then(base64Files => {
      setRefImages(prev => [...prev, ...base64Files].slice(0, 5));
    });
  };

  const removeImage = (index) => setRefImages(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url || !apiKey) return;
    localStorage.setItem('gemini_api_key', apiKey);
    onSubmit({ url, context, apiKey, refImages });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="config-header">
        <span className="config-title">Configuration</span>
      </div>

      <div className="config-body">

        {/* URL */}
        <div className="field">
          <label htmlFor="source-url" className="field-label">
            <LinkIcon size={12} /> Source URL
          </label>
          <div className="input-wrap">
            <input
              id="source-url"
              type="url"
              className="linear-input"
              placeholder="https://example.com/article"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Context */}
        <div className="field">
          <label htmlFor="context" className="field-label">
            <FileText size={12} /> Context
            <span className="field-label-optional">— optional</span>
          </label>
          <textarea
            id="context"
            className="linear-input"
            placeholder="Target audience, tone, CTA goal…"
            value={context}
            onChange={e => setContext(e.target.value)}
            rows={3}
          />
        </div>

        {/* Reference Images */}
        <div className="field">
          <label className="field-label">
            <ImageIcon size={12} /> Brand Reference Images
            <span className="field-label-optional">— up to 5</span>
          </label>
          <div className="image-upload-area">
            <label className="image-upload-label">
              <ImageIcon size={14} />
              <span>Click to upload images</span>
              <input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={handleImageUpload} />
            </label>
            <p className="image-upload-hint">PNG, JPEG, or WebP · Sets visual brand tone for image descriptions</p>
          </div>
          {refImages.length > 0 && (
            <div className="image-previews">
              {refImages.map((img, i) => (
                <div key={i} className="image-thumb">
                  <img src={`data:${img.mimeType};base64,${img.data}`} alt={img.name} />
                  <button type="button" className="image-thumb-remove" onClick={() => removeImage(i)}>
                    <X size={8} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section-sep" />

        {/* API Key */}
        <div className="field">
          <label htmlFor="api-key" className="field-label">
            <KeyRound size={12} /> Gemini API Key
          </label>
          <div className="input-password-wrapper">
            <input
              id="api-key"
              type="password"
              className="linear-input"
              placeholder="AIzaSy…"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              required
            />
          </div>
        </div>

      </div>

      <div className="config-footer">
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading || !url || !apiKey}
        >
          {isLoading ? (
            <><div className="spinner" /><span>Generating…</span></>
          ) : (
            <><Sparkles size={14} /><span>Repurpose Content</span></>
          )}
        </button>
      </div>
    </form>
  );
}
