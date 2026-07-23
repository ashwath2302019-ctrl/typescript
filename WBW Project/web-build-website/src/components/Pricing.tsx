import { pricingPlans } from '../data/websiteData'

function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-title">
          <h2>Pricing Plans</h2>
          <p>Select a package based on your requirement.</p>
        </div>

        <div className="card-grid">
          {pricingPlans.map((plan) => (
            <div className="price-card" key={plan.id}>
              <h3>{plan.name}</h3>
              <h2>{plan.price}</h2>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <a href="#plan" className="primary-button">
                Choose Plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing