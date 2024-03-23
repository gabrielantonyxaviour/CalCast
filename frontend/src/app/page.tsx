import Link from "next/link";

import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frame";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <span tw=" flex-col">
        <span>CastCaL</span>
        <span>Sheduling Infrastructure for Farcaster</span>
      </span>
    ),
    buttons: [
      <Button action="post" target="/bookings?d=2">
        Start
      </Button>,
    ],
    textInput: "Type something!",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "New api example",
    description: "This is a new api example",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames",
          "http://frame-js-mfgs.vercel.app" || "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  return <div>New api example. </div>;
}
