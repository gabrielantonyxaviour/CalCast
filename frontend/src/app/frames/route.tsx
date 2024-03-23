/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <span tw=" flex-col">
        <span>CastCaL</span>
        <span>Sheduling Infrastructure for Farcaster</span>
      </span>
    ),
    buttons: [
      <Button action="post" target="/bookings">
        Start
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
