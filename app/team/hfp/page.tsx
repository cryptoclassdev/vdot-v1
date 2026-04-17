import { TeamMemberBio } from "@/components/team/TeamMemberBio"

export default function HFPPage() {
  return (
    <TeamMemberBio
      name="HFP"
      role="Founder"
      bio="A 17-year branding leader. Recognised Bitcoin's potential early and, by 2021, Solana's capacity to deliver real-world decentralisation. Sets the strategic direction that established validator.com's brand and continues to guide its long-term positioning."
      image={{ src: "/images/design-mode/hfp-pfp.png", alt: "HFP" }}
      contacts={[
        { platform: "Twitter", label: "@degenHFP", href: "https://x.com/degenHFP" },
      ]}
    />
  )
}
