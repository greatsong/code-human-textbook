import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface MermaidProps {
  chart: string;
  caption?: string;
}

function ZoomModal({ svgHtml, onClose }: { svgHtml: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <div
      className="zoom-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button className="zoom-close" onClick={onClose} aria-label="닫기">✕</button>
      <div
        className="zoom-content mermaid-zoom-content"
        onClick={(e) => e.stopPropagation()}
        dangerouslySetInnerHTML={{ __html: svgHtml }}
      />
      <span className="zoom-hint">ESC 또는 배경 클릭으로 닫기</span>
    </div>,
    document.body
  );
}

export default function Mermaid({ chart, caption }: MermaidProps) {
  const [svgHtml, setSvgHtml] = useState('');
  const [error, setError] = useState('');
  const [zoomed, setZoomed] = useState(false);
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    let cancelled = false;
    import('mermaid').then(async (m) => {
      if (cancelled) return;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      m.default.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'var(--sl-font)',
      });
      try {
        const { svg } = await m.default.render(idRef.current, chart.trim());
        if (!cancelled) setSvgHtml(svg);
      } catch (e: any) {
        if (!cancelled) setError(e.message || '다이어그램 렌더링 오류');
      }
    });
    return () => { cancelled = true; };
  }, [chart]);

  const openZoom = useCallback(() => setZoomed(true), []);
  const closeZoom = useCallback(() => setZoomed(false), []);

  if (error) {
    return (
      <div className="mermaid-error">
        <p>다이어그램 렌더링 오류</p>
        <pre><code>{chart}</code></pre>
      </div>
    );
  }

  if (!svgHtml) {
    return <div className="mermaid-loading">다이어그램 로딩 중...</div>;
  }

  return (
    <>
      <figure className="mermaid-figure">
        <div
          className="mermaid-container"
          onClick={openZoom}
          dangerouslySetInnerHTML={{ __html: svgHtml }}
          title="클릭하면 크게 볼 수 있습니다"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openZoom()}
        />
        {caption && <figcaption className="mermaid-caption">{caption}</figcaption>}
        <div className="mermaid-zoom-hint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            <path d="M11 8v6M8 11h6"/>
          </svg>
          클릭하여 확대
        </div>
      </figure>
      {zoomed && <ZoomModal svgHtml={svgHtml} onClose={closeZoom} />}
    </>
  );
}
