import React, { useState } from 'react';
import PawPatternBackground from '../../components/PawPatternBackground';
import PawPrintDoodle from '../../components/PawPrintDoodle';
import CommunityBackButton from '../../components/CommunityBackButton';
import './Supplies.css';

/**
 * PawConnect Community Supplies
 * Lets the community discover what shelters need most and flag interest in donating items.
 * No payment processing — items are donated in person or coordinated via shelter contact.
 */

const SUPPLY_CATEGORIES = [
  { id: 'all',      label: 'All Items',      icon: '📦' },
  { id: 'food',     label: 'Food',           icon: '🥣' },
  { id: 'medical',  label: 'Medical',        icon: '💊' },
  { id: 'bedding',  label: 'Bedding',        icon: '🛏️' },
  { id: 'toys',     label: 'Toys & Enrichment', icon: '🧸' },
  { id: 'hygiene',  label: 'Hygiene',        icon: '🧴' },
];

const URGENCY_META = {
  critical: { label: 'Critically Needed',   className: 'supply-urgency--critical' },
  high:     { label: 'Urgently Needed',     className: 'supply-urgency--high' },
  medium:   { label: 'Needed',              className: 'supply-urgency--medium' },
  low:      { label: 'Appreciated',         className: 'supply-urgency--low' },
};

const SUPPLIES = [
  {
    id: 1,
    name: 'Dry Dog Food (Adult)',
    category: 'food',
    urgency: 'critical',
    icon: '🥣',
    description: 'High-protein dry kibble for adult dogs. Shelters currently have less than 1 week of stock.',
    shelters: ['City Paws Shelter – Chandigarh', 'PawConnect Mohali'],
    acceptedBrands: 'Pedigree, Royal Canin, Drools, or equivalent',
    donatedCount: 14,
  },
  {
    id: 2,
    name: 'Kitten Wet Food',
    category: 'food',
    urgency: 'critical',
    icon: '🐱',
    description: 'Wet food pouches for kittens under 6 months. High demand due to recent rescue intake.',
    shelters: ['New Chandigarh Cat Rescue'],
    acceptedBrands: 'Whiskas, Royal Canin Kitten, Me-O',
    donatedCount: 8,
  },
  {
    id: 3,
    name: 'Wound Care & Bandages',
    category: 'medical',
    urgency: 'high',
    icon: '🩹',
    description: 'Sterile gauze pads, bandage rolls, antiseptic wipes, and betadine solution for routine wound care.',
    shelters: ['City Paws Shelter – Chandigarh', 'PawConnect Rajpura'],
    acceptedBrands: 'Any pharmacy grade',
    donatedCount: 6,
  },
  {
    id: 4,
    name: 'Flea & Tick Treatment',
    category: 'medical',
    urgency: 'high',
    icon: '💊',
    description: 'Spot-on or spray treatments for dogs and cats. Essential for animals arriving from the street.',
    shelters: ['PawConnect Mohali', 'Zirakpur Animal Welfare'],
    acceptedBrands: 'Frontline, Beaphar, NexGard (vet-cleared)',
    donatedCount: 9,
  },
  {
    id: 5,
    name: 'Fleece Blankets',
    category: 'bedding',
    urgency: 'medium',
    icon: '🛏️',
    description: 'Washable fleece or cotton blankets to keep kennel animals warm. Any size welcome.',
    shelters: ['All partner shelters'],
    acceptedBrands: 'Any clean, washable fabric',
    donatedCount: 22,
  },
  {
    id: 6,
    name: 'Stainless Steel Bowls',
    category: 'bedding',
    urgency: 'medium',
    icon: '🥄',
    description: 'Durable food and water bowls for shelter kennels. Easy to clean and long-lasting.',
    shelters: ['City Paws Shelter – Chandigarh', 'PawConnect Patiala'],
    acceptedBrands: 'Any stainless steel, 500 ml – 1.5 L',
    donatedCount: 11,
  },
  {
    id: 7,
    name: 'Interactive Dog Toys',
    category: 'toys',
    urgency: 'medium',
    icon: '🧸',
    description: 'Rope toys, rubber chews, or puzzle feeders to keep dogs mentally stimulated during their shelter stay.',
    shelters: ['PawConnect Mohali', 'Zirakpur Animal Welfare'],
    acceptedBrands: 'Any durable, non-toxic toy',
    donatedCount: 17,
  },
  {
    id: 8,
    name: 'Cat Scratching Posts',
    category: 'toys',
    urgency: 'low',
    icon: '🐾',
    description: 'Sisal or carpet scratching posts or pads for cats in the community room.',
    shelters: ['New Chandigarh Cat Rescue'],
    acceptedBrands: 'Any stable, cat-safe design',
    donatedCount: 4,
  },
  {
    id: 9,
    name: 'Dog Shampoo (Medicated)',
    category: 'hygiene',
    urgency: 'high',
    icon: '🧴',
    description: 'Antifungal or anti-parasitic dog shampoo for street rescue animals. Especially needed during monsoon season.',
    shelters: ['City Paws Shelter – Chandigarh', 'PawConnect Rajpura'],
    acceptedBrands: 'Hexacare, Ketochlor, or vet-recommended alternatives',
    donatedCount: 7,
  },
  {
    id: 10,
    name: 'Litter & Litter Trays',
    category: 'hygiene',
    urgency: 'medium',
    icon: '🪣',
    description: 'Clumping or non-clumping cat litter and plastic trays. Always in demand for the cat wing.',
    shelters: ['New Chandigarh Cat Rescue', 'PawConnect Patiala'],
    acceptedBrands: 'Fresh Step, Catsan, or equivalent',
    donatedCount: 13,
  },
];

const HOW_IT_WORKS = [
  {
    step: '1',
    icon: '🔍',
    title: 'Browse what shelters need',
    desc: 'Find the most urgently needed items across our partner shelters.',
  },
  {
    step: '2',
    icon: '📬',
    title: 'Express your interest',
    desc: 'Click "I can help" on any item to let us know you\'d like to donate.',
  },
  {
    step: '3',
    icon: '🏠',
    title: 'Drop off at a shelter',
    desc: 'Coordinate directly with a shelter via the Shelters page to arrange drop-off.',
  },
];

export default function Supplies() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [interestedItems, setInterestedItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredSupplies = activeCategory === 'all'
    ? SUPPLIES
    : SUPPLIES.filter(s => s.category === activeCategory);

  const toggleInterest = (e, id) => {
    e.stopPropagation();
    setInterestedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PawPatternBackground intensity="community">
      <div className="supplies-page">
        <CommunityBackButton label="Gallery" fallbackPath="/community/gallery" />
        <div className="supplies-container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <header className="supplies-header">
            <div className="supplies-eyebrow" aria-hidden="true">
              <span>COMMUNITY GIVING</span>
            </div>
            <h1 className="supplies-title">Shelter Supply Wishlist</h1>
            <p className="supplies-subtitle">
              See what our partner shelters need most right now. Every donated item — from a bag of
              kibble to a toy — helps an animal waiting for a loving home.
            </p>

            <div className="supplies-header-divider" aria-hidden="true">
              <span className="supplies-divider-line" />
              <span className="supplies-divider-paw">🐾</span>
              <span className="supplies-divider-line" />
            </div>
          </header>

          {/* How it works */}
          <section className="supplies-how-section" aria-label="How to donate supplies">
            <div className="supplies-how-grid">
              {HOW_IT_WORKS.map(step => (
                <div key={step.step} className="supplies-how-card">
                  <span className="supplies-how-icon" aria-hidden="true">{step.icon}</span>
                  <div className="supplies-how-body">
                    <span className="supplies-how-step">Step {step.step}</span>
                    <h3 className="supplies-how-title">{step.title}</h3>
                    <p className="supplies-how-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Category Filters */}
          <div className="supplies-filters" role="tablist" aria-label="Supply categories">
            {SUPPLY_CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`supplies-filter-tab ${isActive ? 'supplies-filter-tab--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Supply Grid */}
          <main className="supplies-grid">
            {filteredSupplies.length === 0 ? (
              <div className="supplies-empty">
                <span role="img" aria-label="No items">📦</span>
                <h3>No items in this category</h3>
                <p>Check back soon — shelters update their wishlists regularly.</p>
              </div>
            ) : (
              filteredSupplies.map(item => {
                const urgency = URGENCY_META[item.urgency] || URGENCY_META.medium;
                const isInterested = Boolean(interestedItems[item.id]);

                return (
                  <article
                    key={item.id}
                    className="supply-card"
                    onClick={() => setSelectedItem(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Supply item: ${item.name}`}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedItem(item); }}
                  >
                    {/* Urgency Badge */}
                    <span className={`supply-urgency-badge ${urgency.className}`}>
                      {urgency.label}
                    </span>

                    <div className="supply-card-header">
                      <span className="supply-item-icon" aria-hidden="true">{item.icon}</span>
                      <div className="supply-card-meta">
                        <h3 className="supply-item-name">{item.name}</h3>
                        <span className="supply-category-chip">
                          {SUPPLY_CATEGORIES.find(c => c.id === item.category)?.label}
                        </span>
                      </div>
                    </div>

                    <p className="supply-item-desc">{item.description}</p>

                    <div className="supply-shelters">
                      <span className="supply-shelters-label">Needed at:</span>
                      <ul className="supply-shelters-list">
                        {item.shelters.map(s => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="supply-card-footer">
                      <span className="supply-donated-count">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {item.donatedCount + (isInterested ? 1 : 0)} interested
                      </span>

                      <button
                        type="button"
                        className={`supply-interest-btn ${isInterested ? 'supply-interest-btn--active' : ''}`}
                        onClick={(e) => toggleInterest(e, item.id)}
                        aria-pressed={isInterested}
                        aria-label={`${isInterested ? 'Remove interest from' : 'Express interest in donating'} ${item.name}`}
                      >
                        {isInterested ? '✓ I\'m helping!' : '🙋 I can help'}
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </main>

          {/* Drive a donation drive CTA */}
          <section className="supplies-cta-section">
            <div className="supplies-cta-card">
              <div className="supplies-cta-paw" aria-hidden="true">
                <PawPrintDoodle size={36} color="#FF6B81" opacity={0.3} />
              </div>
              <div className="supplies-cta-body">
                <h2 className="supplies-cta-title">Organise a supply drive</h2>
                <p className="supplies-cta-text">
                  Collected items at your workplace, school, or neighbourhood? Get in touch with a
                  local shelter to arrange a bulk drop-off.
                </p>
                <a href="/shelters" className="supplies-cta-btn" aria-label="Find shelters to drop off supplies">
                  Find shelters near you →
                </a>
              </div>
              <div className="supplies-cta-stats">
                <div className="supplies-stat">
                  <span className="supplies-stat-num">10</span>
                  <span className="supplies-stat-label">Items on wishlist</span>
                </div>
                <div className="supplies-stat">
                  <span className="supplies-stat-num">4</span>
                  <span className="supplies-stat-label">Partner shelters</span>
                </div>
                <div className="supplies-stat">
                  <span className="supplies-stat-num">111</span>
                  <span className="supplies-stat-label">Community helpers</span>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="supplies-disclaimer">
            This page lists items requested by shelters in the PawConnect network.
            Coordination and drop-off are handled directly with each shelter.
            No purchases are processed through this platform.
          </p>

        </div>

        {/* Item Detail Modal */}
        {selectedItem && (
          <div
            className="supplies-modal-backdrop"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Supply details: ${selectedItem.name}`}
          >
            <div className="supplies-modal-card" onClick={e => e.stopPropagation()}>
              <button
                type="button"
                className="supplies-modal-close"
                onClick={() => setSelectedItem(null)}
                aria-label="Close supply details"
              >
                ✕
              </button>

              <div className="supplies-modal-header">
                <span className="supply-item-icon supply-item-icon--large" aria-hidden="true">
                  {selectedItem.icon}
                </span>
                <div>
                  <h2 className="supplies-modal-name">{selectedItem.name}</h2>
                  <span className={`supply-urgency-badge ${URGENCY_META[selectedItem.urgency]?.className}`}>
                    {URGENCY_META[selectedItem.urgency]?.label}
                  </span>
                </div>
              </div>

              <p className="supplies-modal-desc">{selectedItem.description}</p>

              <div className="supplies-modal-section">
                <h3>Accepted brands / types</h3>
                <p>{selectedItem.acceptedBrands}</p>
              </div>

              <div className="supplies-modal-section">
                <h3>Needed at</h3>
                <ul className="supply-shelters-list supply-shelters-list--modal">
                  {selectedItem.shelters.map(s => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="supplies-modal-footer">
                <span className="supply-donated-count">
                  {selectedItem.donatedCount + (interestedItems[selectedItem.id] ? 1 : 0)} community helpers interested
                </span>
                <div className="supplies-modal-actions">
                  <button
                    type="button"
                    className={`supply-interest-btn ${interestedItems[selectedItem.id] ? 'supply-interest-btn--active' : ''}`}
                    onClick={(e) => toggleInterest(e, selectedItem.id)}
                    aria-pressed={Boolean(interestedItems[selectedItem.id])}
                  >
                    {interestedItems[selectedItem.id] ? '✓ I\'m helping!' : '🙋 I can help'}
                  </button>
                  <a
                    href="/shelters"
                    className="supplies-cta-btn supplies-cta-btn--sm"
                    aria-label="Find shelters to coordinate drop-off"
                  >
                    Find a shelter →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </PawPatternBackground>
  );
}
