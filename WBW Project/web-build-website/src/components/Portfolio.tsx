import { portfolioProjects } from '../data/websiteData'

function Portfolio() {
  return (
    <section className="section gray-section" id="portfolio">
      <div className="container">
        <div className="section-title">
          <h2>Our Portfolio</h2>
          <p>Some sample projects created by our team.</p>
        </div>

       <div className="card-grid">
  {portfolioProjects.map((project) => (
    <div className="simple-card" key={project.id}>
      <div className="image-container">
        <img
          src={project.image}
          alt={project.title}
          className="portfolio-image"
        />
      </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <button type="button">View Project</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio