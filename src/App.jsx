import { useState, lazy, Suspense, memo } from 'react'
import Aurora from './component/Aurora'
import ShinyText from './component/ShinyText'
import Dock from './component/Dock'
import PixelCard from './component/PixelCard'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'motion/react'

// Lazy load heavy components for better initial load
const GooeyNav = lazy(() => import('./component/GooeyNav'))

// Simple loading placeholder
const CardPlaceholder = () => (
  <div className="w-[300px] h-[400px] bg-white/5 rounded-[25px] animate-pulse flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
  </div>
)

const NavPlaceholder = () => (
  <div className="h-12 w-[500px] max-w-full bg-white/10 rounded-full animate-pulse" />
)

// Simple Image Card Component - using native lazy loading for performance
const ImageCard = memo(({ item, index }) => (
  <a
    key={index}
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-200 group"
  >
    <div className="aspect-video overflow-hidden bg-white/5">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
      <p className="text-white/70 text-sm">{item.description}</p>
    </div>
  </a>
))
ImageCard.displayName = 'ImageCard'

// Animated Section Component for scroll animations
const AnimatedSection = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Hover Button Component with glow effect
const HoverButton = ({ children, href, target, rel, variant = 'default' }) => {
  const variants = {
    default: {
      bg: 'bg-white/10',
      hoverBg: 'rgba(255,255,255,0.2)',
      border: 'border-white/20',
      glow: 'rgba(255,255,255,0.3)'
    },
    primary: {
      bg: 'bg-cyan-500/20',
      hoverBg: 'rgba(92,230,255,0.3)',
      border: 'border-cyan-400/50',
      glow: 'rgba(92,230,255,0.5)'
    }
  };

  const style = variants[variant];

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={`relative px-6 py-3 ${style.bg} border ${style.border} rounded-full font-medium overflow-hidden`}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 25px ${style.glow}, 0 0 50px ${style.glow}`,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
};

// Mobile Navigation Component
const MobileNav = ({ items, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 top-16 bg-primary/95 backdrop-blur-lg z-40 md:hidden"
      >
        <nav className="flex flex-col items-center gap-4 py-8">
          {items.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              onClick={onClose}
              className="text-lg text-white/80 hover:text-cyan-400 transition-colors py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
);

// Contact Dock Items
const contactDockItems = [
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: 'Email',
    onClick: () => window.location.href = 'mailto:fanzirfan@proton.me'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    onClick: () => window.open('https://github.com/fanzirfan', '_blank')
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: 'X',
    onClick: () => window.open('https://x.com/fanzirfan_', '_blank')
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: 'Instagram',
    onClick: () => window.open('https://instagram.com/fanzirfan_', '_blank')
  }
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Project", href: "#websites" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  { name: "Photoshop", iconName: "mage:photoshop" },
  { name: "Illustrator", iconName: "mage:illustrator" },
  { name: "Affinity Designer", iconName: "streamline-logos:affinity-logo-block" },
  { name: "Google Anigravity", iconName: "material-symbols:antigravity" },
  { name: "HTML", iconName: "flowbite:html-solid" },
  { name: "CSS", iconName: "flowbite:css-solid" },
  { name: "JavaScript", iconName: "fa-brands:js-square" },
  { name: "Node.js", iconName: "la:node" },
  { name: "React", iconName: "flowbite:react-solid" },
  {name: "Next.js", iconName: "akar-icons:nextjs-fill"},
  { name: "Vue.js", iconName: "teenyicons:vue-solid" },
  { name: "Cloudflare", iconName: "cib:cloudflare" },
  { name: "Firebase", iconName: "teenyicons:firebase-solid" },
  { name: "GitHub", iconName: "ri:github-fill" },
  { name: "Git", iconName: "bi:git" },
  { name: "Bun", iconName: "simple-icons:bun" },
];

const portfolioItems = [
  { title: "ReBirthx Esports", description: "During the pandemic, I joined a Call of Duty Mobile game team and managed their Instagram account.", image: "/portfolio/re.webp", link: "https://photos.google.com/share/AF1QipPib9JQjF9KxBJS_Um5VW8zhcx7hpUbuEEWisn-RtKBe-jrporItNLJvABtAN1x3Q?key=ZllhRE92Vzg3QUZELU9pVm1aUXlWd3JhbWwxQzFn" },
  { title: "Chips From Hells", description: "A project I completed for the Competency Certification Exam.", image: "/portfolio/cfh.webp", link: "https://photos.google.com/share/AF1QipMt8TII9xURBVmUoyXhVtV_8BktFstLVvON5TmAwS5Ned3HWlodMzznKstfiE02fQ?key=T2hqZGw2b2NvNnl2cklMNnJhTlpiRUR1QllCR1BR" },
  { title: "Fanz GG Store", description: "My gaming shop providing various digital products at affordable prices.", image: "/portfolio/fanz.webp", link: "https://photos.google.com/share/AF1QipMIn7y9Nh0gh5BkaIzMw9AQIVbyJ9wEar4SH92itPf87Ko8RGt1KGOh4qnaACO_5A?key=RHcxRGR5cEpxSmUzNUZuY1Q5YjU1YmVIZ0pBcVFn" },
  { title: "My Personal Designs", description: "Non-project designs.", image: "/portfolio/other.webp", link: "https://photos.google.com/share/AF1QipPZTeXNTDIilnZtntrlgXgx9fXOj401icca-L2yvuCCfYb398ZEjBxSplFoEFTDUQ?key=b2wta05Uci1rQS1VY2xuNEFOZm1zZnRYUDBXd0Rn" },
  { title: "OrCa Gaming", description: "Created Logo, Header, Thumbnail and Live streaming assets.", image: "/portfolio/OrCa.webp", link: "https://www.tiktok.com/@northnvodka/" },
  { title: "MSC x EVOS", description: "Design for MSC x EVOS event.", image: "/portfolio/MSC.webp", link: "#" },
  { title: "AB Project", description: "Other design projects.", image: "/portfolio/AB.webp", link: "#" },
];

const websiteItems = [
  { title: "SendTheLink", description: "A platform to share links easily and quickly.", image: "/web/sendthelink.webp", link: "https://sendthelink.vercel.app/" },
  { title: "Kita Tidak Akan Asing", description: "A card game to get to know each other.", image: "/web/kita.webp", link: "https://kita.fan.my.id/" },
  { title: "Mooncrest Leaderboard", description: "Leaderboard system for the Mooncrest community.", image: "/web/mooncrest.webp", link: "https://leaderboard.mooncrest.my.id/" },
  { title: "MyFinance", description: "Personal finance tracking app to manage your money easily.", image: "/web/myfinance.webp", link: "https://duit.fan.my.id/" },
  { title: "Cloudflare Email Panel", description: "Email management panel powered by Cloudflare.", image: "/web/email.webp", link: "https://app.madshin.eu.org/" },
  { title: "Koje Archive", description: "Digital archive and file storage system.", image: "/web/koje-archive.webp", link: "https://arsip.manji.eu.org/" },
];

const historyEducation = [
  {
    title: "SMK Negri 7 Jakarta",
    period: "July 2019 - July 2022",
    items: [
      "Major: Multimedia",
      "GPA: 83.78",
      "Certificate: Level II Multimedia Competency Certificate issued by BNSP"
    ]
  }
];

const historyWork = [
  {
    title: "PT. Falcon Solusi Cakrawala",
    period: "February 2021 - April 2021",
    items: [
      "Created greeting card posters for social media purposes",
      "Installed Windows operating systems and created backup and sync"
    ]
  },
  {
    title: "Entrepreneur - Fanz GG Store",
    period: "August 2022 - July 2024",
    items: [
      "Created price list designs for game top-ups like Mobile Legends, Free Fire, and Honor Of Kings.",
      "Conducted price research from various game stores to find competitive prices for customers.",
      "Researched suitable payment methods to simplify transactions, including using QRIS with 0% MDR for higher net income.",
      "Besides game top-ups, I also offered commissions for graphic design needs including TikTok Live Streaming layouts and YouTube Channel covers."
    ]
  }
];

const blogItems = [
  { title: "YouTube ReVanced", description: "Modified YouTube using ReVanced.", image: "/blog/YTB.webp", link: "https://blog.fan.my.id/revanced/revanced-official" },
  { title: "Internet Download Manager", description: "Download manager software for Windows 10.", image: "/blog/IDM.webp", link: "https://blog.fan.my.id/windows/internet-download-manager-idm" },
];

// Timeline Item Component
const TimelineItem = ({ period, title, items, isLast }) => (
  <div className="relative pl-8 pb-8">
    {/* Timeline line */}
    {!isLast && <div className="absolute left-[11px] top-3 w-0.5 h-full bg-cyan-500/30" />}
    {/* Timeline dot */}
    <div className="absolute left-0 top-1 w-6 h-6 bg-cyan-500 rounded-full border-4 border-primary" />
    {/* Content */}
    <div>
      <p className="text-sm text-cyan-400 mb-1">{period}</p>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <ul className="list-disc list-inside text-white/70 space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm">{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [formMessage, setFormMessage] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.target);
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        setFormMessage('Thank you! Your message has been sent successfully.');
        e.target.reset();
        setTimeout(() => {
          setFormStatus('idle');
          setFormMessage('');
        }, 5000);
      } else {
        setFormStatus('error');
        setFormMessage('Something went wrong. Please try again.');
      }
    } catch {
      setFormStatus('error');
      setFormMessage('Network error. Please check your connection.');
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#0c2b4e", "#1a3d64", "#1d546c"]}
          amplitude={1}
          blend={0.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4">
          {/* Mobile Header */}
          <div className="flex md:hidden justify-between items-center px-4">
            <a href="#home" className="text-lg font-bold text-white">Muhammad Irfan</a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center">
            <div className="px-4 py-2">
              <Suspense fallback={<NavPlaceholder />}>
                <GooeyNav
                  items={navItems}
                  particleCount={15}
                  particleDistances={[90, 10]}
                  particleR={100}
                  initialActiveIndex={0}
                  animationTime={600}
                  timeVariance={300}
                  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
              </Suspense>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <MobileNav
          items={navItems}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-20 pb-20">
          <div className="section-container w-full">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              {/* Left Content */}
              <div className="flex-1 max-w-xl">
                {/* Quote Badge */}
                <div className="glass-card inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 mb-6 sm:mb-8">
                  <Icon icon="twemoji:watermelon" className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                  <span className="text-white/80 text-xs sm:text-sm md:text-base">"You don't have to be Muslim to support Palestine, you just have to be human."</span>
                </div>

                {/* Name */}
                <p className="text-lg sm:text-xl md:text-2xl text-white/60 mb-2">Hi I'm</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  <ShinyText
                    text="Muhammad Irfan"
                    speed={2}
                    delay={0}
                    color="#b5b5b5"
                    shineColor="#ffffff"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                  />
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-white/70 mb-6 sm:mb-8">
                  A passionate graphic designer and vibe coder, leveraging AI to build modern websites and applications while crafting high-quality visual experiences through innovative and creative solutions.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <HoverButton
                    href="https://drive.google.com/file/d/1hBku2sugUF3Z6zB21cNy4Tl2l4iUlY6h/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                  >
                    Download CV
                  </HoverButton>
                  <HoverButton href="#portfolio">
                    Explore My Projects
                  </HoverButton>
                </div>
              </div>

              {/* Right - Profile Card */}
              <div className="flex justify-center md:justify-end flex-shrink-0">
                <PixelCard
                  variant="blue"
                  gap={5}
                  speed={25}
                  colors="#0ea5e9,#38bdf8,#7dd3fc,#5ce6ff"
                  className="!w-[280px] !h-[380px] bg-primary/80"
                >
                  {/* Profile Content Overlay */}
                  <div className="absolute inset-0 flex flex-col z-10">
                    {/* Top: Name & Title */}
                    <div className="text-center pt-4 px-4">
                      <h3 className="text-lg md:text-xl font-bold text-white">Muhammad Irfan</h3>
                      <p className="text-xs text-cyan-300">Graphic Designer & Vibe Coder</p>
                    </div>

                    {/* Photo fills the rest */}
                    <div className="flex-1 relative mt-3 overflow-hidden">
                      <img
                        src="/profil.webp"
                        alt="Muhammad Irfan"
                        className="w-full h-full object-cover object-top"
                        loading="eager"
                      />

                      {/* Gradient overlay at bottom for button */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                        <div className="flex items-center justify-center gap-2 text-xs mb-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-white/90">@fanzirfan • Online</span>
                        </div>
                        <button
                          onClick={() => window.location.href = '#contact'}
                          className="w-full py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-xl text-white text-sm font-semibold transition-all"
                        >
                          Contact Me
                        </button>
                      </div>
                    </div>
                  </div>
                </PixelCard>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <AnimatedSection>
          <section id="about" className="section-container">
            <h2 className="section-title text-center">About Me</h2>
            <div className="max-w-4xl mx-auto glass-card p-8">
              <p className="text-white/80 leading-relaxed text-center">
                Hi, I'm Muhammad Irfan, you can call me Irfan. I'm an alumni of SMKN 7 Jakarta with a major in Multimedia. I chose multimedia because I have a passion for graphic design. During my 3 years at SMKN 7 Jakarta, I received a competency certificate issued by BNSP. For me, graphic design is a medium to express ideas and positive aspirations. I learned graphic design self-taught. I hope my skills in graphic design can become my profession.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Skills Section - Icons Only */}
        <AnimatedSection delay={0.1}>
          <section id="skills" className="section-container">
            <h2 className="section-title text-center">Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center group relative"
                  title={skill.name}
                >
                  <Icon icon={skill.iconName} className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                  <span className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[10px] sm:text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Websites Section - With Images */}
        <section id="websites" className="section-container">
          <h2 className="section-title text-center">My Websites</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {websiteItems.map((item, index) => (
              <ImageCard key={index} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="section-container">
          <h2 className="section-title text-center">Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <ImageCard key={index} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* History Section - Timeline Design with Glass Border */}
        <section id="experience" className="section-container">
          <h2 className="section-title text-center">Experience</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">Education</h3>
              {historyEducation.map((item, index) => (
                <TimelineItem
                  key={index}
                  period={item.period}
                  title={item.title}
                  items={item.items}
                  isLast={index === historyEducation.length - 1}
                />
              ))}
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">Work Experience</h3>
              {historyWork.map((item, index) => (
                <TimelineItem
                  key={index}
                  period={item.period}
                  title={item.title}
                  items={item.items}
                  isLast={index === historyWork.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="section-container">
          <h2 className="section-title text-center">Blog</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogItems.map((item, index) => (
              <ImageCard key={index} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* Contact Section with Form and Dock */}
        <AnimatedSection>
          <section id="contact" className="section-container pb-8 sm:pb-10 md:pb-12">
            <h2 className="section-title text-center">Contact Me</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-white/80 mb-8 text-center">
                Interested in working together or have any questions? Feel free to reach out!
              </p>

              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className="glass-card p-6 sm:p-8 mb-8">
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                    />
                  </div>

                  {/* Status Message */}
                  {formMessage && (
                    <div className={`p-4 rounded-xl text-center ${formStatus === 'success'
                      ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                      : 'bg-red-500/20 border border-red-500/30 text-red-300'
                      }`}>
                      {formMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 rounded-xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: formStatus !== 'submitting' ? 1.02 : 1 }}
                    whileTap={{ scale: formStatus !== 'submitting' ? 0.98 : 1 }}
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </div>
              </form>

              {/* Social Links Label */}
              <p className="text-white/60 text-center mb-4 text-sm">Or connect with me on social media</p>
            </div>
            <div className="relative h-32">
              <Dock
                items={contactDockItems}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
              />
            </div>
          </section>
        </AnimatedSection>

        {/* Footer */}
        <footer className="py-8 text-center text-white/50">
          <div className="mb-4">
            <a
              href="/donate"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Icon icon="ph:coffee" className="w-4 h-4" />
              <span className="text-sm font-medium">Support Me</span>
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Muhammad Irfan. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
