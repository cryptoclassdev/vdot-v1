import { TeamMemberBio } from "@/components/team/TeamMemberBio"

export default function SebPage() {
  return (
    <TeamMemberBio
      name="Sebastian Montgomery"
      role="General Manager"
      bio="Started the validator in mid-2022 and leads growth, operations, and content strategy. A prominent voice in the Solana ecosystem with more than 1,000 educational videos produced — and plans for the next 1,000."
      image={{ src: "/images/design-mode/seb-pfp.png", alt: "Sebastian Montgomery" }}
      contacts={[
        { platform: "Email", label: "seb@validator.com", href: "mailto:seb@validator.com" },
        { platform: "Twitter", label: "@SebMontgomery", href: "https://twitter.com/SebMontgomery" },
        { platform: "LinkedIn", label: "LinkedIn profile", href: "https://www.linkedin.com/in/sebastian-montgomery-3354a245/" },
      ]}
    />
  )
}
