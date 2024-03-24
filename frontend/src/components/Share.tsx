"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { useState, useEffect } from "react";

export default function Share() {
  const [frameId, setFrameId] = useState<string>("");
  const { user, ready } = usePrivy();

  function getURL(frameId: string) {
    return `https://calcast.vercel.app/frames?fid=${btoa(
      JSON.stringify({ fid: frameId.replace("_15", ""), duration: 15 })
    )}`;
  }

  useEffect(() => {
    if (ready && user && user.farcaster) {
      setFrameId(`${user.farcaster.fid}_15`);
    }
  }, [ready, user]);

  return (
    <div className="my-5">
      <Card className="bg-black rounded-xl">
        <CardHeader className="bg-zinc-900 rounded-xl p-4">
          <CardTitle>2. Share URL</CardTitle>
          <CardDescription>
            Cast you Share URL on Farcaster to start receiving bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-black rounded-xl">
          <div className="mt-5 flex justify-center items-center">
            <Input type="text" disabled value={getURL(frameId)} />
            <Button
              variant={"outline"}
              className="ml-2"
              onClick={() => {
                navigator.clipboard.writeText(getURL(frameId));
              }}
            >
              Copy to Clipboard
            </Button>
            <Button
              variant={"outline"}
              className="ml-2"
              onClick={() => {
                window.open(
                  `https://warpcast.com/~/compose?text=Book%20a%20call%20with%20me!&embeds[]=${getURL(
                    frameId
                  )}`
                );
              }}
            >
              Cast on WarpCast 🟣
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
