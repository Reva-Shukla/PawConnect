import React, { useState } from 'react';
import PawPatternBackground from '../../components/PawPatternBackground';
import heroImg from '../../assets/hero.png';
import miloBefore from '../../assets/miloBefore.jpg';
import milo from '../../assets/milo.jpeg';
import felix from '../../assets/felix.jpg';
import bruno from '../../assets/bruno.jpg';
import ollieBefore from '../../assets/ollieBefore.jpg';
import oliver from '../../assets/oliver.jpg';
import willowBefore from '../../assets/willowBefore.jpeg';
import willow from '../../assets/willow.jpeg';
import persian from '../../assets/persian.jpg';
import gauri from '../../assets/gauri.jpg';
import './Gallery.css';

/**
 * PawConnect Community Memories & Rescue Stories
 *
 * Story data shape:
 *  id, petName, animalType, breed, story, author, date, category,
 *  rotation, tapeStyle, image,
 *  -- Rescue-Story extras (all optional) --
 *  beforeImage, afterImage, rescueDate, adoptionDate,
 *  milestones (array of completed milestone keys), status,
 *  location, likes, isUserCreated
 */

// Journey milestone labels (ordered)
const ALL_MILESTONES = [
  { key: 'rescued', label: 'Rescued', icon: '🚑' },
  { key: 'medical', label: 'Medical Care', icon: '🩺' },
  { key: 'foster', label: 'Foster Home', icon: '🏠' },
  { key: 'rehabilitation', label: 'Rehabilitation', icon: '💪' },
  { key: 'ready', label: 'Ready for Adoption', icon: '✨' },
  { key: 'adopted', label: 'Adopted', icon: '❤️' },
];

const STATUS_META = {
  adopted: { label: 'Adopted', className: 'paw-status--adopted' },
  fostered: { label: 'In Foster Care', className: 'paw-status--fostered' },
  rehabilitation: { label: 'Rehabilitating', className: 'paw-status--rehab' },
  medical: { label: 'Medical Care', className: 'paw-status--medical' },
  rescued: { label: 'Safe at Shelter', className: 'paw-status--rescued' },
};

const INITIAL_MEMORIES = [
  // --- FEATURED: Milo's Recovery Journey (showcase rescue story) ---
  {
    id: 8,
    petName: 'Milo',
    petId: 'SPC-MILO',
    animalType: 'Dog',
    breed: 'Golden Retriever',
    story:
      'Milo was rescued from a roadside accident in February 2026 with a fractured hind leg and severe trauma-induced fear. He could barely stand and was terrified of human touch. After emergency surgery, months of patient rehabilitation at the SPCA shelter, and the care of a dedicated foster family, Milo transformed completely. Today he is gentle, trusting, and preparing for his forever home — a journey that\'s moved everyone who has been part of it.',
    author: 'SPCA Chandigarh Rehab Team',
    date: 'Aug 14, 2026',
    category: 'Rescue',
    rescueDate: 'Feb 18, 2026',
    adoptionDate: null,
    milestones: ['rescued', 'medical', 'foster', 'rehabilitation', 'ready'],
    status: 'rehabilitation',
    // Using available local milo image for after; no verified before photo available
    image: milo,
    beforeImage: miloBefore,
    afterImage: milo,
    rotation: '0deg',
    tapeStyle: 'tape-center',
    location: 'Chandigarh',
    likes: 148,
    isFeatured: true,
    isUserCreated: false,
  },

  // --- Other Rescue Stories ---
  {
    id: 3,
    petName: 'Ollie',
    animalType: 'Cat',
    breed: 'Domestic Shorthair',
    story:
      'Ollie was found injured near a roadside, too frightened to move. After weeks of veterinary care, patient rehabilitation, and a loving foster home, this little fighter came back stronger than ever — and found his forever family.',
    author: 'Dr. Riya Sharma',
    date: 'Aug 15, 2026',
    category: 'Rescue',
    rescueDate: 'Jul 2, 2026',
    adoptionDate: 'Aug 14, 2026',
    milestones: ['rescued', 'medical', 'foster', 'rehabilitation', 'adopted'],
    status: 'adopted',
    // No verified before/after pair available — using single honest image
    image: oliver,
    beforeImage: ollieBefore,
    afterImage: oliver,
    rotation: '0deg',
    tapeStyle: 'tape-center',
    location: 'Chandigarh',
    likes: 89,
    isUserCreated: false,
  },

  {
    id: 7,
    petName: 'Willow',
    animalType: 'Dog',
    breed: 'Indie Mix',
    story:
      'Willow arrived severely malnourished after being found on the highway. With steady medical care and months of rehabilitation, she transformed into a playful, confident dog ready to bring joy to a new family.',
    author: 'PawConnect Rescue Team',
    date: 'Sep 10, 2026',
    category: 'Rescue',
    rescueDate: 'Jun 15, 2026',
    adoptionDate: null,
    milestones: ['rescued', 'medical', 'foster', 'rehabilitation'],
    status: 'rehabilitation',
    image: willow,
    beforeImage: willowBefore,
    afterImage: willow,
    rotation: '0deg',
    tapeStyle: 'tape-top-left',
    location: 'Mohali',
    likes: 73,
    isUserCreated: false,
  },

  // --- Adoption & Happy Tails Stories ---
  {
    id: 1,
    petName: 'Milo & Mishti',
    animalType: 'Dog',
    breed: 'Golden Retriever',
    story:
      'From a nervous rescue pup to a happy companion, Milo found a loving home and a best friend in Mishti. Their bond is a reminder that every rescue deserves a second chance.',
    author: 'Aarohi Mehta',
    date: 'Sep 4, 2026',
    category: 'Adoption Stories',
    rotation: '0deg',
    tapeStyle: 'tape-top-left',
    sticker: '🐾',
    image: milo,
    location: 'Rajpura',
    likes: 42,
    isUserCreated: false,
  },

  {
    id: 2,
    petName: "Bruno's First Beach Day",
    animalType: 'Dog',
    breed: 'Labrador',
    story:
      "Bruno had never seen the sea before. His first beach day turned into an unforgettable adventure filled with running, splashing, and plenty of happy tail wags!",
    author: 'Arjun Malhotra',
    date: 'Aug 29, 2026',
    category: 'Happy Tails',
    rotation: '0deg',
    tapeStyle: 'tape-top-right',
    sticker: '❤️',
    image: bruno,
    location: 'Zirakpur',
    likes: 58,
    isUserCreated: false,
  },

  {
    id: 4,
    petName: "Gauri's Golden Years",
    animalType: 'Dog',
    breed: 'German Shepherd',
    story:
      'At 11 years old, Gauri finally found a family to call her own. Her gentle nature and loving personality prove that it is never too late for a senior pet to find their forever home.',
    author: 'The Kapoor Family',
    date: 'Aug 02, 2026',
    category: 'Foster',
    rotation: '0deg',
    tapeStyle: 'tape-top-left',
    sticker: '🌟',
    image: gauri,
    location: 'Mohali',
    likes: 64,
    isUserCreated: false,
  },

  {
    id: 5,
    petName: 'PawConnect Shelter Park Day',
    animalType: 'Dog',
    breed: 'Indie Dog',
    story:
      'PawConnect volunteers came together for a fun community day at the shelter. The afternoon was filled with playtime, cuddles, and lots of happy foster pups!',
    author: 'PawConnect Volunteers',
    date: 'Jul 24, 2026',
    category: 'Community',
    rotation: '0deg',
    tapeStyle: 'tape-top-right',
    sticker: '🏡',
    image: felix,
    location: 'Patiala',
    likes: 112,
    isUserCreated: false,
  },

  {
    id: 6,
    petName: "Mittu & Chutki's Bonded Pair",
    animalType: 'Cat',
    breed: 'Siamese',
    story:
      'Mittu and Chutki arrived as two little kittens and quickly became inseparable. Their playful personalities and constant cuddles made it impossible to imagine them apart.',
    author: 'Ishita & Rohan',
    date: 'Jul 18, 2026',
    category: 'Happy Tails',
    rotation: '0deg',
    tapeStyle: 'tape-center',
    sticker: '💖',
    image: persian,
    location: 'New Chandigarh',
    likes: 77,
    isUserCreated: false,
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Memories', icon: '📖' },
  { id: 'Rescue', label: 'Rescue Stories', icon: '🩹' },
  { id: 'Happy Tails', label: 'Happy Tails', icon: '🐶' },
  { id: 'Adoption Stories', label: 'Adoption Stories', icon: '🏡' },
  { id: 'Foster', label: 'Foster', icon: '🍼' },
  { id: 'Community', label: 'Community', icon: '🤝' },
];

const VOLUNTEER_ROLES = [
  {
    id: 'dog-walking',
    icon: '🦮',
    title: 'Dog Walking',
    description: 'Give shelter dogs a chance to stretch their legs and feel the world outside. Morning and afternoon slots available.',
    commitment: '1–2 hrs/week',
  },
  {
    id: 'socialisation',
    icon: '🤝',
    title: 'Socialisation',
    description: 'Help timid or under-socialised animals build confidence through gentle, guided interaction.',
    commitment: '2 hrs/week',
  },
  {
    id: 'foster-support',
    icon: '🏠',
    title: 'Foster Support',
    description: 'Provide temporary care for animals between shelter stays. Training and ongoing shelter support provided.',
    commitment: '2–4 weeks',
  },
  {
    id: 'grooming',
    icon: '✂️',
    title: 'Grooming',
    description: 'Keep animals clean, comfortable, and adoption-ready. Basic grooming skills are welcome; training available.',
    commitment: 'Flexible',
  },
  {
    id: 'transport',
    icon: '🚗',
    title: 'Transport',
    description: 'Drive animals to vet appointments, adoption events, or foster homes. A huge help for rural shelters.',
    commitment: 'As needed',
  },
  {
    id: 'supplies',
    icon: '📦',
    title: 'Food & Supplies',
    description: 'Donate or help collect food, bedding, toys, and medical supplies for shelters in the network.',
    commitment: 'One-time or recurring',
  },
];

/**
 * Renders a compact milestone journey timeline.
 * Only shows milestones present in the story's milestones array.
 */
function MilestoneTimeline({ milestones }) {
  if (!milestones || milestones.length === 0) return null;
  const milestoneSet = new Set(milestones);
  const active = ALL_MILESTONES.filter(m => milestoneSet.has(m.key));
  if (active.length === 0) return null;

  return (
    <div className="paw-milestone-timeline" aria-label="Rescue journey milestones">
      {active.map((m, idx) => (
        <React.Fragment key={m.key}>
          <div className="paw-milestone-step">
            <span className="paw-milestone-icon" aria-hidden="true">{m.icon}</span>
            <span className="paw-milestone-label">{m.label}</span>
          </div>
          {idx < active.length - 1 && (
            <span className="paw-milestone-connector" aria-hidden="true">→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Before / After image pair display.
 * If beforeImage is null, shows an "Image unavailable" placeholder rather than a broken src.
 */
function BeforeAfterImages({ story }) {
  const hasBefore = Boolean(story.beforeImage);

  return (
    <div className="paw-before-after-wrap">
      {/* BEFORE */}
      <div className="paw-ba-panel">
        <span className="paw-ba-label paw-ba-label--before" aria-label="Before rescue">Before</span>
        {hasBefore ? (
          <img
            src={story.beforeImage}
            alt={`${story.petName} before rescue`}
            className="paw-ba-img"
            loading="lazy"
          />
        ) : (
          <div className="paw-ba-placeholder" aria-label="Before image not available">
            <span className="paw-ba-placeholder-icon" aria-hidden="true">📷</span>
            <span>Image not available</span>
          </div>
        )}
      </div>

      {/* Arrow separator */}
      <div className="paw-ba-arrow" aria-hidden="true">
        <span>→</span>
      </div>

      {/* AFTER */}
      <div className="paw-ba-panel">
        <span className="paw-ba-label paw-ba-label--after" aria-label="After recovery">After</span>
        {story.afterImage ? (
          <img
            src={story.afterImage}
            alt={`${story.petName} after recovery`}
            className="paw-ba-img"
            loading="lazy"
          />
        ) : (
          <div className="paw-ba-placeholder">
            <span className="paw-ba-placeholder-icon" aria-hidden="true">📷</span>
            <span>Image not available</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * StatusBadge — shows the current welfare status of the animal.
 */
function StatusBadge({ status }) {
  if (!status) return null;
  const meta = STATUS_META[status] || { label: status, className: 'paw-status--rescued' };
  return (
    <span className={`paw-status-badge ${meta.className}`}>
      {meta.label}
    </span>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [deletingMemoryId, setDeletingMemoryId] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [memories, setMemories] = useState(INITIAL_MEMORIES);
  const [likedMemories, setLikedMemories] = useState({});
  const [volunteerInterest, setVolunteerInterest] = useState(null);

  // Share Story Form State
  const [newPetName, setNewPetName] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('Happy Tails');
  const [newLocation, setNewLocation] = useState('');
  const [newAnimalType, setNewAnimalType] = useState('Dog');

  const filteredMemories = activeFilter === 'all'
    ? memories
    : memories.filter(m => m.category === activeFilter);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    const isCurrentlyLiked = Boolean(likedMemories[id]);
    setLikedMemories(prev => ({ ...prev, [id]: !isCurrentlyLiked }));
    setMemories(prevMemories =>
      prevMemories.map(m => {
        if (m.id === id) {
          return { ...m, likes: isCurrentlyLiked ? m.likes - 1 : m.likes + 1 };
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
      isUserCreated: true,
    };

    setMemories([newMemoryObj, ...memories]);
    setNewPetName('');
    setNewStory('');
    setNewAuthor('');
    setNewLocation('');
    setIsShareModalOpen(false);
  };

  // Determine whether a card should show the rescue-story layout
  const isRescueStory = (item) =>
    item.category === 'Rescue' && (item.milestones || item.status);

  return (
    <PawPatternBackground intensity="community">
      <div className="paw-scrapbook-page">

        <div className="paw-scrapbook-container" style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Page Header ── */}
          <header className="paw-scrapbook-header">
            <div className="paw-header-stamp" aria-hidden="true">
              <span>MEMORIES ALBUM</span>
            </div>

            <h1 className="paw-scrapbook-title">
              Community Memories &amp; Rescue Stories
            </h1>

            <p className="paw-scrapbook-subtitle">
              Little moments, big memories — see the stories shared by the PawConnect community.
              Rescue stories show real journeys from rescue to recovery.
            </p>

            <div className="paw-header-divider" aria-hidden="true">
              <span className="paw-divider-line" />
              <span className="paw-divider-heart">♥</span>
              <span className="paw-divider-line" />
            </div>
          </header>

          {/* ── Category Filter Tabs ── */}
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
                  {tab.icon && <span className="paw-tab-icon" aria-hidden="true">{tab.icon}</span>}
                  <span className="paw-tab-label">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Memory Grid ── */}
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
                const showRescueLayout = isRescueStory(item);

                return (
                  <article
                    key={item.id}
                    className={`paw-polaroid-card ${showRescueLayout ? 'paw-polaroid-card--rescue' : ''}`}
                    onClick={() => setSelectedMemory(item)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View memory for ${item.petName}`}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedMemory(item); }}
                  >
                    {/* Decorative Tape Strip */}
                    <div className={`paw-tape-strip ${item.tapeStyle}`} aria-hidden="true" />

                    {/* Per-card sticker emoji (standard cards only) */}
                    {!showRescueLayout && item.sticker && (
                      <span className="paw-card-sticker" aria-hidden="true">{item.sticker}</span>
                    )}

                    {/* Delete button only for user-created stories */}
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

                    {/* Photo Area — Rescue vs Standard */}
                    {showRescueLayout ? (
                      <div className="paw-polaroid-photo paw-polaroid-photo--rescue">
                        <BeforeAfterImages story={item} />
                        <span className="paw-category-badge">Rescue Story</span>
                        <StatusBadge status={item.status} />
                      </div>
                    ) : (
                      <div className="paw-polaroid-photo">
                        <img src={item.image} alt={item.petName} loading="lazy" />
                        <span className="paw-category-badge">{item.category}</span>
                      </div>
                    )}

                    {/* Caption */}
                    <div className="paw-polaroid-caption">
                      <h3 className="paw-pet-name">{item.petName}</h3>

                      {/* Milestone timeline — rescue cards only */}
                      {showRescueLayout && (
                        <MilestoneTimeline milestones={item.milestones} />
                      )}

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

          {/* ── Share Story CTA ── */}
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

          {/* ── Volunteer Opportunities Section ── */}
          <section className="paw-volunteer-section" aria-labelledby="volunteer-heading">
            <div className="paw-volunteer-header">
              <div className="paw-header-stamp" aria-hidden="true">
                <span>GET INVOLVED</span>
              </div>
              <h2 id="volunteer-heading" className="paw-volunteer-title">
                Volunteer with PawConnect
              </h2>
              <p className="paw-volunteer-subtitle">
                Every paw saved takes a village. Discover ways you can make a real difference —
                whether you have one hour or one month to give.
              </p>
            </div>

            <div className="paw-volunteer-grid">
              {VOLUNTEER_ROLES.map(role => (
                <div
                  key={role.id}
                  className={`paw-volunteer-card ${volunteerInterest === role.id ? 'paw-volunteer-card--active' : ''}`}
                  onClick={() => setVolunteerInterest(volunteerInterest === role.id ? null : role.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={volunteerInterest === role.id}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ')
                      setVolunteerInterest(volunteerInterest === role.id ? null : role.id);
                  }}
                >
                  <span className="paw-volunteer-icon" aria-hidden="true">{role.icon}</span>
                  <div className="paw-volunteer-body">
                    <h3 className="paw-volunteer-role">{role.title}</h3>
                    <p className="paw-volunteer-desc">{role.description}</p>
                    <span className="paw-volunteer-commitment">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {role.commitment}
                    </span>
                  </div>

                  {volunteerInterest === role.id && (
                    <div className="paw-volunteer-interest-note" role="status">
                      <span>✓</span>
                      <span>
                        Interested! Contact your local shelter through the{' '}
                        <a href="/shelters" className="paw-volunteer-link">Shelters page</a>{' '}
                        to sign up.
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── Memory Detail Modal ── */}
        {selectedMemory && (
          <div
            className="paw-modal-backdrop"
            onClick={() => setSelectedMemory(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Memory: ${selectedMemory.petName}`}
          >
            <div className="paw-modal-card paw-modal-card--detail" onClick={e => e.stopPropagation()}>
              <button
                type="button"
                className="paw-modal-close"
                onClick={() => setSelectedMemory(null)}
                aria-label="Close memory"
              >
                ✕
              </button>

              {/* Rescue story gets before/after in modal; others get single image */}
              {isRescueStory(selectedMemory) ? (
                <div className="paw-modal-photo paw-modal-photo--rescue">
                  <BeforeAfterImages story={selectedMemory} />
                  <StatusBadge status={selectedMemory.status} />
                </div>
              ) : (
                <div className="paw-modal-photo">
                  <img src={selectedMemory.image} alt={selectedMemory.petName} />
                  <span className="paw-category-badge">{selectedMemory.category}</span>
                </div>
              )}

              <div className="paw-modal-content">
                <div className="paw-modal-header">
                  <h2>{selectedMemory.petName}</h2>
                  <span className="paw-modal-location">{selectedMemory.location}</span>
                </div>

                {/* Milestone timeline in modal */}
                {isRescueStory(selectedMemory) && (
                  <MilestoneTimeline milestones={selectedMemory.milestones} />
                )}

                {/* Rescue date info */}
                {selectedMemory.rescueDate && (
                  <div className="paw-modal-rescue-meta">
                    <span>🚑 Rescued: {selectedMemory.rescueDate}</span>
                    {selectedMemory.adoptionDate && (
                      <span>❤️ Adopted: {selectedMemory.adoptionDate}</span>
                    )}
                  </div>
                )}

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
                      <span className="paw-like-count">
                        ({memories.find(m => m.id === selectedMemory.id)?.likes ?? selectedMemory.likes})
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Delete Confirmation Modal ── */}
        {deletingMemoryId !== null && (
          <div
            className="paw-modal-backdrop"
            onClick={() => setDeletingMemoryId(null)}
            role="dialog"
            aria-modal="true"
          >
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

        {/* ── Share Story Modal ── */}
        {isShareModalOpen && (
          <div
            className="paw-modal-backdrop"
            onClick={() => setIsShareModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
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
                <p>Add your pet's story to the PawConnect scrapbook.</p>
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
