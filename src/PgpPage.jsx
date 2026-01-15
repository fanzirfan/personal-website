import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Icon } from '@iconify/react'
import Aurora from './component/Aurora'

const PGP_DATA = {
  uid: 'Muhammad Irfan <fanzirfan@proton.me>',
  pub: {
    type: 'rsa4096',
    date: '2026-01-14',
    expires: '2027-01-14',
    fingerprint: '65C79B516BB5BC52D6BAE516A8F1FE9400DBE7FC',
    formatted: '65C7 9B51 6BB5 BC52 D6BA E516 A8F1 FE94 00DB E7FC',
  },
  sub: {
    type: 'rsa4096',
    date: '2026-01-14',
    expires: '2027-01-14',
    fingerprint: 'E8DE772A1C002AD411817EE7DF1607ED9FE37FFA',
    formatted: 'E8DE 772A 1C00 2AD4 1181 7EE7 DF16 07ED 9FE3 7FFA',
  },
}

const ASC_DOWNLOAD_URL = '/publickey.asc'
const PUBLIC_KEY_BLOCK = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
rvZGkUQdduLZlon70e5cSuGfzt+4ylA=
=IOzH
-----END PGP PUBLIC KEY BLOCK-----`

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

const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed', error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group relative p-2 hover:bg-white/10 rounded-lg transition-colors"
      title={label}
      aria-label={label}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <Icon icon="heroicons:check-circle-20-solid" className="w-5 h-5 text-green-400" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <Icon
              icon="heroicons:document-duplicate"
              className="w-5 h-5 text-white/50 group-hover:text-cyan-400 transition-colors"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

const MetadataItem = ({ label, value }) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="text-white/50">{label}</span>
    <span className="text-white/80 font-medium text-right">{value}</span>
  </div>
)

export default function PgpPage() {
  const curlCommand = `curl -sL https://fan.my.id${ASC_DOWNLOAD_URL} | gpg --import`

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
            <div className="inline-flex items-center justify-center p-4 bg-cyan-500/10 rounded-full mb-4 ring-1 ring-cyan-500/30">
              <Icon icon="heroicons:lock-closed" className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Public PGP Key
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Use this key to encrypt messages sent to me or verify the authenticity of my signed commits and documents.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 border-t-4 border-t-cyan-500"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-bold">
                  MI
                </div>
                <div>
                  <h3 className="font-bold text-lg">{PGP_DATA.uid}</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-white/50 font-mono mt-0.5">
                    <span>{PGP_DATA.pub.type.toUpperCase()}</span>
                    <span>•</span>
                    <span>Created: {PGP_DATA.pub.date}</span>
                    <span>•</span>
                    <span>Expires: {PGP_DATA.pub.expires}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
                  Master Key Fingerprint
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-black/20 p-4 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-colors">
                  <code className="text-sm sm:text-base md:text-lg font-mono text-white/90 break-all">
                    {PGP_DATA.pub.formatted}
                  </code>
                  <div className="sm:ml-auto sm:pl-4 sm:border-l sm:border-white/10">
                    <CopyButton text={PGP_DATA.pub.fingerprint} label="Copy Fingerprint" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-white/50 font-bold">
                  Subkey Fingerprint [E]
                </label>
                <div className="flex items-center gap-3">
                  <code className="text-xs sm:text-sm font-mono text-white/60 break-all">
                    {PGP_DATA.sub.formatted}
                  </code>
                  <CopyButton text={PGP_DATA.sub.fingerprint} label="Copy Subkey Fingerprint" />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-6 h-full flex flex-col gap-6"
            >
              <div className="space-y-3">
                <h3 className="font-bold text-xl">Key Details</h3>
                <div className="space-y-2">
                  <MetadataItem label="Primary Key" value={`pub ${PGP_DATA.pub.type}`} />
                  <MetadataItem label="Capabilities" value="[SC]" />
                  <MetadataItem label="Created" value={PGP_DATA.pub.date} />
                  <MetadataItem label="Expires" value={PGP_DATA.pub.expires} />
                  <MetadataItem label="Subkey" value={`sub ${PGP_DATA.sub.type}`} />
                  <MetadataItem label="Subkey Usage" value="[E]" />
                  <MetadataItem label="Subkey Expires" value={PGP_DATA.sub.expires} />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <h3 className="font-bold text-xl">Download</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Download the full public key file (.asc) or import it directly into your GPG keychain.
                </p>
                <HoverButton
                  href={ASC_DOWNLOAD_URL}
                  variant="primary"
                  className="w-full flex justify-center items-center"
                  download
                >
                  <Icon icon="heroicons:arrow-down-tray" className="w-5 h-5" />
                  Download .asc
                </HoverButton>
                <div className="text-xs text-white/50">
                  <p className="mb-2">Import via terminal:</p>
                  <code className="block bg-black/20 px-3 py-2 rounded-lg text-white/70 break-all">
                    {curlCommand}
                  </code>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-0 overflow-hidden h-full flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                <span className="text-sm font-mono text-white/60">public-key.asc</span>
                <CopyButton text={PUBLIC_KEY_BLOCK} label="Copy Key Block" />
              </div>
              <div className="relative flex-1 bg-black/20">
                <pre className="p-4 text-xs sm:text-sm font-mono text-cyan-300/80 overflow-auto max-h-[360px]">
                  {PUBLIC_KEY_BLOCK}
                </pre>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-primary/90 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold text-xl mb-3">Verification</h3>
            <p className="text-white/70 text-sm mb-4">
              Verify the fingerprint after import to ensure the key matches the one listed above.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-black/20 rounded-lg p-4">
                <p className="text-white/60 mb-2">Show fingerprint:</p>
                <code className="text-white/80">gpg --show-keys --with-fingerprint public-key.asc</code>
              </div>
              <div className="bg-black/20 rounded-lg p-4">
                <p className="text-white/60 mb-2">List keys:</p>
                <code className="text-white/80">gpg --list-keys --fingerprint</code>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
