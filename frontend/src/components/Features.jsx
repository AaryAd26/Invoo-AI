import React from 'react'
import { featuresStyles } from '../assets/dummyStyles'


const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    title: "AI Invoice Parsing",
    description: "Paste freeform text and let our advanced AI extract client details, line items, and totals into a perfectly formatted draft invoice in seconds."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Smart Email Reminders",
    description: "Generate professional, context-aware reminder emails with one click — complete with intelligent tone selection and personalized messaging."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: "Professional PDF Export",
    description: "Generate high-quality, brand-consistent PDF invoices with reliable email delivery and comprehensive tracking of all sent communications."
  }
]

const Features = () => {
  return (
    <section id="feature" className={featuresStyles.section}>
      <div className={featuresStyles.backgroundBlob1}></div>
      <div className={featuresStyles.backgroundBlob2}></div>
      <div className={featuresStyles.backgroundBlob3}></div>

      <div className={featuresStyles.container}>
        <div className={featuresStyles.headerContainer}>
          <div className={featuresStyles.badge}>
            <div className={featuresStyles.badgeDot}></div>
            <span className={featuresStyles.badgeText}>Powerful Features</span>
          </div>
          <h2 className={featuresStyles.title}>
            Built for{' '}
            <span className={featuresStyles.titleGradient}>Speed & Clarity</span>
          </h2>
          <p className={featuresStyles.subtitle}>
            A minimal, intelligent interface that focuses on what truly matters — create,
            send, and track invoices effortlessly while maintaining professional excellence.
          </p>
        </div>

        <div className={featuresStyles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={featuresStyles.featureCard}>
              <div className={featuresStyles.featureCardGradient}></div>
              <div className={featuresStyles.featureCardBorder}></div>
              <div className={featuresStyles.featureCardContent}>
                <div className={featuresStyles.featureCardIconContainer}>
                  {feature.icon}
                </div>
                <div className={featuresStyles.featureCardTextContainer}>
                  <h3 className={featuresStyles.featureCardTitle}>{feature.title}</h3>
                  <p className={featuresStyles.featureCardDescription}>{feature.description}</p>
                  <div className={featuresStyles.featureCardCta}>
                    <span className={featuresStyles.featureCardCtaText}>Learn more</span>
                    <svg className={featuresStyles.featureCardCtaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={featuresStyles.bottomCtaContainer}>
          <button className={featuresStyles.bottomCtaButton}>
            <span>{featuresStyles.bottomCtaButtonText}</span>
            <svg className={featuresStyles.bottomCtaButtonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Features