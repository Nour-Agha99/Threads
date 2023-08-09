import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
      <h1 className="text-light-1">Nour</h1>
    </div>
  )
}