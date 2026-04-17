import { TeamMemberBio } from "@/components/team/TeamMemberBio"

export default function PedroPage() {
  return (
    <TeamMemberBio
      name="Pedro"
      role="Lead Editor & Artist"
      bio="Leads creative production. Crafts visual content that informs and connects — expanding validator.com's reach and broader awareness of the Solana ecosystem through storytelling and design."
      image={{ src: "/team/pedro.png", alt: "Pedro" }}
      contacts={[
        { platform: "Twitter", label: "@Pedro_TheEditor", href: "https://x.com/Pedro_TheEditor" },
      ]}
    />
  )
}
