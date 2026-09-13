import { Link } from 'react-router-dom'
import logoImg from '../assets/pawconnect-logo.png'
import './footer.css'

const linkClassName = 'paw-footer-link'

function FooterLink({ to, children }) {
	if (!to) {
		return <span className={`${linkClassName} paw-footer-link--inactive`}>{children}</span>
	}

	return <Link className={linkClassName} to={to}>{children}</Link>
}

export default function Footer() {
	return (
		<footer className="paw-footer">
			<div className="paw-footer-container">
				<section className="paw-footer-brand">
					<Link to="/" className="paw-footer-logo-link" aria-label="PawConnect home">
						<img src={logoImg} alt="PawConnect" className="paw-footer-logo" />
					</Link>
					<p className="paw-footer-tagline">Connecting paws with people who care.</p>
					<p className="paw-footer-description">
						PawConnect brings adopters, foster families, volunteers, veterinarians, and animal
						shelters together to make pet adoption and rescue simpler.
					</p>
					<div className="paw-footer-socials" aria-label="Social links">
						<FooterLink>Instagram</FooterLink>
						<FooterLink>Facebook</FooterLink>
						<FooterLink>LinkedIn</FooterLink>
					</div>
				</section>

				<section className="paw-footer-group" aria-labelledby="footer-quick-links">
					<h2 id="footer-quick-links">QUICK LINKS</h2>
					<FooterLink to="/">Home</FooterLink>
					<FooterLink to="/pets">Find Pets</FooterLink>
					<FooterLink to="/shelters">Shelters</FooterLink>
					<FooterLink to="/community">Community</FooterLink>
					<FooterLink to="/community/gallery">Gallery</FooterLink>
					<FooterLink to="/community/reviews">Reviews</FooterLink>
					<FooterLink to="/community/donations">Donate</FooterLink>
				</section>

				<section className="paw-footer-group" aria-labelledby="footer-get-involved">
					<h2 id="footer-get-involved">GET INVOLVED</h2>
					<FooterLink to="/adoption">Adopt a Pet</FooterLink>
					<FooterLink to="/shelters/foster">Become a Foster</FooterLink>
					<FooterLink>Volunteer</FooterLink>
					<FooterLink to="/community/donations">Donate</FooterLink>
					<FooterLink to="/community/gallery">Share a Story</FooterLink>
				</section>

				<section className="paw-footer-group" aria-labelledby="footer-support">
					<h2 id="footer-support">SUPPORT</h2>
					<FooterLink>Contact Us</FooterLink>
					<FooterLink>Help Center</FooterLink>
					<FooterLink>Privacy Policy</FooterLink>
					<FooterLink>Terms of Service</FooterLink>
				</section>

				<section className="paw-footer-group paw-footer-contact" aria-labelledby="footer-contact">
					<h2 id="footer-contact">CONTACT</h2>
					<a className={linkClassName} href="mailto:support@pawconnect.in">support@pawconnect.in</a>
					<span className="paw-footer-contact-detail">Tricity, Punjab</span>
				</section>
			</div>

			<div className="paw-footer-bottom">
				<p>© 2026 PawConnect. Made with <span aria-hidden="true">♥</span> for pets and the people who care for them.</p>
			</div>
		</footer>
	)
}
