import { useState, useEffect, useRef } from 'react';

/* Preload an image, resolves when fully decoded */
function preload(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = resolve; // don't block animation on failure
  });
}

export default function Home() {
  const [showIntro] = useState(() => {
    return !sessionStorage.getItem('heritage-intro-seen');
  });
  const [introPhase, setIntroPhase] = useState(0);
  const [introComplete, setIntroComplete] = useState(!showIntro);
  const timersRef = useRef([]);

  useEffect(() => {
    if (!showIntro) return;

    // Preload both images before starting the animation
    Promise.all([
      preload('/crest-watermark.png'),
      preload('/mini-silhouette.svg'),
    ]).then(() => {
      // Force a frame so the browser paints phase-0 first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          timersRef.current = [
            setTimeout(() => setIntroPhase(1), 300),     // 0.3s — crest appears
            setTimeout(() => setIntroPhase(2), 2000),    // 2.0s — car slides in, crest stays
            setTimeout(() => setIntroPhase(3), 3700),    // 3.7s — crest fades, car stays
            setTimeout(() => setIntroPhase(4), 5200),    // 5.2s — overlay fades out
            setTimeout(() => {
              setIntroPhase(5);
              setIntroComplete(true);
              sessionStorage.setItem('heritage-intro-seen', '1');
            }, 6000),                                     // 6.0s — cleanup
          ];
        });
      });
    });

    return () => timersRef.current.forEach(clearTimeout);
  }, [showIntro]);

  return (
    <>
      {/* Overlay is a sibling so parent opacity:0 does not hide it */}
      {!introComplete && (
        <div className={`intro-overlay intro-phase-${introPhase}`}>
          <img
            src="/crest-watermark.png"
            alt=""
            className="intro-crest"
            aria-hidden="true"
          />
          <img
            src="/mini-silhouette.svg"
            alt=""
            className="intro-car"
            aria-hidden="true"
          />
        </div>
      )}

      <div className={`home-centered ${showIntro && introPhase < 4 ? 'home-intro-hidden' : ''}`}>
        <h1 className="home-brand">Heritage&#123;R&#125;</h1>
      </div>
    </>
  );
}
