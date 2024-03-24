/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../../frames";

const handleRequest = frames(async (ctx) => {
  const encodedString = ctx.searchParams["fid"].toString();
  const decodedString = atob(encodedString);
  const decodedJSON = JSON.parse(decodedString);
  const ownerFID = decodedJSON.fid;
  console.log(ownerFID);
  return {
    accepts: [
      {
        id: "farcaster",
        version: "vNext",
      },
      {
        id: "xmtp",
        version: "vNext",
      },
    ],
    image:
      "https://quickchart.io/chart?c={type:'line',data:{labels:['Q1','Q2','Q3','Q4'], datasets:[{label:'Users',data:[50,60,70,180]},{label:'Revenue',data:[100,200,300,400]}]}}",
    imageOptions: {
      width: 30,
      height: 30,
    },
    buttons: [
      <Button action="post" target="/bookings">
        Schedule a call now!
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
