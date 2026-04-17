import { TeamMemberBio } from "@/components/team/TeamMemberBio"

export default function ChrisPage() {
  return (
    <TeamMemberBio
      name="Chris"
      role="Lead Researcher"
      bio="Steers content research, turning Solana protocol updates into plain, useful takeaways for operators and delegators."
      image={{ src: "/team/Chris-DP.png", alt: "Chris" }}
      contacts={[
        { platform: "Twitter", label: "@AverageChris25", href: "https://x.com/AverageChris25" },
      ]}
    />
  )
}
