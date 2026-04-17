import { TeamMemberBio } from "@/components/team/TeamMemberBio"

export default function MukulPage() {
  return (
    <TeamMemberBio
      name="The Intern"
      role="Content Creator"
      bio="Keeps validator.com plugged into Solana culture and Crypto Twitter. Research, creativity, and humour — turned into content worth keeping up with."
      image={{ src: "/team/Mukul-DP.png", alt: "The Intern" }}
      contacts={[
        { platform: "Reddit", label: "u/The-Intern-", href: "https://www.reddit.com/user/The-Intern-/" },
      ]}
    />
  )
}
