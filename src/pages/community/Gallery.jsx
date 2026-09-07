import React, { useState } from 'react';
import heroImg from '../../assets/hero.png';
import './Gallery.css';

/**
 * PawConnect Community Memories Data
 */
const INITIAL_MEMORIES = [
  {
    id: 1,
    petName: "Milo & Mocha",
    story: "From shivering under a porch to curled up on our cozy velvet couch. Mocha taught Milo how to trust again!",
    author: "Elena R.",
    date: "Sep 4, 2026",
    category: "Adoption Stories",
    rotation: "-2deg",
    tapeStyle: "tape-top-left",
    sticker: "🐾",
    image: heroImg,
    location: "Seattle, WA",
    likes: 42,
    isUserCreated: false
  },
  {
    id: 2,
    petName: "Barnaby's First Beach Day",
    story: "Barnaby was terrified of water until he saw the ocean waves. Now we can't keep him away from the shoreline!",
    author: "Marcus T.",
    date: "Aug 29, 2026",
    category: "Happy Tails",
    rotation: "1.5deg",
    tapeStyle: "tape-top-right",
    sticker: "❤️",
    image: heroImg,
    location: "San Diego, CA",
    likes: 58,
    isUserCreated: false
  },
  {
    id: 3,
    petName: "Oliver's Recovery Journey",
    story: "Rescued with a hurt paw from a busy roadside. 6 weeks of love later, Oliver zooms faster than all of us!",
    author: "Dr. Sarah Lin",
    date: "Aug 15, 2026",
    category: "Rescue",
    rotation: "-1deg",
    tapeStyle: "tape-center",
    sticker: "✨",
    image: heroImg,
    location: "Austin, TX",
    likes: 89,
    isUserCreated: false
  },
  {
    id: 4,
    petName: "Willow's Golden Years",
    story: "At 11 years old, Willow found her dream home. Senior pets give the sweetest, gentlest hugs.",
    author: "The Parker Family",
    date: "Aug 02, 2026",
    category: "Foster",
    rotation: "2deg",
    tapeStyle: "tape-top-left",
    sticker: "🌟",
    image: heroImg,
    location: "Denver, CO",
    likes: 64,
    isUserCreated: false
  },
  {
    id: 5,
    petName: "Community Shelter Park Day",
    story: "Over 35 PawConnect neighbors renovated the rescue play yard and socialized 14 foster pups in one sunny afternoon!",
    author: "PawConnect Volunteers",
    date: "Jul 24, 2026",
    category: "Community",
    rotation: "-1.5deg",
    tapeStyle: "tape-top-right",
    sticker: "🏡",
    image: heroImg,
    location: "Portland, OR",
    likes: 112,
    isUserCreated: false
  },
  {
    id: 6,
    petName: "Felix & Cleo's Bonded Pair",
    story: "We came to foster one kitten, but they wouldn't stop holding paws. We adopted both on the spot!",
    author: "Samantha & Dave",
    date: "Jul 18, 2026",
    category: "Happy Tails",
    rotation: "1deg",
    tapeStyle: "tape-center",
    sticker: "💖",
    image: heroImg,
    location: "Chicago, IL",
    likes: 77,
    isUserCreated: false
  }
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Memories', icon: '📖' },
  { id: 'Happy Tails', label: 'Happy Tails', icon: '🐶' },
  { id: 'Adoption Stories', label: 'Adoption Stories', icon: '🏡' },
  { id: 'Rescue', label: 'Rescue', icon: '🩹' },
  { id: 'Foster', label: 'Foster', icon: '🍼' },
  { id: 'Community', label: 'Community', icon: '🤝' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [deletingMemoryId, setDeletingMemoryId] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [memories, setMemories] = useState(INITIAL_MEMORIES);
  const [likedMemories, setLikedMemories] = useState({});

  // New Story Form State
  const [newPetName, setNewPetName] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('Happy Tails');

  const filteredMemories = activeFilter === 'all'
    ? memories
    : memories.filter(m => m.category === activeFilter);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedMemories(prev => {
      const isLiked = prev[id];
      const updated = { ...prev, [id]: !isLiked };

      setMemories(current =>
        current.map(m => (m.id === id ? { ...m, likes: m.likes + (isLiked ? -1 : 1) } : m))
      );

      return updated;
    });
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setDeletingMemoryId(id);
  };

  const confirmDelete = () => {
    if (!deletingMemoryId) return;
    setMemories(prev => prev.filter(m => m.id !== deletingMemoryId));
    if (selectedMemory && selectedMemory.id === deletingMemoryId) {
      setSelectedMemory(null);
    }
    setDeletingMemoryId(null);
  };

  const handleShareSubmit = (e) => {
    e.preventDefault();
    if (!newPetName.trim() || !newStory.trim()) return;

    const newMemoryObj = {
      id: Date.now(),
      petName: newPetName,
      story: newStory,
      author: newAuthor.trim() || 'PawConnect Member',
      date: 'Just now',
      category: newCategory,
      rotation: `${(Math.random() * 4 - 2).toFixed(1)}deg`,
      tapeStyle: ['tape-top-left', 'tape-top-right', 'tape-center'][Math.floor(Math.random() * 3)],
      sticker: ['🐾', '❤️', '✨', '🌟'][Math.floor(Math.random() * 4)],
      image: heroImg,
      location: 'Local Community',
      likes: 1,
      isUserCreated: true
    };

    setMemories([newMemoryObj, ...memories]);
    setNewPetName('');
    setNewStory('');
    setNewAuthor('');
    setIsShareModalOpen(false);
  };

  return (
    <div className="paw-scrapbook-page">
      <div className="paw-scrapbook-container">

        {/* Page Header */}
        <header className="paw-scrapbook-header">
          <div className="paw-header-stamp" aria-hidden="true">
            <span>MEMORIES ALBUM</span>
          </div>

          <h1 className="paw-scrapbook-title">
            Community Memories
            <span className="paw-header-paw" aria-hidden="true">🐾</span>
          </h1>

          <p className="paw-scrapbook-subtitle">
            Little moments, big memories — see the stories shared by the PawConnect community.
          </p>

          <div className="paw-header-divider" aria-hidden="true">
            <span className="paw-divider-line" />
            <span className="paw-divider-heart">♥</span>
            <span className="paw-divider-line" />
          </div>
        </header>

        {/* Scrapbook Paper Filter Tabs */}
        <div className="paw-scrapbook-filters" role="tablist" aria-label="Memory categories">
          {CATEGORY_TABS.map(tab => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`paw-filter-tab ${isActive ? 'paw-filter-tab--active' : ''}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                <span className="paw-tab-icon" aria-hidden="true">{tab.icon}</span>
                <span className="paw-tab-label">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrapbook Memory Grid / Photo Album */}
        <main className="paw-scrapbook-grid">
          {filteredMemories.length === 0 ? (
            <div className="paw-scrapbook-empty">
              <span className="paw-empty-icon">📷</span>
              <h3>No memories in this category yet</h3>
              <p>Be the first to share a story in {activeFilter}!</p>
              <button
                type="button"
                className="paw-btn-primary"
                onClick={() => setIsShareModalOpen(true)}
              >
                Share Your Story
              </button>
            </div>
          ) : (
            filteredMemories.map(item => {
              const isLiked = likedMemories[item.id];

              return (
                <article
                  key={item.id}
                  className="paw-polaroid-card"
                  style={{ '--card-rotation': item.rotation }}
                  onClick={() => setSelectedMemory(item)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View memory for ${item.petName}`}
                >
                  {/* Decorative Tape Strip */}
                  <div className={`paw-tape-strip ${item.tapeStyle}`} aria-hidden="true" />

                  {/* Sticker Badge */}
                  <div className="paw-card-sticker" aria-hidden="true">
                    {item.sticker}
                  </div>

                  {/* Delete button only for user created stories */}
                  {item.isUserCreated && (
                    <button
                      type="button"
                      className="paw-card-delete-btn"
                      onClick={(e) => handleDeleteClick(e, item.id)}
                      aria-label={`Delete memory ${item.petName}`}
                      title="Delete memory"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Delete</span>
                    </button>
                  )}

                  {/* Photo Frame */}
                  <div className="paw-polaroid-photo">
                    <img src={item.image} alt={item.petName} loading="lazy" />
                    <span className="paw-category-badge">{item.category}</span>
                  </div>

                  {/* Polaroid Handwritten Caption */}
                  <div className="paw-polaroid-caption">
                    <h3 className="paw-pet-name">{item.petName}</h3>
                    <p className="paw-story-snippet">"{item.story}"</p>

                    <div className="paw-card-footer">
                      <div className="paw-author-meta">
                        <span className="paw-author-name">— {item.author}</span>
                        <span className="paw-meta-date">{item.date}</span>
                      </div>

                      <button
                        type="button"
                        className={`paw-like-btn ${isLiked ? 'paw-like-btn--active' : ''}`}
                        onClick={(e) => toggleLike(e, item.id)}
                        aria-label={`Like story by ${item.author}`}
                      >
                        <span className="paw-like-heart">{isLiked ? '❤️' : '🤍'}</span>
                        <span className="paw-like-count">{item.likes}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </main>

        {/* Scrapbook Bottom Call To Action */}
        <section className="paw-scrapbook-cta">
          <div className="paw-cta-paper">
            <div className="paw-cta-pin" aria-hidden="true">📌</div>
            <h2 className="paw-cta-title">Add your memory</h2>
            <p className="paw-cta-text">
              Adopted a new friend? Rescued a pet? Share the moment with the PawConnect community.
            </p>
            <button
              type="button"
              className="paw-btn-primary paw-cta-btn"
              onClick={() => setIsShareModalOpen(true)}
            >
              <span>Share Your Story</span>
              <span className="paw-btn-heart" aria-hidden="true">❤️</span>
            </button>
          </div>
        </section>

      </div>

      {/* Memory Detail Modal Lightbox */}
      {selectedMemory && (
        <div className="paw-modal-backdrop" onClick={() => setSelectedMemory(null)} role="dialog" aria-modal="true">
          <div className="paw-modal-card" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="paw-modal-close"
              onClick={() => setSelectedMemory(null)}
              aria-label="Close memory"
            >
              ✕
            </button>

            <div className="paw-modal-photo">
              <img src={selectedMemory.image} alt={selectedMemory.petName} />
              <span className="paw-category-badge">{selectedMemory.category}</span>
            </div>

            <div className="paw-modal-content">
              <div className="paw-modal-header">
                <h2>{selectedMemory.petName}</h2>
                <span className="paw-modal-location">📍 {selectedMemory.location}</span>
              </div>

              <p className="paw-modal-story">"{selectedMemory.story}"</p>

              <div className="paw-modal-footer">
                <div>
                  <strong>Shared by {selectedMemory.author}</strong>
                  <div className="paw-meta-date">{selectedMemory.date}</div>
                </div>

                <div className="paw-modal-actions">
                  {selectedMemory.isUserCreated && (
                    <button
                      type="button"
                      className="paw-modal-delete-btn"
                      onClick={(e) => handleDeleteClick(e, selectedMemory.id)}
                    >
                      <span>Delete Story</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className={`paw-like-btn paw-modal-like ${likedMemories[selectedMemory.id] ? 'paw-like-btn--active' : ''}`}
                    onClick={(e) => toggleLike(e, selectedMemory.id)}
                  >
                    <span>{likedMemories[selectedMemory.id] ? '❤️ Liked' : '🤍 Like memory'}</span>
                    <span className="paw-like-count">({selectedMemory.likes})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingMemoryId !== null && (
        <div className="paw-modal-backdrop" onClick={() => setDeletingMemoryId(null)} role="dialog" aria-modal="true">
          <div className="paw-modal-card paw-delete-modal" onClick={e => e.stopPropagation()}>
            <div className="paw-delete-header">
              <span className="paw-delete-icon" aria-hidden="true">🗑️</span>
              <h2>Delete this memory?</h2>
              <p>Are you sure you want to remove this story from the scrapbook? This action cannot be undone.</p>
            </div>

            <div className="paw-form-actions">
              <button
                type="button"
                className="paw-btn-secondary"
                onClick={() => setDeletingMemoryId(null)}
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

      {/* Share Story Modal */}
      {isShareModalOpen && (
        <div className="paw-modal-backdrop" onClick={() => setIsShareModalOpen(false)} role="dialog" aria-modal="true">
          <div className="paw-modal-card paw-share-modal" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="paw-modal-close"
              onClick={() => setIsShareModalOpen(false)}
              aria-label="Close form"
            >
              ✕
            </button>

            <div className="paw-share-header">
              <h2>Share a Memory 🐾</h2>
              <p>Add your pet's photo and story to the PawConnect scrapbook.</p>
            </div>

            <form onSubmit={handleShareSubmit} className="paw-share-form">
              <div className="paw-form-group">
                <label htmlFor="petName">Pet Name / Title</label>
                <input
                  id="petName"
                  type="text"
                  placeholder="e.g. Bella & Rocky"
                  value={newPetName}
                  onChange={e => setNewPetName(e.target.value)}
                  required
                />
              </div>

              <div className="paw-form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                >
                  <option value="Happy Tails">Happy Tails</option>
                  <option value="Adoption Stories">Adoption Stories</option>
                  <option value="Rescue">Rescue</option>
                  <option value="Foster">Foster</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div className="paw-form-group">
                <label htmlFor="author">Your Name / Handle</label>
                <input
                  id="author"
                  type="text"
                  placeholder="e.g. Alex M."
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                />
              </div>

              <div className="paw-form-group">
                <label htmlFor="story">Memory / Story</label>
                <textarea
                  id="story"
                  rows="4"
                  placeholder="Tell us what made this moment special..."
                  value={newStory}
                  onChange={e => setNewStory(e.target.value)}
                  required
                />
              </div>

              <div className="paw-form-actions">
                <button
                  type="button"
                  className="paw-btn-secondary"
                  onClick={() => setIsShareModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="paw-btn-primary">
                  Post Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
