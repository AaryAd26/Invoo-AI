import React, { useState } from 'react'
import { pricingStyles, pricingCardStyles } from '../assets/dummyStyles'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    title: "Starter",
    description: "Perfect for freelancers and small projects",
    monthlyPrice: 0,
    annualPrice: 0,
    popular: false,
    features: [
      "5 invoices per month",
      "Basic AI parsing",
      "Standard templates",
      "Email support",
      "PDF export"
    ]
  },
  {
    title: "Professional",
    description: "For growing businesses and agencies",
    monthlyPrice: 499,
    annualPrice: 399,
    popular: true,
    features: [
      "Unlimited invoices",
      "Advanced AI parsing",
      "Custom branding",
      "Priority support",
      "Advanced analytics",
      "Team collaboration (3 members)",
      "API access"
    ]
  },
  {
    title: "Enterprise",
    description: "For large organizations with custom needs",
    monthlyPrice: 1499,
    annualPrice: 1199,
    popular: false,
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Custom workflows",
      "Dedicated account manager",
      "SLA guarantee",
      "White-label solutions",
      "Advanced security"
    ]
  }
]

const PricingCard = ({ plan, isAnnual }) => {
  const { openSignIn } = useClerk()
  const { isSignedIn } = useUser()
  const navigate = useNavigate()

  const handleClick = () => {
    if (isSignedIn) {
      navigate('/app/dashboard')
    } else {
      openSignIn()
    }
  }

  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice

  return (
    <div className={`${pricingCardStyles.card} ${plan.popular ? pricingCardStyles.cardPopular : pricingCardStyles.cardRegular}`}>
      {plan.popular && (
        <div className={pricingCardStyles.popularBadge}>
          <span className={pricingCardStyles.popularBadgeContent}>Most Popular</span>
        </div>
      )}
      <div className={pricingCardStyles.gradientOverlay}></div>
      <div className={pricingCardStyles.animatedBorder}></div>

      <div className={pricingCardStyles.content}>
        <div className={pricingCardStyles.header}>
          <h3 className={`${pricingCardStyles.title} ${plan.popular ? pricingCardStyles.titlePopular : pricingCardStyles.titleRegular}`}>
            {plan.title}
          </h3>
          <p className={pricingCardStyles.description}>{plan.description}</p>
        </div>

        <div className={pricingCardStyles.priceContainer}>
          <div className={pricingCardStyles.priceWrapper}>
            <span className={`${pricingCardStyles.price} ${plan.popular ? pricingCardStyles.pricePopular : pricingCardStyles.priceRegular}`}>
              ₹{price.toLocaleString()}
            </span>
            <span className={pricingCardStyles.period}>/month</span>
          </div>
          {isAnnual && plan.monthlyPrice > 0 && (
            <div className={pricingCardStyles.annualBadge}>
              Save 20%
            </div>
          )}
        </div>

        <ul className={pricingCardStyles.featuresList}>
          {plan.features.map((feature, index) => (
            <li key={index} className={pricingCardStyles.featureItem}>
              <div className={`${pricingCardStyles.featureIcon} ${plan.popular ? pricingCardStyles.featureIconPopular : pricingCardStyles.featureIconRegular}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className={pricingCardStyles.featureText}>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleClick}
          className={`${pricingCardStyles.ctaButton} ${plan.popular ? pricingCardStyles.ctaButtonPopular : pricingCardStyles.ctaButtonRegular}`}
        >
          <span className={`${pricingCardStyles.ctaButtonText} ${plan.popular ? pricingCardStyles.ctaButtonTextPopular : pricingCardStyles.ctaButtonTextRegular}`}>
            Sign in to get started
          </span>
        </button>
      </div>

      <div className={pricingCardStyles.cornerAccent1}></div>
      <div className={pricingCardStyles.cornerAccent2}></div>
    </div>
  )
}

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="pricing" className={pricingStyles.section}>
      <div className={pricingStyles.bgElement1}></div>
      <div className={pricingStyles.bgElement2}></div>
      <div className={pricingStyles.bgElement3}></div>

      <div className={pricingStyles.container}>
        <div className={pricingStyles.headerContainer}>
          <div className={pricingStyles.badge}>
            <div className={pricingStyles.badgeDot}></div>
            <span className={pricingStyles.badgeText}>Transparent Pricing</span>
          </div>
          <h2 className={pricingStyles.title}>
            Simple,{' '}
            <span className={pricingStyles.titleGradient}>Fair Pricing</span>
          </h2>
          <p className={pricingStyles.description}>
            Start free, upgrade as you grow. No hidden fees, no surprise charges.
          </p>

          <div className={pricingStyles.billingToggle}>
            <button
              onClick={() => setIsAnnual(false)}
              className={`${pricingStyles.billingButton} ${!isAnnual ? pricingStyles.billingButtonActive : pricingStyles.billingButtonInactive}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`${pricingStyles.billingButton} ${isAnnual ? pricingStyles.billingButtonActive : pricingStyles.billingButtonInactive}`}
            >
              Annual
              <span className={pricingStyles.billingBadge}>Save 20%</span>
            </button>
          </div>
        </div>

        <div className={pricingStyles.grid}>
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>

        <div className={pricingStyles.additionalInfo}>
          <div className={pricingStyles.featuresCard}>
            <h3 className={pricingStyles.featuresTitle}>All plans include</h3>
            <div className={pricingStyles.featuresGrid}>
              {["Secure cloud storage", "Mobile-friendly interface", "Automatic backups", "Real-time notifications", "Multi-currency support", "Tax calculation"].map((item, i) => (
                <div key={i} className={pricingStyles.featureItem}>
                  <div className={pricingStyles.featureDot}></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={pricingStyles.faqCta}>
            <p className={pricingStyles.faqText}>Have questions about pricing?</p>
            <a href="mailto:support@invoo.com" className={pricingStyles.contactLink}>
              Contact our sales team →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing