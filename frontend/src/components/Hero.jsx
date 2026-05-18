import React from 'react'
import { heroStyles } from '../assets/dummyStyles'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const { openSignUp } = useClerk()
  const { isSignedIn } = useUser()
  const navigate = useNavigate()
  const clerk = useClerk();

  const handleSignedInPrimary = () => {
    navigate("/app/create-invoice");
  }

  const  handleSignOutPrimary = () => {
    try {
      if (clerk && typeofClerk.openSignUp === "function"){
        clerk.openSignUp();
      }
    } catch (error) {
      console.error("failed to Open the clerk signedup model:", err)
    }
  }
   
  const handleGetStarted = () => { 
    if (isSignedIn) {
      navigate('/app/dashboard')
    } else {
      openSignUp()
    }
  }

  return (
    <section className={heroStyles.section}>
      <div className={heroStyles.bgElement1}></div>
      <div className={heroStyles.bgElement2}></div>
      <div className={heroStyles.bgElement3}></div>
      <div className={heroStyles.gridPattern}></div>

      <div className={heroStyles.container}>
        <div className={heroStyles.grid}>

          {/* Left Content */}
          <div className={heroStyles.content}>
            <div className={heroStyles.contentInner}>
              <div className={heroStyles.badge}>
                <div className={heroStyles.badgeDot}></div>
                <span className={heroStyles.badgeText}>AI-Powered Invoicing Platform</span>
              </div>

              <h1 className={heroStyles.heading}>
                <span className={heroStyles.headingLine1}>Professional</span>
                <br />
                <span className={heroStyles.headingLine2}>Invoices</span>
                <br />
                <span className={heroStyles.headingLine3}>in Seconds</span>
              </h1>

              <p className={heroStyles.description}>
                Transform conversations into professional invoices with AI.{" "}
                <span className={heroStyles.descriptionHighlight}>Paste any text</span>{" "}
                and watch AI extract items, calculate totals, and generate ready-to-send invoices instantly.
              </p>
            </div>

            <div className={heroStyles.ctaContainer}>
              <button onClick={handleGetStarted} className={heroStyles.primaryButton}>
                <div className={heroStyles.primaryButtonOverlay}></div>
                <span className={heroStyles.primaryButtonText}>Start Creating Free</span>
                <svg
                    className={heroStyles.primaryButtonIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg> 
              </button>

              <button className={heroStyles.secondaryButton}>
                <svg className={heroStyles.secondaryButtonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                Explore Features
              </button>
            </div>

            <div className={heroStyles.featuresGrid}>
              <div className={heroStyles.featureItem}>
                <div className={heroStyles.featureIcon}>🤖</div>
                <div className={heroStyles.featureText}>
                  <p className={heroStyles.featureLabel}>AI-Powered</p>
                  <p className={heroStyles.featureDesc}>Smart text parsing</p>
                </div>
              </div>
              <div className={heroStyles.featureItem}>
                <div className={heroStyles.featureIcon}>⚡</div>
                <div className={heroStyles.featureText}>
                  <p className={heroStyles.featureLabel}>Lightning Fast</p>
                  <p className={heroStyles.featureDesc}>Generate in seconds</p>
                </div>
              </div>
              <div className={heroStyles.featureItem}>
                <div className={heroStyles.featureIcon}>📄</div>
                <div className={heroStyles.featureText}>
                  <p className={heroStyles.featureLabel}>Professional</p>
                  <p className={heroStyles.featureDesc}>Branded templates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Demo Card */}
          <div className={heroStyles.demoColumn}>
            <div className={heroStyles.demoFloating1}></div>
            <div className={heroStyles.demoFloating2}></div>
            <div className={heroStyles.demoContainer}>
              <div className={heroStyles.demoCard}>
                <div className={heroStyles.cardHeader}>
                  <div className={heroStyles.cardLogoContainer}>
                    <div className={heroStyles.cardLogo}>AC</div>
                    <div className={heroStyles.cardClient}>
                      <p className={heroStyles.cardClientName}>Acme Corporation</p>
                      <p className={heroStyles.cardClientGst}>GST: 27AAPL1234G1ZY</p>
                    </div>
                  </div>
                  <div className={heroStyles.cardInvoiceInfo}>
                    <p className={heroStyles.cardInvoiceLabel}>INVOICE</p>
                    <p className={heroStyles.cardInvoiceNumber}>#INV-1024</p>
                    <p className={heroStyles.cardStatus}>Paid</p>
                  </div>
                </div>

                <div className={heroStyles.itemsContainer}>
                  <div className={heroStyles.itemRow}>
                    <div className="flex items-center gap-3">
                      <div className={heroStyles.itemDot}></div>
                      <span className={heroStyles.itemDescription}>Website Design & Development</span>
                    </div>
                    <span className={heroStyles.itemAmount}>₹15,000</span>
                  </div>
                  <div className={heroStyles.itemRow}>
                    <div className="flex items-center gap-3">
                      <div className={heroStyles.itemDot}></div>
                      <span className={heroStyles.itemDescription}>Consultation (2 hours)</span>
                    </div>
                    <span className={heroStyles.itemAmount}>₹3,000</span>
                  </div>
                  <div className={heroStyles.itemRow}>
                    <div className="flex items-center gap-3">
                      <div className={heroStyles.itemDot}></div>
                      <span className={heroStyles.itemDescription}>Premium Hosting Setup</span>
                    </div>
                    <span className={heroStyles.itemAmount}>₹2,500</span>
                  </div>
                </div>

                <div className={heroStyles.calculationContainer}>
                  <div className={heroStyles.calculationRow}>
                    <span className={heroStyles.calculationLabel}>Subtotal</span>
                    <span className={heroStyles.calculationValue}>₹20,500</span>
                  </div>
                  <div className={heroStyles.calculationRow}>
                    <span className={heroStyles.calculationLabel}>GST (18%)</span>
                    <span className={heroStyles.calculationValue}>₹3,240</span>
                  </div>
                  <div className={heroStyles.totalRow}>
                    <span className={heroStyles.totalLabel}>Total Amount</span>
                    <span className={heroStyles.totalValue}>₹23,740</span>
                  </div>
                </div>

                <div className={heroStyles.actionButtons}>
                  <button className={heroStyles.previewButton}>
                    <span className={heroStyles.previewButtonText}>Preview</span>
                  </button>
                  <button className={heroStyles.sendButton}>
                    <span className={heroStyles.sendButtonText}>Send Invoice</span>
                  </button>
                </div>
              </div>

              <div className={heroStyles.aiIndicator}>
                <div className={heroStyles.aiIndicatorContent}>
                  <div className={heroStyles.aiIndicatorDot}></div>
                  <span>AI parsed from: </span>
                  <span className={heroStyles.aiIndicatorText}>"Invoice for web design — ₹15,000..."</span>
                </div>
              </div>

              <div className={heroStyles.cornerAccent1}></div>
              <div className={heroStyles.cornerAccent2}></div>
              <div className={heroStyles.cardBackground}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={heroStyles.scrollIndicator}>
        <div className={heroStyles.scrollContainer}>
          <span className={heroStyles.scrollText}>Scroll to explore</span>
          <div className={heroStyles.scrollBar}>
            <div className={heroStyles.scrollDot}></div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero