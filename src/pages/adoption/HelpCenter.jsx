
import './SupportPages.css';

const faqs = [
  {
    question: 'How can I adopt a pet?',
    answer:
      'Visit the Adopt a Pet section, complete the adoption form, and provide the requested details. The shelter can then review your application.',
  },
  {
    question: 'How can I check my adoption application?',
    answer:
      'Visit your dashboard and check your application details if application tracking is available for your account.',
  },
  {
    question: 'How can I request an animal rescue?',
    answer:
      'Open the Request Rescue page and provide the animal’s location and relevant details so the rescue team can review your request.',
  },
  {
    question: 'How can I donate?',
    answer:
      'Visit the Donations section to explore the donation options currently available on PawConnect.',
  },
  {
    question: 'How do I contact PawConnect?',
    answer:
      'Use our Contact Us page or email letsconnectpaws@gmail.com with your question.',
  },
  {
    question: 'Can I report a problem with the website?',
    answer:
      'Please contact us with a description of the issue and the page where it occurred.',
  },
];

export default function HelpCenter() {
  return (
    <div className="support-page">
      <div className="support-card help-card">
        <h1>Help Center 🐾</h1>
        <p>
          Welcome to PawConnect Support. Find answers to
          common questions about adopting, rescuing, and
          supporting animals.
        </p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-item" key={index}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="help-contact">
          <h2>Still need help?</h2>
          <p>Our support team would love to hear from you.</p>
          <a href="/contact" className="support-button">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
