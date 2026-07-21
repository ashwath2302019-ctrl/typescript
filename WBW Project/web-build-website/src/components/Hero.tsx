function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <div>
          <h1>We Build Simple Websites</h1>

          <p>
            We create affordable and responsive websites for small businesses,
            students and new companies.
          </p>

          <div className="hero-buttons">
            <a href="#plan" className="primary-button">
              Plan My Website
            </a>

            <a href="#templates" className="secondary-button">
              View Templates
            </a>
          </div>
        </div>

        <div className="hero-box">
          <h3>Your Website</h3>
          <p>Home</p>
          <p>About</p>
          <p>Services</p>
          <p>Contact</p>
        </div>
      </div>
    </section>
  )
}

export default Hero