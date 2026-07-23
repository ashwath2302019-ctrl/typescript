import { reviews } from '../data/websiteData'

function Reviews() {
  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-title">
          <h2>Customer Reviews</h2>
          <p>What our customers say about us.</p>
        </div>

        <div className="card-grid">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <p className="stars">★★★★★</p>
              <p>{review.review}</p>
              <h3>{review.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews