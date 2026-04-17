import { TeamMemberBio } from "@/components/team/TeamMemberBio"

export default function DanPage() {
  return (
    <TeamMemberBio
      name="Dan Phillips"
      role="Business Developer"
      bio="Dan works at the intersection of traditional business and Web3. Bachelor's in Economics, consulting and sales background with KPMG, Oracle, and HubSpot."
      image={{ src: "/images/design-mode/dan-pfp.png", alt: "Dan Phillips" }}
      contacts={[
        { platform: "Email", label: "dan@validator.com", href: "mailto:dan@validator.com" },
        { platform: "Twitter", label: "@L_Earnings", href: "https://x.com/L_Earnings" },
        { platform: "LinkedIn", label: "LinkedIn profile", href: "https://www.linkedin.com/in/ddphillipsptuk/" },
      ]}
    />
  )
}
