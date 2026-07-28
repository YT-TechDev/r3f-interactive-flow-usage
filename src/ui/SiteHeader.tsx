export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__identity">
          <span className="site-header__name">Phase Field</span>
          <span className="site-header__meta">
            Consumer of <code>r3f-interactive-flow@2.11.0</code>
          </span>
        </div>
        <nav className="site-header__links" aria-label="Project links">
          <a href="https://github.com/YT-TechDev/r3f-interactive-flow" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.npmjs.com/package/r3f-interactive-flow" target="_blank" rel="noreferrer">
            npm
          </a>
          <a href="https://github.com/YT-TechDev/r3f-interactive-flow#readme" target="_blank" rel="noreferrer">
            Docs
          </a>
        </nav>
      </div>
    </header>
  );
}
