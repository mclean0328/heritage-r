import { useState, useEffect } from 'react';

export default function Home() {
  const [showIntro] = useState(() => {
    return !sessionStorage.getItem('heritage-intro-seen');
  });
  const [introPhase, setIntroPhase] = useState(0);
  const [introComplete, setIntroComplete] = useState(!showIntro);

  useEffect(() => {
    if (!showIntro) return;

    const timers = [
      setTimeout(() => setIntroPhase(1), 800),
      setTimeout(() => setIntroPhase(2), 1800),
      setTimeout(() => setIntroPhase(3), 2800),
      setTimeout(() => {
        setIntroPhase(4);
        setIntroComplete(true);
        sessionStorage.setItem('heritage-intro-seen', '1');
      }, 3600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [showIntro]);

  return (
    <div className="home-centered">
      <h1 className="home-brand">Heritage&#123;R&#125;</h1>

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
    </div>
  );
}
