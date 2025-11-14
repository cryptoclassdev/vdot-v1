"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="flex items-center justify-between px-4 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <div className="h-6 w-6 rounded bg-brand-navy" />
            <div className="h-6 w-6 rounded bg-brand-cyan" />
            <div className="h-6 w-6 rounded bg-brand-orange" />
          </Link>

          {/* Back to Home Button */}
          <Button
            className="rounded-3xl bg-brand-orange font-bold text-white shadow-2xl hover:bg-brand-orange-hover"
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <h1 className="mb-8 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">Privacy Policy</h1>

        <div className="space-y-8 text-foreground">
          <p className="text-lg leading-relaxed">
            This Privacy Policy discloses validator.com practices and policies regarding the gathering and dissemination
            of personal information (the "Privacy Policy") through this Web site, validator.com (the "Website"). This
            Privacy Policy should be read in conjunction with our Terms and Conditions of Use ("Terms of Use") which you
            can access by{" "}
            <Link href="/terms" className="text-brand-cyan hover:underline">
              here
            </Link>
            , and the Terms of Use shall govern where any inconsistency exists between this Privacy Policy and the Terms
            of Use. This Privacy Policy does not apply to sites, products, or services that are not owned or operated by
            us, or to information we may receive from other sources. We may change or update this Privacy Policy from
            time to time. Any changed or revised Privacy Policy shall be effective immediately after it is posted on
            this Web Site. If you do not agree to the terms of this Privacy Policy, you must discontinue using this
            Website.
          </p>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Information gathered by This Website
            </h2>
            <p className="mb-4 leading-relaxed">
              When you visit this Website, we may collect the following types of information: personally identifiable
              information you knowingly provide, information we collect automatically, and non-personally identifiable
              information you knowingly provide.
            </p>
            <p className="mb-4 leading-relaxed">
              We may collect personally identifiable information that you knowingly provide to us. For example, we may
              ask you to provide personally identifiable contact information (such as name, address, e-mail address and
              telephone number). In some cases (for example, if you register with us (or sign-in on this Website), we
              may also ask you to provide other information such as a personal ID, password, and a security question and
              answer.
            </p>
            <p className="mb-4 leading-relaxed">
              In addition, as you (and other users) browse this Website, our web servers may automatically collect
              certain information about such visits (usually through the use of cookies, javascript tags, clear .gif
              files (also known as "web beacons"), and the analysis of http headers), such as the user's IP address, the
              user's geographic location, the user's domain name, the user's browser type, the user's user agent, how
              many users visit this Website, which pages the user visits and for how long, the date and time the user
              accesses this Website, the Internet address of the site from which the user directly linked to this
              Website and the links on this Website on which the user clicks. In addition, we may collect certain search
              parameters relating to searches conducted by the user which are not entered by the user.
            </p>
            <p className="leading-relaxed">
              To improve the services we can offer you, we may decide to expand this Web Site's capabilities for
              obtaining information about users in the future. We will update this Privacy Policy as our practices
              change to ensure that you are aware of developments in this area.
            </p>
          </section>

          <section>
            <p className="mb-4 leading-relaxed">
              If we collect such information, we may use it for a number of purposes, including:
            </p>
            <ul className="ml-6 list-disc space-y-3 leading-relaxed">
              <li>
                To establish and maintain a commercial relationship with you and to provide you with products and
                services. Account information may be retained by us to enable our website to identify you, to allow you
                to set up and access your account (if applicable) and to change your account information and/or
                services. This information is used only for these purposes and is only retained in transaction records
                required for internal management and auditing purposes, unless you are informed otherwise or you provide
                your consent or we are required to disclose same pursuant to a court order or other legal process.
              </li>
              <li>
                To understand your needs and preferences. We may maintain a record of the services you receive from us
                (if applicable), and we may ask you for additional information so that we can serve you better.
              </li>
              <li>
                To provide you with information you have requested, and to keep you informed with respect to ongoing
                changes to our website. Your email address may be used to send you any newsletters and mailings if you
                have requested us to do so. You can withdraw your consent for such mailings at any time by contacting us
                as set out in such communications.
              </li>
              <li>
                To develop, enhance or provide new services. We may from time to time conduct surveys and research,
                requesting input from our visitors to help us improve our website, products and services in an effort to
                serve you better. Your participation in such surveys is voluntary, and in some cases you may have the
                option to participate anonymously. However, your name, address, email and telephone number may be
                required to take advantage of bonuses or other benefits which are available to survey participants, in
                which case your contact information will only be used for notification and fulfillment purposes.
              </li>
              <li>
                To manage and administer our business. The nature of the Internet is such that it passively and
                automatically collects certain information about a user's traffic patterns, which may be linked to their
                Internet Protocol (IP) addresses. These are unique Internet "addresses" assigned to all Web users by
                their Internet Service Providers (ISP). Server logs record statistical information, such as visitors' IP
                addresses, type of operating systems, time and duration of visit, web pages requested, and identify
                visitors by categories such as domains and browser types. These statistics are only used on an aggregate
                basis and will not contain any information that could identify you personally.
              </li>
              <li>
                To meet legal, regulatory, security and processing requirements (such as in response to a court order),
                and otherwise as permitted or required by law. We may also use this personal information to contact you
                regarding any such legal, regulatory, security, or processing requirements, and may be required to
                disclose this information pursuant to our Terms of Service.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed">
              If we intend to use personal information for purposes not identified to you or as set out above, these
              other purposes will be described to you at the time of collection or before using the information. We will
              not use your information or otherwise disclose it for any other purpose without your consent.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Cookies</h2>
            <p className="mb-4 leading-relaxed">
              Users also should be aware that non-personal information and data may be automatically collected through
              the standard operation of our Internet servers or through the use of "cookies". Cookies are small text
              files containing a unique identification number that identifies your browser - but not you - to our
              servers each time you visit our website. Cookies are not pervasive or invasive programs that enter a
              user's system and damage files. They simply tell us which pages of our website are visited and by how many
              visitors. Cookies cannot, by themselves, disclose the individual identity of any site user, and we never
              combine information gathered by a cookie with personally identifiable information like your name,
              telephone number or email address, without your consent.
            </p>
            <p className="leading-relaxed">
              You should be aware that we cannot control the use of cookies or the resulting information by advertisers'
              or third parties' web sites that you may visit as a result of clicking on a link from our Website. If you
              do not want information collected through the use of cookies, there is a simple procedure in most browsers
              that allows the user to deny or accept the cookie feature.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Third Parties' Access to Information
            </h2>
            <p className="mb-4 leading-relaxed">
              We not in the business of selling visitor information to others. Our visitor information is not available
              for sale to any outside entity. We may contract with third parties to fulfill certain functions on our
              behalf, such as providing marketing assistance, analyzing data, preparing and maintaining site content,
              and providing customer service. These agents may have access to visitor information only as required in
              order to help them perform their functions on our behalf, but they are not allowed to use that information
              for any other purpose and must keep such information confidential.
            </p>
            <p className="leading-relaxed">
              Visitor and Website related information is a valuable business asset. If for any reason we transfer or
              divest ourselves of business assets, our visitor information will be transferred as one of those business
              assets.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">External Links</h2>
            <p className="leading-relaxed">
              Our Website may contain links or references to other web sites to which this Privacy Policy does not
              apply. These sites are not owned or controlled us and we not responsible for the collection, use and
              disclosure of personal information or the privacy practices of other organizations or other web sites to
              which our site may refer visitors or provide links for. When submitting personal information on such other
              websites, we encourage you to read the privacy policy of those sites.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Opt-in and Opt-Out Option</h2>
            <p className="leading-relaxed">
              We may offer you the opportunity of opting in to receive email communications from us. Upon request, we
              will allow any user to "opt out" of further email and/or promotional contacts at any time. Also, upon a
              user's request, we will use commercially reasonable efforts to functionally delete the user and his or her
              personal information from our database; however, it may be impossible to delete a user's entry without
              some residual information because of backups and records of deletions.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Your Consent</h2>
            <p className="mb-4 leading-relaxed">
              Consent to the collection, use and disclosure of personal information may be given in various ways.
              Consent can be express (e.g., orally, electronically or on a form you may sign describing the intended
              uses and disclosures of personal information) or implied (e.g., when you provide information necessary for
              a service you have requested, or in some circumstances where notice has been provided to you about our
              intentions with respect to your personal information and you have not withdrawn your consent for an
              identified purpose, such as by using an "opt out" option provided). Consent may be given by your
              authorized representative (such as a legal guardian or a person having a power of attorney). Generally, by
              providing us with personal information, we will assume that you consent to our collection, use and
              disclosure of such information for the purposes identified or described in this privacy policy, if
              applicable, or as otherwise described at the time of collection. You may withdraw your consent to our
              collection, use and disclosure of personal information at any time, subject to contractual and legal
              restrictions and reasonable notice, however, please note that if you withdraw your consent to certain uses
              of your personal information, we may no longer be able to provide certain of our products or services.
            </p>
            <p className="leading-relaxed">
              We do not collect, use or disclose your personal information other than as described in this Privacy
              Policy without your consent, unless permitted or required by law. We may be required or permitted under
              statute or regulation to collect, use or disclose personal information without your consent, for example
              in response to a court order or subpoena, to comply with local or federal regulations, or to collect a
              debt owed to us.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Your Data Protection Rights under the General Data Protection Regulation (GDPR)
            </h2>
            <p className="mb-4 leading-relaxed">
              If you are an individual resident of the European Economic Area (EEA), you may have the following data
              protection rights:
            </p>
            <p className="mb-4 leading-relaxed">
              If you wish to access, correct, update, or request deletion of your personal information, you can do so at
              any time by contacting Us as set out below.
            </p>
            <p className="mb-4 leading-relaxed">
              In addition, you can object to the processing of your personal information, ask us to restrict the
              processing of your personal information, or request portability of your personal information. Again, you
              can exercise these rights by contacting Us as set out below.
            </p>
            <p className="mb-4 leading-relaxed">
              You have the right to opt-out of marketing communications we send you at any time. You can exercise this
              right by clicking on the "unsubscribe" or "opt-out" link in marketing emails we send you. To opt-out of
              other forms of marketing, please contact us as set out below.
            </p>
            <p className="mb-4 leading-relaxed">
              Similarly, if we have collected and processed your personal information with your consent, then you can
              withdraw your consent at any time. Withdrawing your consent will not affect the lawfulness of any
              processing we conducted prior to your withdrawal, nor will it affect the processing of your personal
              information conducted in reliance on lawful processing grounds other than consent.
            </p>
            <p className="mb-4 leading-relaxed">
              You have the right to complain to a data protection authority about our collection and use of your
              personal information. For more information, please contact your local data protection authority.
            </p>
            <p className="leading-relaxed">
              We respond to all requests we receive from individuals wishing to exercise their data protection rights in
              accordance with applicable data protection laws. You may be required to identify yourself as a person to
              which the GDPR is applicable in order for us to extend GDPR-mandated privacy requirements to you, and we
              reserve our right to deny provision of our services to you if we in our sole discretion determine that we
              want to provide the services only to persons resident outside the European Economic Area ("EAA"). If you
              are a resident of the EEA and believe we maintain your personal data subject to the General Data
              Protection Regulation (GDPR), you may find out more information, including about the complaint procedure,{" "}
              <a
                href="https://edps.europa.eu/data-protection/our-role-supervisor/complaints_en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan hover:underline"
              >
                here
              </a>
              .
            </p>
          </section>
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => window.history.back()}
            className="inline-block rounded-3xl bg-brand-orange px-8 py-3 font-bold text-white shadow-2xl transition-colors hover:bg-brand-orange-hover"
          >
            Back
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
