"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

export default function BaseLayout({
  pageTitle,
  children,
}: Readonly<{
  pageTitle: string;
  children: React.ReactNode;
}>) {
  const { ready, authenticated, user, login, logout } = usePrivy();
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center p-10">
      <div className="absolute top-5 right-5">
        <ModeToggle />
      </div>
      <div className="relative flex place-items-center mb-10">
        <Image
          className="relative mr-10 rounded-xl"
          src="/giphy.gif"
          alt="Karma Logo"
          width={180}
          height={180}
          priority
        />
        <div className="mr-10">
          <div className="text-3xl font-bold">CalCast</div>
          <div className="text-lg ">
            Scheduling infrastructure for farcasters.
          </div>
        </div>
      </div>

      <section className="lg:max-w-5xl lg:w-full ">
        <div className="ring-1 ring-zinc-700 rounded-xl p-8 w-full">
          {!ready && !authenticated ? (
            // Not Authenticated
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-md mb-5">
                Sign in to access the app and link your Farcaster account.
              </h3>

              {/* <ConnectButton /> */}
              <Button onClick={login}>Sign in 🟣</Button>
            </div>
          ) : (
            // Authenticated
            <div className="flex justify-center items-start flex-col">
              <div className="flex w-full justify-between items-center">
                <h1 className="text-2xl font-bold">{pageTitle}</h1>
                {ready && authenticated ? (
                  <div className="flex ring-1 ring-zinc-900 justify-between items-center p-2 rounded-xl">
                    <div className="flex justify-center items-center">
                      <Avatar className="mx-2 ring-1 ring-zinc-900">
                        <AvatarImage
                          src={
                            user?.farcaster?.pfp ||
                            "https://github.com/shadcn.png"
                          }
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start justify-start px-2">
                        <HoverCard>
                          <HoverCardTrigger className="text-md">
                            @{user?.farcaster?.username || ""}
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-zinc-900 mt-2 rounded-xl">
                            <h3 className="font-bold text-lg">
                              <a
                                href={
                                  user?.farcaster?.url ||
                                  `https://warpcast.com/${user?.farcaster?.username}`
                                }
                                target="_blank"
                              >
                                {user?.farcaster?.displayName || "Anon"}
                              </a>
                            </h3>
                            <p className="text-sm">{user?.farcaster?.bio} </p>
                          </HoverCardContent>
                        </HoverCard>
                        <Badge
                          className="bg-black hover:cursor-pointer hover:bg-zinc-900"
                          variant={"outline"}
                          onClick={logout}
                        >
                          Logout 👋
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button onClick={login}>Sign in with Farcaster</Button>
                )}
              </div>

              {authenticated && (
                <div className="mt-10 flex justify-center items-between flex-col w-full">
                  {children}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
