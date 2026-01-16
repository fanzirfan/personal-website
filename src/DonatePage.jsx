import { motion } from 'motion/react'
import { Icon } from '@iconify/react'
import Aurora from './component/Aurora'

const QRIS_DATA = {
  merchantName: 'KOJERENS, PL GDNG',
  nmid: 'ID1024339788605',
  terminalId: 'A01',
  qrisImage: '/qris.webp',
}

const HoverButton = ({ children, href, onClick, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: {
      bg: 'bg-white/10',
      border: 'border-white/20',
      glow: 'rgba(255,255,255,0.3)',
    },
    primary: {
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-400/50',
      glow: 'rgba(92,230,255,0.5)',
    },
    success: {
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-400/50',
      glow: 'rgba(52,211,153,0.5)',
    },
  }

  const style = variants[variant]
  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`relative px-6 py-3 ${style.bg} border ${style.border} rounded-full font-medium overflow-hidden cursor-pointer ${className}`}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 25px ${style.glow}, 0 0 50px ${style.glow}`,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  )
}

const MetadataItem = ({ label, value }) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="text-white/50">{label}</span>
    <span className="text-white/80 font-medium text-right">{value}</span>
  </div>
)

export default function DonatePage() {
  return (
    <div className="relative min-h-screen text-white selection:bg-cyan-500/30">
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#0c2b4e", "#1a3d64", "#1d546c"]}
          amplitude={1}
          blend={0.5}
        />
      </div>

      <div className="relative z-10 p-4 sm:p-8 md:p-12 lg:p-16 min-h-screen flex flex-col">
        <header className="flex justify-between items-center mb-10 max-w-5xl mx-auto w-full">
          <motion.a
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group"
            whileHover={{ x: -4 }}
          >
            <Icon icon="heroicons:arrow-left" className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </motion.a>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-4 ring-1 ring-emerald-500/30">
              <Icon icon="heroicons:heart" className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Support My Work
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              If you find my work helpful or valuable, consider supporting me through a donation. Every contribution helps me continue creating and improving.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
            {/* QRIS Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-8 border-t-4 border-t-emerald-500 flex flex-col items-center"
            >
              <h2 className="text-xl font-bold mb-6 text-center">Scan QRIS to Donate</h2>
              
              {/* QRIS Image */}
              <div className="relative bg-white rounded-2xl p-4 mb-6 shadow-lg shadow-white/5">
                <img
                  src={QRIS_DATA.qrisImage}
                  alt="QRIS Payment Code"
                  className="w-full max-w-[320px] h-auto rounded-lg"
                  loading="eager"
                />
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-500 rounded-tl" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-500 rounded-tr" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-500 rounded-bl" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-500 rounded-br" />
              </div>

              {/* Merchant Info */}
              <div className="text-center space-y-1 mb-6">
                <p className="font-bold text-lg">{QRIS_DATA.merchantName}</p>
                <p className="text-white/50 text-sm font-mono">NMID: {QRIS_DATA.nmid}</p>
              </div>

              {/* Instructions */}
              <div className="w-full bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon icon="heroicons:information-circle" className="w-5 h-5 text-cyan-400" />
                  How to Pay
                </h3>
                <ol className="text-sm text-white/70 space-y-2 list-decimal list-inside">
                  <li>Open your mobile banking or e-wallet app</li>
                  <li>Select the QRIS payment option</li>
                  <li>Scan the QR code above</li>
                  <li>Enter the amount you wish to donate</li>
                  <li>Confirm and complete the payment</li>
                </ol>
              </div>
            </motion.div>

            {/* Side Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Payment Details */}
              <div className="glass-card p-6">
                <h3 className="font-bold text-xl mb-4">Payment Details</h3>
                <div className="space-y-3">
                  <MetadataItem label="Merchant Name" value={QRIS_DATA.merchantName} />
                  <MetadataItem label="NMID" value={QRIS_DATA.nmid} />
                  <MetadataItem label="Terminal ID" value={QRIS_DATA.terminalId} />
                  <MetadataItem label="Payment Type" value="QRIS (Indonesian Standard)" />
                </div>
              </div>

              {/* Supported Apps */}
              <div className="glass-card p-6">
                <h3 className="font-bold text-xl mb-4">Supported Payment Apps</h3>
                <p className="text-white/60 text-sm mb-4">
                  QRIS is supported by all major Indonesian banks and e-wallets:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['GoPay', 'OVO', 'DANA', 'ShopeePay', 'LinkAja', 'BCA Mobile', 'BRI Mobile', 'Mandiri Livin', 'BNI Mobile', 'CIMB Niaga', 'Jenius', 'Bank Jago'].map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/70"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Thank You Message */}
              <div className="glass-card p-6 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-full">
                    <Icon icon="heroicons:sparkles" className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Thank You!</h3>
                    <p className="text-white/70 text-sm">
                      Your support means a lot to me. It helps me dedicate more time to creating quality content and projects. Every donation, no matter the size, is greatly appreciated.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact for Issues */}
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-3">Having Issues?</h3>
                <p className="text-white/60 text-sm mb-4">
                  If you encounter any problems with the payment, feel free to contact me directly.
                </p>
                <HoverButton
                  href="mailto:fanzirfan@proton.me"
                  variant="primary"
                  className="w-full flex justify-center"
                >
                  <Icon icon="heroicons:envelope" className="w-5 h-5" />
                  Contact Support
                </HoverButton>
              </div>
            </motion.div>
          </div>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-500/20 rounded-full shrink-0">
                <Icon icon="heroicons:shield-check" className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
                <p className="text-white/70 text-sm">
                  QRIS (Quick Response Code Indonesian Standard) is a standardized QR code payment system regulated by Bank Indonesia. All transactions are processed securely through your bank or e-wallet provider's encrypted channels.
                </p>
              </div>
            </div>
          </motion.div>
        </main>

        <footer className="mt-12 text-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Muhammad Irfan. All donations are voluntary and non-refundable.</p>
        </footer>
      </div>
    </div>
  )
}
