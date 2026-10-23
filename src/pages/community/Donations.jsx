import { useState } from 'react'
import CommunityBackButton from '../../components/CommunityBackButton'
import PawPatternBackground from '../../components/PawPatternBackground'
import donationQR from '../../assets/donationQR.jpeg';
import './Donations.css'

const DONATION_AMOUNTS = [100, 250, 500, 1000, 2500]

const IMPACT_ITEMS = [
  { amount: '₹100', text: 'Helps provide food' },
  { amount: '₹500', text: 'Supports vaccinations and medical care' },
  { amount: '₹1,000', text: 'Helps provide shelter and daily care' },
  { amount: '₹2,500', text: 'Supports recovery and rehabilitation' },
]

function formatAmount(amount) {
  return Number(amount || 0).toLocaleString('en-IN')
}

export default function Donations() {
  const [selectedAmount, setSelectedAmount] = useState(500)
  const [customAmount, setCustomAmount] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  const isCustomAmount = selectedAmount === 'custom'
  const displayAmount = isCustomAmount ? customAmount : selectedAmount

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount)
    if (amount !== 'custom') {
      setCustomAmount('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <PawPatternBackground
      intensity="adoption"
      className="paw-pattern--butter"
    >
      <div className="donations-page">
        <CommunityBackButton label="Gallery" fallbackPath="/community/gallery" />
        <div className="donations-container">
        <header className="donations-header">
          <span className="donations-eyebrow">COMMUNITY GIVING</span>
          <h1>Help Us Give Them a Better Tomorrow</h1>
          <p>
            Your support helps shelters provide food, medical care, vaccinations, safe shelter,
            and rehabilitation for animals waiting for a fresh start.
          </p>
        </header>

        <div className="donations-main-grid">
          <section className="donation-panel" aria-labelledby="donation-form-title">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">MAKE A DIFFERENCE</span>
                <h2 id="donation-form-title">Choose your gift</h2>
              </div>
            </div>

            <div className="amount-options" aria-label="Donation amount">
              {DONATION_AMOUNTS.map((amount) => (
                <button
                  className={`amount-option ${selectedAmount === amount ? 'amount-option--active' : ''}`}
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  type="button"
                  aria-pressed={selectedAmount === amount}
                >
                  ₹{formatAmount(amount)}
                </button>
              ))}
              <button
                className={`amount-option ${isCustomAmount ? 'amount-option--active' : ''}`}
                onClick={() => handleAmountSelect('custom')}
                type="button"
                aria-pressed={isCustomAmount}
              >
                Custom amount
              </button>
            </div>

            <form className="donation-form" onSubmit={handleSubmit}>
              <div className="selected-gift" aria-live="polite">
                <span>Your donation</span>
                <strong>{displayAmount ? `₹${formatAmount(displayAmount)}` : 'Choose an amount'}</strong>
              </div>

              {isCustomAmount && (
                <label className="donation-field">
                  Custom amount
                  <div className="input-with-prefix">
                    <span>₹</span>
                    <input
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={(event) => setCustomAmount(event.target.value)}
                      placeholder="Enter an amount"
                      required
                    />
                  </div>
                </label>
              )}

              <div className="donation-field-row">
                <label className="donation-field">
                  Your name
                  <input type="text" name="name" placeholder="Enter your name" required />
                </label>
                <label className="donation-field">
                  Email address
                  <input type="email" name="email" placeholder="you@example.com" required />
                </label>
              </div>

              <label className="donation-field">
                A message (optional)
                <textarea name="message" rows="3" placeholder="Leave a note for the shelter community" />
              </label>

              <button className="donate-button" type="submit">
                Donate Now <span aria-hidden="true">→</span>
              </button>

              {formSubmitted && (
                <div className="donation-success" role="status">
                  <strong>Thank you for supporting PawConnect!</strong>
                  <span>This is a frontend confirmation. Payment integration is coming soon.</span>
                </div>
              )}
            </form>
          </section>

          <aside className="upi-panel" aria-labelledby="upi-title">
            <span className="panel-kicker">ANOTHER WAY TO HELP</span>
            <h2 id="upi-title">Prefer UPI? Scan to Donate</h2>
            <p>Use the QR code when payment integration is available.</p>
            <div className="demo-qr">
              <img
                src={donationQR}
                alt="Scan to donate to PawConnect"
                className="donation-qr-image"
              />
            </div>
            <span className="qr-label">
              Scan with any supported UPI app to donate
            </span>
          </aside>
        </div>

        <section className="impact-section" aria-labelledby="impact-title">
          <div className="section-heading">
            <span className="panel-kicker">SMALL GIFTS, BIG HEARTS</span>
            <h2 id="impact-title">Your Donation Makes a Difference</h2>
            <p>Every contribution can help create a safer, kinder day for an animal in need.</p>
          </div>
          <div className="impact-grid">
            {IMPACT_ITEMS.map((item) => (
              <article className="impact-card" key={item.amount}>
                <div>
                  <strong>{item.amount}</strong>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="transparency-note" aria-label="Donation transparency">
          <div>
            <h2>Support with confidence</h2>
            <p>Donations support the animals and shelters listed on PawConnect. We will share payment details here when our donation integration is ready.</p>
          </div>
        </section>
        </div>
      </div>
    </PawPatternBackground>
  )
}
