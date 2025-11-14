import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#000000] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Main footer content */}
        <div className="mb-8 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
          {/* Left side - Logo and brand name */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Three square logo */}
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-lg bg-brand-navy md:h-16 md:w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24" />
              <div className="h-12 w-12 rounded-lg bg-brand-cyan md:h-16 md:w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24" />
              <div className="h-12 w-12 rounded-lg bg-brand-orange md:h-16 md:w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24" />
            </div>
            {/* Brand name */}
            <h3 className="min-w-0 break-words text-xl font-bold text-white sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              validator.com
            </h3>
          </div>

          {/* Vertical separator */}
          <div className="hidden h-64 w-px bg-white lg:block" />

          {/* Right side - Two column link grid */}
          <div className="grid w-full grid-cols-2 gap-x-8 gap-y-6 lg:w-auto lg:gap-x-16 xl:gap-x-18 2xl:gap-x-20">
            {/* Left column */}
            <div className="space-y-4">
              <Link
                href="/terms"
                className="block break-words text-base font-semibold text-white transition-colors hover:text-white/80 md:text-lg xl:text-xl 2xl:text-2xl"
              >
                Terms of Use
              </Link>
              <Link
                href="#team"
                className="block break-words text-base font-semibold text-white transition-colors hover:text-white/80 md:text-lg xl:text-xl 2xl:text-2xl"
              >
                About
              </Link>
              <Link
                href="/security"
                className="block break-words text-base font-semibold text-white transition-colors hover:text-white/80 md:text-lg xl:text-xl 2xl:text-2xl"
              >
                Security
              </Link>
              <a
                href="https://cryptoclass.mintlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block break-words text-base font-semibold text-white transition-colors hover:text-white/80 md:text-lg xl:text-xl 2xl:text-2xl"
              >
                Support
              </a>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <Link
                href="/privacy"
                className="block break-words text-base font-semibold text-white transition-colors hover:text-white/80 md:text-lg xl:text-xl 2xl:text-2xl"
              >
                Privacy Policy
              </Link>
              <a
                href="https://cryptoclass.mintlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block break-words text-base font-semibold text-white transition-colors hover:text-white/80 md:text-lg xl:text-xl 2xl:text-2xl"
              >
                Docs
              </a>
              <Link
                href="/blog"
                className="block break-words text-base font-semibold text-white transition-colors hover:text-white/80 md:text-lg xl:text-xl 2xl:text-2xl"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block break-words text-base font-semibold text-white transition-colors hover:text-white/80 md:text-lg xl:text-xl 2xl:text-2xl"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Horizontal separator */}
        <div className="mb-6 h-px bg-white" />

        {/* Bottom section - Social icons and copyright */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          {/* Social media icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://discord.com/invite/eCJSb8PspY"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white transition-colors hover:bg-white/80"
            >
              <svg className="h-5 w-5 text-[#2a2a2a]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.993a.077.077 0 0 1-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://x.com/validator_com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white transition-colors hover:bg-white/80"
            >
              <svg className="h-5 w-5 text-[#2a2a2a]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Copyright text */}
          <p className="break-words text-sm text-white md:text-base xl:text-sm 2xl:text-base">©2025 validator.com</p>
        </div>
      </div>
    </footer>
  )
}
