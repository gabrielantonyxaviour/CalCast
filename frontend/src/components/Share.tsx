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

export default function Share(props: Readonly<{ farcasterId: string }>) {
  const frame_id = `${props.farcasterId}_15`;

  return (
    <div>
      <Card className="bg-black rounded-xl">
        <CardHeader className="bg-zinc-900 rounded-xl">
          <CardTitle>Share URL</CardTitle>
          <CardDescription>
            Cast you Share URL on Farcaster to start receiving bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-black">
          <div className="mt-5 flex justify-center items-center">
            <Input
              type="text"
              disabled
              value={`https://calcast.vercel.app/frames?frame_id=${frame_id}`}
            />
            <Button
              variant={"outline"}
              className="ml-2"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://calcast.vercel.app/frames?frame_id=${frame_id}`
                );
              }}
            >
              Copy to Clipboard
            </Button>
            <Button
              variant={"outline"}
              className="ml-2"
              onClick={() => {
                window.open(
                  `https://warpcast.com/~/compose?text=Book%20a%20call%20with%20me!&embeds[]=https://calcast.vercel.app/frames?frame_id=${frame_id}`
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
