import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-gold/20" style={{ background: '#060A14' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="App Star Family"
              width={28}
              height={28}
              className="h-7 w-auto"
              placeholder="empty"
            />
            <span className="font-jakarta font-semibold text-white text-sm">
              App Star Family
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#8B8FA8]">
            <Link href="/apps" className="hover:text-gold-light transition-colors">Apps</Link>
            <Link href="/empire" className="hover:text-gold-light transition-colors">Empire</Link>
            <Link href="/blog" className="hover:text-gold-light transition-colors">Blog</Link>
            <Link href="/privacy-policy" className="hover:text-gold-light transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-gold-light transition-colors">Terms of Use</Link>
            <Link href="/contact" className="hover:text-gold-light transition-colors">Contact</Link>
          </div>

          {/* Twitter */}
          <div className="md:text-right">
            <a
              href="https://twitter.com/AppstarFamily"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#8B8FA8] hover:text-gold-light transition-colors"
            >
              @AppstarFamily
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gold/10 text-center">
          <p className="font-jakarta italic text-gold text-lg mb-2">
            &ldquo;Long may he pinch.&rdquo; &#x1F451;&#x1F99E;
          </p>
          <p className="text-xs text-[#5A5E70]">
            &copy; 2026 APP STAR FAMILY PTE. LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
