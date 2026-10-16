import React, { useState } from "react";
import PawPatternBackground from "../../components/PawPatternBackground";

import heroImg from "../../assets/hero.png";
import milo from "../../assets/milo.jpeg";
import felix from "../../assets/felix.jpg";
import barnaby from "../../assets/barnaby.jpeg";
import oliver from "../../assets/oliver.jpg";
import persian from "../../assets/persian.jpg";

import "./Gallery.css";

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
    tapeStyle: "tape-top-left",
    image: milo,
    location: "Rajpura",
    likes: 42,
    isUserCreated: false,
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
    tapeStyle: "tape-top-right",
    image: barnaby,
    location: "Zirakpur",
    likes: 58,
    isUserCreated: false,
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
    tapeStyle: "tape-center",
    image: oliver,
    location: "Chandigarh",
    likes: 89,
    isUserCreated: false,
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
    tapeStyle: "tape-top-left",
    image: heroImg,
    location: "Mohali",
    likes: 64,
    isUserCreated: false,
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
    tapeStyle: "tape-top-right",
    image: heroImg,
    location: "Mohali",
    likes: 112,
    isUserCreated: false,
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
    tapeStyle: "tape-center",
    image: persian || felix,
    location: "New Chandigarh",
    likes: 77,
    isUserCreated: false,
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "All Memories" },
  { id: "Happy Tails", label: "Happy Tails" },
  { id: "Adoption Stories", label: "Adoption Stories" },
  { id: "Rescue", label: "Rescue" },
  { id: "Foster", label: "Foster" },
  { id: "Community", label: "Community" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [deletingMemoryId, setDeletingMemoryId] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [memories, setMemories] = useState(INITIAL_MEMORIES);
  const [likedMemories, setLikedMemories] = useState({});

  // New story form state
  const [newPetName, setNewPetName] = useState("");
  const [newStory, setNewStory] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState("Happy Tails");

  const filteredMemories =
    activeFilter === "all"
      ? memories
      : memories.filter((memory) => memory.category === activeFilter);

  const toggleLike = (event, id) => {
    event.stopPropagation();

    const isCurrentlyLiked = Boolean(likedMemories[id]);

    setLikedMemories((previous) => ({
      ...previous,
      [id]: !isCurrentlyLiked,
    }));

    setMemories((previousMemories) =>
      previousMemories.map((memory) =>
        memory.id === id
          ? {
              ...memory,
              likes: isCurrentlyLiked
                ? Math.max(0, memory.likes - 1)
                : memory.likes + 1,
            }
          : memory
      )
    );

    setSelectedMemory((previous) =>
      previous && previous.id === id
        ? {
            ...previous,
            likes: isCurrentlyLiked
              ? Math.max(0, previous.likes - 1)
              : previous.likes + 1,
          }
        : previous
    );
  };

  const handleDeleteClick = (event, id) => {
    event.stopPropagation();
    setDeletingMemoryId(id);
  };

  const confirmDelete = () => {
    if (deletingMemoryId === null) return;

    setMemories((previous) =>
      previous.filter((memory) => memory.id !== deletingMemoryId)
    );

    if (selectedMemory?.id === deletingMemoryId) {
      setSelectedMemory(null);
    }

    setDeletingMemoryId(null);
  };

  const handleShareSubmit = (event) => {
    event.preventDefault();

    if (!newPetName.trim() || !newStory.trim()) return;

    const newMemory = {
      id: Date.now(),
      petName: newPetName.trim(),
      story: newStory.trim(),
      author: newAuthor.trim() || "PawConnect Member",
      date: "Just now",
      category: newCategory,
      tapeStyle: [
        "tape-top-left",
        "tape-top-right",
        "tape-center",
      ][Math.floor(Math.random() * 3)],
      image: heroImg,
      location: "Local Community",
      likes: 0,
      isUserCreated: true,
    };

    setMemories((previous) => [newMemory, ...previous]);
    setNewPetName("");
    setNewStory("");
    setNewAuthor("");
    setNewCategory("Happy Tails");
    setIsShareModalOpen(false);
    setActiveFilter("all");
  };

  return (
    <PawPatternBackground intensity="community">
      <div className="paw-scrapbook-page">
        <div
          className="paw-scrapbook-container"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Page Header */}
          <header className="paw-scrapbook-header">
            <div className="paw-header-stamp" aria-hidden="true">
              <span>MEMORIES ALBUM</span>
            </div>

            <h1 className="paw-scrapbook-title">
              <span className="paw-header-paw" aria-hidden="true">
                🐾
              </span>
              Community Memories
            </h1>

            <p className="paw-scrapbook-subtitle">
              Little moments, big memories — see the stories shared by the
              PawConnect community.
            </p>

            <div className="paw-header-divider" aria-hidden="true">
              <span className="paw-divider-line" />
              <span className="paw-divider-heart">♥</span>
              <span className="paw-divider-line" />
            </div>
          </header>

          {/* Category Filter Tabs */}
          <div
            className="paw-scrapbook-filters"
            role="tablist"
            aria-label="Memory categories"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`paw-filter-tab ${
                    isActive ? "paw-filter-tab--active" : ""
                  }`}
                  onClick={() => setActiveFilter(tab.id)}
                >
                  <span className="paw-tab-label">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Memory Grid */}
          <main className="paw-scrapbook-grid">
            {filteredMemories.length === 0 ? (
              <div className="paw-scrapbook-empty">
                <span className="paw-empty-icon" aria-hidden="true">
                  🐾
                </span>
                <h3>No memories in this category yet</h3>
                <p>
                  Be the first to share a story in{" "}
                  {activeFilter === "all" ? "this album" : activeFilter}!
                </p>
                <button
                  type="button"
                  className="paw-btn-primary"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  Share Your Story
                </button>
              </div>
            ) : (
              filteredMemories.map((item) => {
                const isLiked = Boolean(likedMemories[item.id]);

                return (
                  <article
                    key={item.id}
                    className="paw-polaroid-card"
                    onClick={() => setSelectedMemory(item)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View memory for ${item.petName}`}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedMemory(item);
                      }
                    }}
                  >
                    {/* Decorative Tape */}
                    <div
                      className={`paw-tape-strip ${item.tapeStyle}`}
                      aria-hidden="true"
                    />

                    {/* Delete User-Created Stories */}
                    {item.isUserCreated && (
                      <button
                        type="button"
                        className="paw-card-delete-btn"
                        onClick={(event) => handleDeleteClick(event, item.id)}
                        aria-label={`Delete memory ${item.petName}`}
                        title="Delete memory"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        <span>Delete</span>
                      </button>
                    )}

                    {/* Photo */}
                    <div className="paw-polaroid-photo">
                      <img
                        src={item.image}
                        alt={item.petName}
                        loading="lazy"
                      />
                      <span className="paw-category-badge">
                        {item.category}
                      </span>
                    </div>

                    {/* Caption */}
                    <div className="paw-polaroid-caption">
                      <h3 className="paw-pet-name">{item.petName}</h3>

                      <p className="paw-story-snippet">"{item.story}"</p>

                      {/* Rescue Journey Details */}
                      {item.category === "Rescue" && (
                        <div className="paw-journey-timeline">
                          <span aria-hidden="true">🐾</span>
                          <span>Rescued with love • A fresh start</span>
                        </div>
                      )}

                      <div className="paw-card-footer">
                        <div className="paw-author-meta">
                          <span className="paw-author-name">
                            — {item.author}
                          </span>
                          <span className="paw-meta-date">{item.date}</span>
                        </div>

                        <button
                          type="button"
                          className={`paw-like-btn ${
                            isLiked ? "paw-like-btn--active" : ""
                          }`}
                          onClick={(event) => toggleLike(event, item.id)}
                          aria-label={`Like story by ${item.author}`}
                        >
                          <span className="paw-like-heart">
                            {isLiked ? "♥" : "♡"}
                          </span>
                          <span className="paw-like-count">{item.likes}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </main>

          {/* Bottom Call to Action */}
          <section className="paw-scrapbook-cta">
            <div className="paw-cta-paper">
              <div className="paw-cta-pin" aria-hidden="true">
                📌
              </div>

              <h2 className="paw-cta-title">Add Your Memory</h2>

              <p className="paw-cta-text">
                Adopted a new friend? Rescued a pet? Share the moment with the
                PawConnect community.
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

        {/* Memory Detail Modal */}
        {selectedMemory && (
          <div
            className="paw-modal-backdrop"
            onClick={() => setSelectedMemory(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Memory details"
          >
            <div
              className="paw-modal-card"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="paw-modal-close"
                onClick={() => setSelectedMemory(null)}
                aria-label="Close memory"
              >
                ✕
              </button>

              <div className="paw-modal-photo">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.petName}
                />
                <span className="paw-category-badge">
                  {selectedMemory.category}
                </span>
              </div>

              <div className="paw-modal-content">
                <div className="paw-modal-header">
                  <h2>{selectedMemory.petName}</h2>
                  <span className="paw-modal-location">
                    {selectedMemory.location}
                  </span>
                </div>

                <p className="paw-modal-story">"{selectedMemory.story}"</p>

                <div className="paw-modal-footer">
                  <div>
                    <strong>Shared by {selectedMemory.author}</strong>
                    <div className="paw-meta-date">
                      {selectedMemory.date}
                    </div>
                  </div>

                  <div className="paw-modal-actions">
                    {selectedMemory.isUserCreated && (
                      <button
                        type="button"
                        className="paw-modal-delete-btn"
                        onClick={(event) =>
                          handleDeleteClick(event, selectedMemory.id)
                        }
                      >
                        Delete Story
                      </button>
                    )}

                    <button
                      type="button"
                      className={`paw-like-btn paw-modal-like ${
                        likedMemories[selectedMemory.id]
                          ? "paw-like-btn--active"
                          : ""
                      }`}
                      onClick={(event) =>
                        toggleLike(event, selectedMemory.id)
                      }
                    >
                      <span>
                        {likedMemories[selectedMemory.id]
                          ? "♥ Liked"
                          : "♡ Like memory"}
                      </span>
                      <span className="paw-like-count">
                        (
                        {memories.find(
                          (memory) => memory.id === selectedMemory.id
                        )?.likes ?? selectedMemory.likes}
                        )
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletingMemoryId !== null && (
          <div
            className="paw-modal-backdrop"
            onClick={() => setDeletingMemoryId(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Confirm deletion"
          >
            <div
              className="paw-modal-card paw-delete-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="paw-delete-header">
                <span className="paw-delete-icon" aria-hidden="true">
                  🗑️
                </span>
                <h2>Delete this memory?</h2>
                <p>
                  Are you sure you want to remove this story from the scrapbook?
                  This action cannot be undone.
                </p>
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
          <div
            className="paw-modal-backdrop"
            onClick={() => setIsShareModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Share a memory"
          >
            <div
              className="paw-modal-card paw-share-modal"
              onClick={(event) => event.stopPropagation()}
            >
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
                <p>
                  Add your pet's story to the PawConnect scrapbook.
                </p>
              </div>

              <form
                onSubmit={handleShareSubmit}
                className="paw-share-form"
              >
                <div className="paw-form-group">
                  <label htmlFor="petName">Pet Name / Title</label>
                  <input
                    id="petName"
                    type="text"
                    placeholder="e.g. Bella & Rocky"
                    value={newPetName}
                    onChange={(event) => setNewPetName(event.target.value)}
                    required
                  />
                </div>

                <div className="paw-form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
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
                    onChange={(event) => setNewAuthor(event.target.value)}
                  />
                </div>

                <div className="paw-form-group">
                  <label htmlFor="story">Memory / Story</label>
                  <textarea
                    id="story"
                    rows={4}
                    placeholder="Tell us what made this moment special..."
                    value={newStory}
                    onChange={(event) => setNewStory(event.target.value)}
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