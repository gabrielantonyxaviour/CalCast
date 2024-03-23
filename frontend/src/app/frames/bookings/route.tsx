import { Button } from "frames.js/next";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  const booking = ctx.searchParams;
  console.log(ctx.message?.inputText);

  console.log(booking["d"]);

  return {
    image: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          padding: 50,
          fontSize: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 48,
              }}
            >
              CalCast
            </div>
            <div
              style={{
                color: "white",
              }}
            >
              Logo
            </div>
          </div>
          <div
            style={{
              color: "gray",
              fontSize: 20,
            }}
          >
            Sheduling Infrastructure for Farcaster
          </div>
        </div>
        <div
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 20,
              marginBottom: 8,
            }}
          >
            0xLeo
          </div>
          <hr
            style={{
              width: "100%",
              margin: 0,
              borderWidth: 0.5,
              borderColor: "white",
            }}
          />{" "}
          <div
            style={{
              fontSize: 14,
              marginTop: 8,
            }}
          >
            Talks about Infrastructure and tooling
          </div>
        </div>
        <div
          style={{
            color: "white",
          }}
        >
          Shedule a call ?
        </div>
      </div>
    ),
    buttons: [
      <Button action="post" target="/bookings?duration=30">
        30min
      </Button>,
      <Button action="post" target="/bookings?duration=15">
        15min
      </Button>,
      <Button action="post_redirect">Create shedule</Button>,
    ],
  };
});

export const POST = handleRequest;
