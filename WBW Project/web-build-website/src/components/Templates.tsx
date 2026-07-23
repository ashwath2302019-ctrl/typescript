import { templates } from '../data/websiteData'

function Templates() {
  return (
    <section className="section gray-section" id="templates">
      <div className="container">
        <div className="section-title">
          <h2>Website Templates</h2>
          <p>Choose a simple website style for your business.</p>
        </div>

        <div className="card-grid">
          {templates.map((template) => (
            <div className="simple-card" key={template.id}>
              <div className="template-image">
                <img src={template.image} alt={template.title} className="template-image"/>
              </div>

              <h3>{template.title}</h3>
              <p>{template.description}</p>

              <a href="#plan">Select Template</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Templates