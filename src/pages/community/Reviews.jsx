import React, { useState } from 'react';
import './Reviews.css';

/**
 * Predefined Community Reviews
 */
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Ananya Sharma",
    avatarBg: "blue",
    petName: "Luna",
    category: "Adoption",
    rating: 5,
    date: "Aug 28, 2026",
    text: "Adopting Luna was one of the best decisions we've ever made. PawConnect made it so easy to discover her and connect directly with the shelter staff.",
    location: "Delhi NCR",
    badge: "Verified Adoption",
    isUserCreated: false
  },
  {
    id: 2,
    name: "Rohan & Priyesha",
    avatarBg: "lavender",
    petName: "Milo",
    category: "Foster",
    rating: 5,
    date: "Aug 20, 2026",
    text: "Fostering Milo gave us so much joy! The PawConnect community supported us with health checklists and food tips every step of the way.",
    location: "Mumbai",
    badge: "Foster Parent",
    isUserCreated: false
  },
  {
    id: 3,
    name: "Kavita Reddy",
    avatarBg: "pink",
    petName: "Oliver",
    category: "Rescue",
    rating: 5,
    date: "Aug 12, 2026",
    text: "When we reported an injured stray kitten in our locality, the team matched us with a rescue volunteer within 20 minutes. Truly life-saving service!",
    location: "Bangalore",
    badge: "Rescue Hero",
    isUserCreated: false
  },
  {
    id: 4,
    name: "Vikram Sethi",
    avatarBg: "blue",
    petName: "Bruno",
    category: "Shelter",
    rating: 5,
    date: "Jul 31, 2026",
    text: "The transparent shelter details and verified medical records made us feel completely confident adopting our Golden Retriever Bruno.",
    location: "Chandigarh",
    badge: "Verified Adoption",
    isUserCreated: false
  },
  {
    id: 5,
    name: "Meera Nair",
    avatarBg: "lavender",
    petName: "Cleo",
    category: "Adoption",
    rating: 5,
    date: "Jul 22, 2026",
    text: "Smooth application process, friendly shelter coordinators, and honest pet descriptions. Cleo settled into our home on day one!",
    location: "Pune",
    badge: "Happy Parent",
    isUserCreated: false
  },
  {
    id: 6,
    name: "Aman Verma",
    avatarBg: "pink",
    petName: "Rocky",
    category: "Rescue",
    rating: 4,
    date: "Jul 15, 2026",
    text: "Wonderful platform for animal lovers. Easy search filters by location and breed helped us find Rocky quickly.",
    location: "Kolkata",
    badge: "Community Member",
    isUserCreated: false
  }
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Reviews', icon: '🌟' },
  { id: 'Adoption', label: 'Adoption', icon: '🏡' },
  { id: 'Shelter', label: 'Shelter', icon: '🐾' },
  { id: 'Rescue', label: 'Rescue', icon: '🩹' },
  { id: 'Foster', label: 'Foster', icon: '🍼' },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formPetName, setFormPetName] = useState('');
  const [formCategory, setFormCategory] = useState('Adoption');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const [formError, setFormError] = useState('');

  // Filtering
  const filteredReviews = activeFilter === 'all'
    ? reviews
    : reviews.filter(r => r.category === activeFilter);

  // Submit Review Form
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!formText.trim()) {
      setFormError('Please write your review thoughts.');
      return;
    }
    if (!formRating || formRating < 1 || formRating > 5) {
      setFormError('Please select a star rating between 1 and 5.');
      return;
    }

    const newReview = {
      id: Date.now(),
      name: formName.trim(),
      avatarBg: ['blue', 'lavender', 'pink'][Math.floor(Math.random() * 3)],
      petName: formPetName.trim() || undefined,
      category: formCategory,
      rating: Number(formRating),
      date: 'Just now',
      text: formText.trim(),
      location: 'Local Community',
      badge: 'Community Voice',
      isUserCreated: true
    };

    setReviews([newReview, ...reviews]);
    setFormName('');
    setFormPetName('');
    setFormCategory('Adoption');
    setFormRating(5);
    setFormText('');
    setIsWriteModalOpen(false);
  };

  // Confirm Delete
  const confirmDelete = () => {
    if (!deletingReviewId) return;
    setReviews(prev => prev.filter(r => r.id !== deletingReviewId));
    setDeletingReviewId(null);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`paw-star ${index < count ? 'paw-star--filled' : 'paw-star--empty'}`}
        aria-hidden="true"
      >
        ★
      </span>
    ));
  };

  return (
    <div className="paw-reviews-page">
      <div className="paw-reviews-container">

        {/* Header Section */}
        <header className="paw-reviews-header">
          <div className="paw-reviews-stamp" aria-hidden="true">
            <span>COMMUNITY RECOMMENDATIONS</span>
          </div>

          <h1 className="paw-reviews-title">
            Community Voices
            <span className="paw-title-heart" aria-hidden="true">❤️</span>
          </h1>

          <p className="paw-reviews-subtitle">
            Hear from people who found their perfect companions through PawConnect.
          </p>

          {/* Overall Rating Summary Card */}
          <div className="paw-rating-summary-card">
            <div className="paw-summary-score">
              <span className="paw-score-num">4.9</span>
              <span className="paw-score-max">/ 5</span>
            </div>
            <div className="paw-summary-details">
              <div className="paw-summary-stars" aria-label="Rating: 4.9 out of 5 stars">
                {renderStars(5)}
              </div>
              <span className="paw-summary-meta">
                Based on community reviews • <strong>98% Recommended</strong>
              </span>
            </div>
          </div>
        </header>

        {/* Category Filters */}
        <div className="paw-reviews-filters" role="tablist" aria-label="Review categories">
          {CATEGORY_FILTERS.map(tab => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`paw-review-tab ${isActive ? 'paw-review-tab--active' : ''}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                <span className="paw-tab-icon" aria-hidden="true">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <main className="paw-reviews-grid">
          {filteredReviews.length === 0 ? (
            <div className="paw-reviews-empty">
              <span className="paw-empty-icon">💬</span>
              <h3>No reviews in this category yet</h3>
              <p>Be the first to share your experience in {activeFilter}!</p>
              <button
                type="button"
                className="paw-btn-primary"
                onClick={() => setIsWriteModalOpen(true)}
              >
                Write a Review
              </button>
            </div>
          ) : (
            filteredReviews.map(item => (
              <article key={item.id} className="paw-review-card">
                {/* Scrapbook Paw Decor Accent */}
                <div className="paw-card-paw-accent" aria-hidden="true">🐾</div>

                {/* Delete Button for User Created Reviews */}
                {item.isUserCreated && (
                  <button
                    type="button"
                    className="paw-review-delete-btn"
                    onClick={() => setDeletingReviewId(item.id)}
                    aria-label={`Delete review by ${item.name}`}
                    title="Delete review"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    <span>Delete</span>
                  </button>
                )}

                {/* Header Meta: Avatar & Rating */}
                <div className="paw-review-card-header">
                  <div className="paw-review-author">
                    <div className={`paw-author-avatar paw-avatar--${item.avatarBg || 'blue'}`}>
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="paw-author-info">
                      <h3 className="paw-author-name">{item.name}</h3>
                      <span className="paw-review-date">{item.date} • {item.location}</span>
                    </div>
                  </div>

                  <span className="paw-review-badge">{item.badge}</span>
                </div>

                {/* Star Rating & Pet Tag */}
                <div className="paw-review-rating-row">
                  <div className="paw-card-stars" aria-label={`Rated ${item.rating} out of 5 stars`}>
                    {renderStars(item.rating)}
                  </div>
                  {item.petName && (
                    <span className="paw-pet-tag">
                      🐾 {item.category === 'Adoption' ? 'Adopted' : 'Featured'} {item.petName}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="paw-review-text">"{item.text}"</p>

                {/* Card Footer Tagline */}
                <div className="paw-review-card-footer">
                  <span className="paw-category-tag">{item.category} Story</span>
                  <span className="paw-verified-check">✓ Verified Community Member</span>
                </div>
              </article>
            ))
          )}
        </main>

        {/* CTA Section */}
        <section className="paw-reviews-cta">
          <div className="paw-cta-paper">
            <div className="paw-cta-pin" aria-hidden="true">📌</div>
            <h2 className="paw-cta-title">Share your experience</h2>
            <p className="paw-cta-text">
              Tell the community about your PawConnect journey and help others discover their future best friend.
            </p>
            <button
              type="button"
              className="paw-btn-primary paw-cta-btn"
              onClick={() => setIsWriteModalOpen(true)}
            >
              <span>Write a Review</span>
              <span className="paw-btn-heart" aria-hidden="true">✨</span>
            </button>
          </div>
        </section>

      </div>

      {/* Write Review Modal Form */}
      {isWriteModalOpen && (
        <div className="paw-modal-backdrop" onClick={() => setIsWriteModalOpen(false)} role="dialog" aria-modal="true">
          <div className="paw-modal-card paw-review-modal" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="paw-modal-close"
              onClick={() => setIsWriteModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="paw-modal-form-header">
              <h2>Write a Community Review ✍️</h2>
              <p>Share your adoption, shelter, or rescue journey with PawConnect.</p>
            </div>

            {formError && (
              <div className="paw-form-error-alert" role="alert">
                <span>⚠️ {formError}</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="paw-review-form">
              <div className="paw-form-group">
                <label htmlFor="revName">Your Name <span className="paw-required">*</span></label>
                <input
                  id="revName"
                  type="text"
                  placeholder="e.g. Ananya S."
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  required
                />
              </div>

              <div className="paw-form-row">
                <div className="paw-form-group">
                  <label htmlFor="revPet">Pet Name (Optional)</label>
                  <input
                    id="revPet"
                    type="text"
                    placeholder="e.g. Luna"
                    value={formPetName}
                    onChange={e => setFormPetName(e.target.value)}
                  />
                </div>

                <div className="paw-form-group">
                  <label htmlFor="revCategory">Category</label>
                  <select
                    id="revCategory"
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                  >
                    <option value="Adoption">Adoption</option>
                    <option value="Shelter">Shelter</option>
                    <option value="Rescue">Rescue</option>
                    <option value="Foster">Foster</option>
                  </select>
                </div>
              </div>

              {/* Interactive Star Picker */}
              <div className="paw-form-group">
                <label>Rating <span className="paw-required">*</span></label>
                <div className="paw-star-picker" role="radiogroup" aria-label="Select star rating">
                  {[1, 2, 3, 4, 5].map(starNum => (
                    <button
                      key={starNum}
                      type="button"
                      className={`paw-star-picker-btn ${formRating >= starNum ? 'paw-star-picker-btn--active' : ''}`}
                      onClick={() => setFormRating(starNum)}
                      aria-label={`${starNum} Star${starNum > 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="paw-rating-label">({formRating} out of 5 stars)</span>
                </div>
              </div>

              <div className="paw-form-group">
                <label htmlFor="revText">Your Review <span className="paw-required">*</span></label>
                <textarea
                  id="revText"
                  rows="4"
                  placeholder="Tell us what made your experience with PawConnect special..."
                  value={formText}
                  onChange={e => setFormText(e.target.value)}
                  required
                />
              </div>

              <div className="paw-form-actions">
                <button
                  type="button"
                  className="paw-btn-secondary"
                  onClick={() => setIsWriteModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="paw-btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingReviewId !== null && (
        <div className="paw-modal-backdrop" onClick={() => setDeletingReviewId(null)} role="dialog" aria-modal="true">
          <div className="paw-modal-card paw-delete-modal" onClick={e => e.stopPropagation()}>
            <div className="paw-delete-header">
              <span className="paw-delete-icon" aria-hidden="true">🗑️</span>
              <h2>Delete this review?</h2>
              <p>Are you sure you want to remove your review? This action cannot be undone.</p>
            </div>

            <div className="paw-form-actions">
              <button
                type="button"
                className="paw-btn-secondary"
                onClick={() => setDeletingReviewId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="paw-btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
