"use client"
import Link from "next/link"
import { Footer } from "@/components/Footer"

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-border bg-background">
        <div className="flex items-center justify-between px-4 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <div className="h-6 w-6 rounded bg-brand-navy" />
            <div className="h-6 w-6 rounded bg-brand-cyan" />
            <div className="h-6 w-6 rounded bg-brand-orange" />
          </Link>

          {/* Back to Home */}
          <button
            onClick={() => window.history.back()}
            className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground"
          >
            Back
          </button>
        </div>
      </header>

      {/* Terms Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <h1 className="mb-8 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">Terms of Use</h1>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">WEB SITE TERMS OF USE</h2>
            <p className="leading-relaxed">
              validator.com ("Provider") reserves the right to change these terms and conditions at any time, and you
              agree that each visit you make to Provider's validator.com Web Site ("Provider's Web Site") shall be
              subject to the current terms and conditions as published on our website at http://validator.com/.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">General Terms of Use</h2>
            <p className="leading-relaxed">
              By accessing Provider's Web Site, you are agreeing to be bound by these Web Site Terms of Use and all
              applicable laws and regulations, and you agree that you are solely responsible for compliance with any
              applicable local laws. If you do not agree with any of these terms, do not use this site. Any claim
              relating to Provider's Web Site shall be governed by the laws of Barbados. The materials contained in
              Provider's Web Site are protected by applicable copyright and trade mark laws.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">No Endorsement of Third Party Content</h2>
            <p className="mb-4 leading-relaxed">
              Provider's Web Site may contain links to and/or frames of third party web sites or third party content
              that are not operated or maintained by Provider ("Third Party Sites"). Provider is not responsible for the
              content of those sites and cannot guarantee that those sites will not change without our knowledge.
              Product and service information on Third Party Sites are the sole responsibility of each individual vendor
              or operator of such Third Party Site. The inclusion of such links and frames in Provider's Web Site does
              not imply endorsement of such sites or any content, information, material, products or services provided
              on such sites. You will need to make your own independent judgment regarding your interaction with these
              linked sites.
            </p>
            <p className="leading-relaxed">
              Provider makes no representations whatsoever concerning; (a) the information, software or other material
              appearing on, or accessible through, any Third Party Site (including without limitation, any advertisement
              for products or services on any Third Party Site), (b) the performance or operation of any Third Party
              Site (including, without limitation, any transactions initiated or conducted through any Third Party Site,
              any taxes associated therewith and any use by third parties of user credit card information), (c) any
              products or services advertised or sold on or through any Third Party Site (including, without limitation,
              the quality, safety and legality of such products or services or the sale thereof), or (d) the sellers of
              any products or services advertised or sold on or through any Third Party Site. If you decide to access
              any of the Third Party Sites linked to Provider's Web Site, you do so entirely at your own risk. If you
              are accessing a Third Party Site through a link on Provider's Web Site, you are advised to read the terms
              of use and privacy policy of such Third Party Site before you use such Third Party Site.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Disclaimer and Limitation of Liability</h2>
            <p className="mb-4 leading-relaxed">
              THE MATERIALS AND INFORMATION CONTAINED ON PROVIDER'S WEB SITE ARE PROVIDED "AS IS", WITHOUT WARRANTY OF
              ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY WARRANTY FOR INFORMATION, SERVICES,
              OR PRODUCTS PROVIDED THROUGH OR IN CONNECTION WITH PROVIDER'S WEB SITE AND ANY IMPLIED WARRANTIES OR
              CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, EXPECTATION OF PRIVACY OR
              NON‑INFRINGEMENT.
            </p>
            <p className="leading-relaxed">
              In no event shall Provider or its service providers, affiliates, associates, subsidiaries or partners be
              liable for any damages, including, without limitation, damages for loss of data or profit, or due to
              business interruption, arising out of the use of or inability to use the materials contained on Provider's
              Web Site, even if Provider has been notified of the possibility of such damage. Some jurisdictions do not
              allow the exclusion of implied warranties, so the above exclusion may not apply to you. This disclaimer of
              liability applies to any damages or injury caused by any failure of performance, error, omission,
              interruption, deletion, defect, delay in operation or transmission, computer virus, communication line
              failure, theft or destruction or unauthorized access to, alteration of, or use of record, whether for
              breach of contract, tortious behavior, negligence, or under any other cause of action.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Limited License</h2>
            <p className="mb-4 leading-relaxed">
              Provider hereby grants you a limited license to view on your computer any content made available on
              Provider's Web Site for which a fee is not charged, for non-commercial, personal, or educational purposes
              only. No other use is permitted.
            </p>
            <p className="leading-relaxed">
              Without limiting the generality of the foregoing you may not make any commercial use of such content or
              copy or host such content on your or any other person's web site or FTP server. Nothing contained in this
              limited license shall be deemed as conferring any right in any copyright, trade mark, trade name, or other
              proprietary right of Provider or any other party who owns or has proprietary rights to the content,
              information and materials provided on Provider's Web Site.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Preservation of Intellectual Property Rights</h2>
            <p className="leading-relaxed">
              All material on this site, including, but not limited to images, illustrations and multimedia materials,
              is protected by copyrights which are owned and controlled by Provider or by other parties that have
              licensed their material to Provider. Material from this Web Site or from any other web site owned,
              operated, licensed or controlled by Provider may not be copied, reproduced, republished, uploaded, posted,
              transmitted, or distributed in any way. Modification of the materials or use of the materials for any
              other purpose is a violation of the copyrights and other proprietary rights held by the respective
              Providers thereof. The use of any such material on any other web site, ftp server, or network environment
              is prohibited.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Changes and Improvements</h2>
            <p className="leading-relaxed">
              Provider reserves the right, at its sole discretion, to change, modify, add or remove portions of these
              Terms of Use, at any time. It is your responsibility to check these Terms of Use periodically for changes.
              Your continued use of the Web Site following the posting of changes will mean that you accept and agree to
              the changes. As long as you comply with these Terms of Use, Provider grants you a personal, non-exclusive,
              non-transferable, limited privilege to enter and use the Site.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Privacy Policy</h2>
            <p className="leading-relaxed">
              Provider's Privacy Policy applies to use of this Site, and its terms are made a part of these Terms of Use
              by this reference. To view Provider's Privacy Policy, click{" "}
              <a href="https://validator.com/pagepp" className="text-brand-cyan hover:underline">
                here
              </a>
              . Additionally, by using the Web Site, you acknowledge and agree that Internet transmissions are never
              completely private or secure.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Jurisdictional Issues</h2>
            <p className="mb-4 leading-relaxed">
              Due to the nature of the Internet, it is not possible for Provider to restrict access to its Web Site only
              to the jurisdiction where Provider is located. Some or all of the product and service advertisements which
              are provided by third parties on this Web Site may not be eligible for solicitation in your jurisdiction.
              If you are accessing this Web Site from such a jurisdiction, you should not consider anything on this site
              as an advertisement or as a solicitation to the public to purchase any product or service from any
              advertisers that is advertising their good or service on or the Provider's Web Site. This site is for use
              only by persons residing in jurisdictions where such products and services may legally advertise.
            </p>
            <p className="mb-4 leading-relaxed">
              Unless otherwise specified, the materials contained in Provider's Web Site are presented solely for
              information purposes in Barbados. Provider makes no representation that any of the materials contained in
              Provider's Web Site are appropriate or available for use in other locations. Those who choose to access
              this Web Site from other locations do so on their own initiative and are responsible for compliance with
              local laws, if and to the extent local laws are applicable.
            </p>
            <p className="leading-relaxed">
              This agreement shall be governed by and construed in accordance with the laws of Barbados and the parties
              hereby irrevocably and exclusively attorn to the jurisdiction of the courts of Barbados.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Miscellaneous</h2>
            <p className="leading-relaxed">
              If any of the provisions of these Terms of Use are held by a court or other tribunal of competent
              jurisdiction to be void or unenforceable, such provisions shall be limited or eliminated to the minimum
              extent necessary and replaced with a valid provision that best embodies the intent of these Terms of Use,
              so that these Terms of Use shall remain in full force and effect. These Terms of Use constitute the entire
              agreement between you and Provider with regard to your use of the Web Site, and any and all other written
              or oral agreements or understandings previously existing between you and Provider with respect to such use
              are hereby superseded and cancelled. These Terms of Use shall not be interpreted or construed to confer
              any rights or remedies on any third parties.
            </p>
          </section>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => window.history.back()}
            className="inline-block rounded-3xl bg-brand-orange px-8 py-3 font-bold text-white shadow-2xl transition-colors hover:bg-brand-orange-hover"
          >
            Back
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
