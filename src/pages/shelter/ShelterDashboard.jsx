
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import PawPrintDoodle from "../../components/PawPrintDoodle";
import PawPatternBackground from "../../components/PawPatternBackground";
import "./ShelterDashboard.css";

const rehabilitationData = [
  { animal: "Bruno", health: 90, behaviour: 65, training: 70 },
  { animal: "Luna", health: 100, behaviour: 90, training: 85 },
  { animal: "Milo", health: 70, behaviour: 60, training: 40 },
];

const animals = [
  {
    name: "Bruno",
    condition: "Recovering",
    health: 90,
    vaccination: "Up to date",
    medicalHistory: "Recovery monitoring",
    behaviour: 65,
    socialization: 60,
    training: 70,
    specialNeeds: "Regular recovery check-ups",
    milestones: "Initial assessment completed",
    adoptionReadiness: "Needs further review",
  },
  {
    name: "Luna",
    condition: "Adoption Ready",
    health: 100,
    vaccination: "Up to date",
    medicalHistory: "Routine health checks",
    behaviour: 90,
    socialization: 95,
    training: 85,
    specialNeeds: "No special needs listed",
    milestones: "Care plan completed",
    adoptionReadiness: "Ready for adoption",
  },
  {
    name: "Milo",
    condition: "Medical Care",
    health: 70,
    vaccination: "Review required",
    medicalHistory: "Under medical observation",
    behaviour: 60,
    socialization: 50,
    training: 40,
    specialNeeds: "Continued medical monitoring",
    milestones: "Medical care in progress",
    adoptionReadiness: "Not ready yet",
  },
];

const volunteerActivities = [
  {
    icon: "🐕",
    title: "Dog Walking",
    description: "Help shelter dogs exercise and enjoy outdoor walks.",
  },
  {
    icon: "🐾",
    title: "Socialization Sessions",
    description:
      "Spend time with animals and help them feel comfortable around people.",
  },
  {
    icon: "🏡",
    title: "Foster Care",
    description:
      "Offer a temporary home while an animal waits for adoption.",
  },
  {
    icon: "🧼",
    title: "Grooming",
    description:
      "Support basic grooming and cleanliness for shelter animals.",
  },
  {
    icon: "🚐",
    title: "Transportation",
    description:
      "Help transport animals to appointments or safe locations.",
  },
  {
    icon: "🥣",
    title: "Food & Supply Support",
    description:
      "Help shelters with food, supplies, and essential care items.",
  },
];

function ShelterDashboard() {
  const [activeReminder, setActiveReminder] = useState(null);

  return (
    <PawPatternBackground intensity="shelter">
      <div className="shelter-page">
        {/* HERO — original dashboard */}
        <section className="hero">
          <div className="hero-content">
            <p className="tag">PAWCONNECT SHELTERS</p>

            <h1>
              Give Every Animal
              <br />
              A Safe Place
            </h1>

            <p className="hero-text">
              Connect with trusted animal shelters, help animals
              in need, and make a difference in their lives.
            </p>

            <div className="buttons">
              <Link to="/shelters/list">
                <button className="primary-btn">Find a Shelter</button>
              </Link>

              <Link to="/shelters/rescue">
                <button className="secondary-btn">Request Rescue</button>
              </Link>
            </div>
          </div>
        </section>

        {/* ORIGINAL STATS */}
        <section className="stats">
          <div className="stat-card">
            <h2>12</h2>
            <p>Registered Shelters</p>
          </div>

          <div className="stat-card">
            <h2>300+</h2>
            <p>Animals Rescued</p>
          </div>

          <div className="stat-card">
            <h2>180+</h2>
            <p>Animals Adopted</p>
          </div>

          <div className="stat-card">
            <h2>75+</h2>
            <p>Active Volunteers</p>
          </div>
        </section>

        {/* ORIGINAL SHELTER / FOSTER / RESCUE CARDS */}
        <section className="services">
          <div className="section-heading">
            <p className="tag">HOW WE HELP</p>
            <h2>Making Animal Rescue Easier</h2>
            <p>
              Our shelter network connects people with animals
              that need care, rescue and a loving home.
            </p>
          </div>

          <div className="service-container">
            <div className="service-card">
              <div className="icon">🏠</div>
              <h3>Find Shelters</h3>
              <p>
                Find verified animal shelters near you and learn
                more about the animals they care for.
              </p>
              <Link to="/shelters/list">
                <button>Explore Shelters →</button>
              </Link>
            </div>

            <div className="service-card">
              <div className="icon">🐕</div>
              <h3>Foster Animals</h3>
              <p>
                Give an animal a temporary home and help them
                feel safe while they wait for adoption.
              </p>
              <Link to="/shelters/foster">
                <button>Become a Foster →</button>
              </Link>
            </div>

            <div className="service-card">
              <div className="icon">🚑</div>
              <h3>Request Rescue</h3>
              <p>
                Found an animal that needs urgent help?
                Send us a rescue request.
              </p>
              <Link to="/shelters/rescue">
                <button>Request Rescue →</button>
              </Link>
            </div>
          </div>
        </section>

        {/* REHABILITATION HUB */}
        <section className="services rehab-section">
          <div className="section-heading">
            <p className="tag">REHABILITATION HUB</p>
            <h2>Recovery &amp; Care Overview</h2>
            <p>
              Monitor each animal’s health, behaviour, training
              and progress toward adoption.
            </p>
          </div>

          {/* Individual animal profiles */}
          <div className="rehab-profile-grid">
            {animals.map((animal) => (
              <article
                className="service-card rehab-profile-card"
                key={animal.name}
              >
                <div className="rehab-profile-header">
                  <div>
                    <h3>{animal.name}</h3>
                    <p className="rehab-status">{animal.condition}</p>
                  </div>
                  <span className="rehab-animal-icon">🐾</span>
                </div>

                <p className="rehab-metric-label">
                  Physical condition — {animal.health}%
                </p>
                <progress value={animal.health} max="100" />

                <p className="rehab-metric-label">
                  Behaviour — {animal.behaviour}%
                </p>
                <progress value={animal.behaviour} max="100" />

                <p className="rehab-metric-label">
                  Training — {animal.training}%
                </p>
                <progress value={animal.training} max="100" />

                <div className="rehab-details">
                  <p>
                    <strong>Vaccination:</strong> {animal.vaccination}
                  </p>
                  <p>
                    <strong>Medical history:</strong> {animal.medicalHistory}
                  </p>
                  <p>
                    <strong>Socialization:</strong> {animal.socialization}%
                  </p>
                  <p>
                    <strong>Special needs:</strong> {animal.specialNeeds}
                  </p>
                  <p>
                    <strong>Milestones:</strong> {animal.milestones}
                  </p>
                  <p>
                    <strong>Adoption readiness:</strong>{" "}
                    {animal.adoptionReadiness}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Visual analysis chart */}
          <div className="service-card rehab-chart-card">
            <h3>Animal Rehabilitation Analysis</h3>
            <p className="rehab-chart-description">
              Health, behaviour and training progress for shelter animals.
            </p>

            <div className="rehab-chart">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={rehabilitationData}
                  margin={{ top: 15, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="animal" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="health" name="Health %" fill="#c6536b" />
                  <Bar
                    dataKey="behaviour"
                    name="Behaviour %"
                    fill="#7866d8"
                  />
                  <Bar dataKey="training" name="Training %" fill="#5b9d88" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recovery milestones */}
          <div className="service-card rehab-milestones-card">
            <h3>Recovery Milestones</h3>

            <div className="rehab-timeline">
              <div className="rehab-timeline-item completed">
                <span className="rehab-timeline-dot">✓</span>
                <div>
                  <h4>Initial assessment</h4>
                  <p>Animal condition reviewed by shelter staff.</p>
                  <span className="rehab-timeline-status">Completed</span>
                </div>
              </div>

              <div className="rehab-timeline-item completed">
                <span className="rehab-timeline-dot">✓</span>
                <div>
                  <h4>Care plan started</h4>
                  <p>Recovery support and daily monitoring initiated.</p>
                  <span className="rehab-timeline-status">Completed</span>
                </div>
              </div>

              <div className="rehab-timeline-item">
                <span className="rehab-timeline-dot">3</span>
                <div>
                  <h4>Follow-up review</h4>
                  <p>Staff review progress and next care steps.</p>
                  <span className="rehab-timeline-status">Upcoming</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical reminders */}
          <div className="section-heading rehab-subheading">
            <p className="tag">MEDICAL ATTENTION</p>
            <h2>Follow-up Reminders</h2>
            <p>Example reminders for shelter staff to review.</p>
          </div>

          <div className="rehab-reminder-grid">
            <article className="service-card">
              <div className="icon">🩺</div>
              <h3>Bruno — Follow-up</h3>
              <p>Check Bruno’s recovery and arrange a staff review.</p>
              <button
                type="button"
                onClick={() => setActiveReminder("bruno")}
              >
                Open reminder →
              </button>
            </article>

            <article className="service-card">
              <div className="icon">💉</div>
              <h3>Vaccination Review</h3>
              <p>Review vaccination records and upcoming care needs.</p>
              <button
                type="button"
                onClick={() => setActiveReminder("vaccination")}
              >
                Open reminder →
              </button>
            </article>
          </div>

          {/* Reminder details appear when a reminder is clicked */}
          {activeReminder && (
            <div className="rehab-reminder-details" role="region">
              <button
                type="button"
                className="rehab-reminder-close"
                onClick={() => setActiveReminder(null)}
                aria-label="Close reminder details"
              >
                ✕
              </button>

              {activeReminder === "bruno" ? (
                <>
                  <h3>🩺 Bruno — Follow-up Details</h3>
                  <p>
                    <strong>Status:</strong> Recovering
                  </p>
                  <p>
                    <strong>Health:</strong> 90%
                  </p>
                  <p>
                    <strong>Next step:</strong> Review Bruno’s recovery
                    progress and arrange a staff check-up.
                  </p>
                  <p>
                    <strong>Care note:</strong> Continue recovery monitoring.
                  </p>
                </>
              ) : (
                <>
                  <h3>💉 Vaccination Review</h3>
                  <p>
                    <strong>Animal:</strong> Milo
                  </p>
                  <p>
                    <strong>Vaccination status:</strong> Review required
                  </p>
                  <p>
                    <strong>Next step:</strong> Check vaccination records
                    and confirm upcoming care needs with shelter staff.
                  </p>
                  <p>
                    <strong>Care note:</strong> Milo is under medical
                    observation.
                  </p>
                </>
              )}
            </div>
          )}
        </section>

        {/* VOLUNTEER PARTICIPATION */}
        <section className="services volunteer-section">
          <div className="section-heading">
            <p className="tag">FOSTER &amp; VOLUNTEER</p>
            <h2>Help Animals Without Adopting</h2>
            <p>
              Community members can support shelters through
              practical activities and care.
            </p>
          </div>

          <div className="service-container volunteer-container">
            {volunteerActivities.map((activity) => (
              <article className="service-card" key={activity.title}>
                <div className="icon">{activity.icon}</div>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <Link to="/shelters/foster">
                  <button>Get Involved →</button>
                </Link>
              </article>
            ))}
          </div>

          <div className="volunteer-connect">
            <p>
              <strong>Community ↔ Shelters ↔ Donations ↔ Pets</strong>
            </p>
            <p>
              Volunteer care, shelter support, donations and pet adoption
              work together to help animals.
            </p>
            <Link to="/shelters/list">
              <button className="secondary-btn">
                Explore Shelter Network
              </button>
            </Link>
          </div>
        </section>

        {/* ORIGINAL CTA */}
        <section className="cta">
          <h2>
            Every Animal Deserves
            <br />
            A Safe Home
          </h2>

          <p>Your small action can make a huge difference.</p>

          <Link to="/adoption/login">
            <button className="primary-btn">Help an Animal Today</button>
          </Link>
        </section>
      </div>
    </PawPatternBackground>
  );
}

export default ShelterDashboard;
