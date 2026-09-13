import React, { useState } from 'react';
import PawPrintDoodle from '../../components/PawPrintDoodle';
import PawPatternBackground from '../../components/PawPatternBackground';
import heroImg from '../../assets/hero.png';
import milo from "../../assets/milo.jpeg";
import felix from "../../assets/felix.jpg";
import barnaby from "../../assets/barnaby.jpeg";
import oliver from "../../assets/oliver.jpg";
import willow from "../../assets/willow.jpg";
import persian from "../../assets/persian.jpg";
import './Gallery.css';

/**
 * PawConnect Community Memories Data
 */
const INITIAL_MEMORIES = [
  {
    id: 1,
    petName: "Milo & Mishti",
    animalType: "Dog",
    breed: "Golden Retriever",
    story:
      "From a nervous rescue pup to a happy companion, Milo found a loving home and a best friend in Mishti. Their bond is a reminder that every rescue deserves a second chance.",
    author: "Aarohi Mehta",
    date: "Sep 4, 2026",
    category: "Adoption Stories",
    rotation: "0deg",
    tapeStyle: "tape-top-left",
    image: milo,
    location: "Rajpura",
    likes: 42,
    isUserCreated: false
  },

  {
    id: 2,
    petName: "Bruno's First Beach Day",
    animalType: "Dog",
    breed: "Labrador",
    story:
      "Bruno had never seen the sea before. His first beach day turned into an unforgettable adventure filled with running, splashing and plenty of happy tail wags!",
    author: "Arjun Malhotra",
    date: "Aug 29, 2026",
    category: "Happy Tails",
    rotation: "0deg",
    tapeStyle: "tape-top-right",
    image: barnaby,
    location: "Zirakpur",
    likes: 58,
    isUserCreated: false
  },

  {
    id: 3,
    petName: "Ollie's Recovery Journey",
    animalType: "Cat",
    breed: "Domestic Shorthair",
    story:
      "Ollie was rescued after being found injured near a roadside. After weeks of care, patience and plenty of love, this little fighter was back on his paws and ready for a fresh start.",
    author: "Dr. Riya Sharma",
    date: "Aug 15, 2026",
    category: "Rescue",
    rotation: "0deg",
    tapeStyle: "tape-center",
    image: oliver,
    location: "Chandigarh",
    likes: 89,
    isUserCreated: false
  },

  {
    id: 4,
    petName: "Gauri's Golden Years",
    animalType: "Dog",
    breed: "German Shepherd",
    story:
      "At 11 years old, Gauri finally found a family to call her own. Her gentle nature and loving personality prove that it is never too late for a senior pet to find their forever home.",
    author: "The Kapoor Family",
    date: "Aug 02, 2026",
    category: "Foster",
    rotation: "0deg",
    tapeStyle: "tape-top-left",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFuMDXaj_fBUQlCB0VSzT7TzbxnhSUp8DgDGvdYtD4qIjjCFmsu3bkio&s=10",
    location: "Mohali",
    likes: 64,
    isUserCreated: false
  },

  {
    id: 5,
    petName: "PawConnect Shelter Park Day",
    animalType: "Dog",
    breed: "Indie Dog",
    story:
      "PawConnect volunteers came together for a fun community day at the shelter. The afternoon was filled with playtime, cuddles and lots of happy foster pups!",
    author: "PawConnect Volunteers",
    date: "Jul 24, 2026",
    category: "Community",
    rotation: "0deg",
    tapeStyle: "tape-top-right",
    image: felix,
    location: "Patiala",
    likes: 112,
    isUserCreated: false
  },

  {
    id: 6,
    petName: "Mittu & Chutki's Bonded Pair",
    animalType: "Cat",
    breed: "Siamese",
    story:
      "Mittu and Chutki arrived as two little kittens and quickly became inseparable. Their playful personalities and constant cuddles made it impossible to imagine them apart.",
    author: "Ishita & Rohan",
    date: "Jul 18, 2026",
    category: "Happy Tails",
    rotation: "0deg",
    tapeStyle: "tape-center",
    image: persian,
    location: "New Chandigarh",
    likes: 77,
    isUserCreated: false
  }
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Memories' },
  { id: 'Happy Tails', label: 'Happy Tails' },
  { id: 'Adoption Stories', label: 'Adoption Stories' },
  { id: 'Rescue', label: 'Rescue' },
  { id: 'Foster', label: 'Foster' },
  { id: 'Community', label: 'Community' },
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
    const isCurrentlyLiked = Boolean(likedMemories[id]);

    setLikedMemories(prev => ({
      ...prev,
      [id]: !isCurrentlyLiked
    }));

    setMemories(prevMemories =>
      prevMemories.map(m => {
        if (m.id === id) {
          return {
            ...m,
            likes: isCurrentlyLiked ? m.likes - 1 : m.likes + 1
          };
        }
        return m;
      })
    );
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
      rotation: '0deg',
      tapeStyle: ['tape-top-left', 'tape-top-right', 'tape-center'][Math.floor(Math.random() * 3)],
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
    <PawPatternBackground intensity="community">
      <div className="paw-scrapbook-page">

      <div className="paw-scrapbook-container" style={{ position: "relative", zIndex: 1 }}>

        {/* Page Header */}
        <header className="paw-scrapbook-header">
          <div className="paw-header-stamp" aria-hidden="true">
            <span>MEMORIES ALBUM</span>
          </div>

          <h1 className="paw-scrapbook-title">
            Community Memories
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
                <span className="paw-tab-label">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrapbook Memory Grid / Photo Album */}
        <main className="paw-scrapbook-grid">
          {filteredMemories.length === 0 ? (
            <div className="paw-scrapbook-empty">
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
                  style={{ '--card-rotation': '0deg' }}
                  onClick={() => setSelectedMemory(item)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View memory for ${item.petName}`}
                >
                  {/* Decorative Tape Strip */}
                  <div className={`paw-tape-strip ${item.tapeStyle}`} aria-hidden="true" />

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
                        <span className="paw-like-heart">{isLiked ? '♥' : '♡'}</span>
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
                <span className="paw-modal-location">{selectedMemory.location}</span>
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
                    <span>{likedMemories[selectedMemory.id] ? '♥ Liked' : '♡ Like memory'}</span>
                    <span className="paw-like-count">({memories.find(m => m.id === selectedMemory.id)?.likes ?? selectedMemory.likes})</span>
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
              <h2>Share a Memory</h2>
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
    </PawPatternBackground>
  );
}
