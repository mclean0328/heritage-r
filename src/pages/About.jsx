export default function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Heritage&#123;R&#125;</h1>
        <p>Fun doesn't need to be unaffordable</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Why R53 Mini Cooper S?</h2>
          <p>
            Produced from 2002 to 2006, the R53 Mini Cooper S was BMW's bold
            reinterpretation of the classic Mini. Powered by a supercharged 1.6L
            Tritec engine producing 163&nbsp;hp, it delivered the legendary go-kart
            handling that made the original Mini famous — with a modern twist.
          </p>
          <p>
            In the world of exotic sports cars, supercars and hypercars, it's easy to
            forget more affordable fun is at your fingertips.  Don't forget, Minis have 
            been drivers' cars from inception in 1959 and that driving heritage is found
            in new Mini generations starting with the R50 and R53.
          </p>
        </section>

        {/*<section className="about-section">
          <h2>What is a Restomod?</h2>
          <p>
            A restomod takes a classic vehicle and upgrades it with modern
            components — better brakes, adjustable suspension, improved intake
            and exhaust, refreshed interiors — while preserving the character
            and soul of the original. It's the best of both worlds: vintage
            charm with contemporary performance and reliability.
          </p>
        </section>*/}

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Heritage R exists to take the original affordable fun to a new level.
            With restomods driving the earth that cost $100k, $200k, $1M, it's time
            to go back to our roots; everyday, FUN, drivers' cars...but better.
          </p>
        </section>

        <div className="about-stats">
          <div className="about-stat">
            <span className="stat-number">2002–2006</span>
            <span className="stat-label">Production Years</span>
          </div>
          <div className="about-stat">
            <span className="stat-number">163 hp</span>
            <span className="stat-label">Supercharged</span>
          </div>
          <div className="about-stat">
            <span className="stat-number">1.6L</span>
            <span className="stat-label">Tritec Engine</span>
          </div>
          <div className="about-stat">
            <span className="stat-number">R53</span>
            <span className="stat-label">Chassis Code</span>
          </div>
        </div>
      </div>
    </div>
  );
}
