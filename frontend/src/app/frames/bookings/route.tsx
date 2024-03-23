/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { getNextSixDates } from "@/lib/date";
import { createTimeSlots } from "@/lib/time";
import {
  FrameRatio,
  generateCaptchaChallenge,
  GenerateCaptchaChallengeInput,
  GenerateCaptchaChallengeOutput,
  validateCaptchaChallenge,
  ValidateCaptchaChallengeInput,
  ValidateCaptchaChallengeOutput,
} from "@airstack/frames";

const handleRequest = frames(async (ctx) => {
  const booking = ctx.searchParams;
  console.log(ctx.message?.inputText);

  console.log(booking["d"]);
  if (booking["duration"] === undefined) {
    return {
      image: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            // justifyContent: "center",

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
              justifyContent: "center",
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
                  fontSize: 64,
                }}
              >
                CalCast
              </div>
              <div
                style={{
                  color: "white",
                  display: "flex",
                }}
              >
                <img
                  src="http://localhost:3000/calendar.png"
                  width={64}
                  height={64}
                ></img>
              </div>
            </div>
            <div
              style={{
                color: "gray",
                fontSize: 40,
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
              marginTop: 50,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 40,
                  marginBottom: 8,
                }}
              >
                0xLeo
              </div>
              {/* <hr
                style={{
                  width: "15%", // Adjust the width of the line as needed
                  margin: 0,
                  borderWidth: 0.5,
                  borderColor: "white",
                  transform: "rotate(-49deg)", // Rotate the line to make it diagonal
                }}
              /> */}
              <hr
                style={{
                  borderColor: "white",
                  width: 50,
                  transform: "rotate(-65deg)",
                  margin: 0,
                  borderWidth: 1,
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="http://localhost:3000/calendar.png" // Replace 'circular_image_url.jpg' with the URL of your circular image
                  alt="Circular Image"
                  style={{
                    borderRadius: "50%", // Make the image circular
                    border: "1px solid white", // Optional: add border to the circular image
                    width: 60, // Adjust width and height as needed
                    height: 60,
                  }}
                />
              </div>
            </div>
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
            Schedule
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
  } else if (booking["datefixed"] === undefined) {
    if (booking["d"] === undefined) {
      booking["d"] = "0";
    }
    const d = booking["d"];
    console.log(booking);
    const dates = getNextSixDates();
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
              display: "flex", // flex must be there or it throws error
            }}
          >
            Choose A date {d}
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {dates.map((date, index) => (
              <div
                key={index}
                style={{
                  padding: 5,
                  background: "linear-gradient(to right, #9B30FF, #7158FF)",

                  border: index.toString() === d ? "2px solid white" : "none",
                  borderRadius: 5,
                }}
              >
                {date}
              </div>
            ))}
          </div>
        </div>
      ),
      buttons: [
        <Button action="post" target="/bookings">
          back
        </Button>,
        <Button
          action="post"
          target={`/bookings?duration=${booking["duration"]}&d=${
            parseInt(booking["d"].toString()) - 1
          }`}
        >
          ⬅️
        </Button>,
        <Button
          action="post"
          target={`/bookings?duration=${booking["duration"]}&d=${
            parseInt(booking["d"].toString()) + 1
          }`}
        >
          ➡️
        </Button>,
        <Button
          action="post"
          target={`/bookings?duration=${booking["duration"]}&d=${booking["d"]}&datefixed=true`}
        >
          Confirm ✅
        </Button>,
      ],
    };
  } else if (booking["timefixed"] === undefined) {
    if (booking["t"] === undefined) {
      booking["t"] = "0";
    }
    const t = booking["t"].toString();
    console.log(t);
    const timeslots = createTimeSlots("06:00", "13:00");
    console.log(timeslots);
    const visibleIndex = Math.floor(parseInt(t) / 4);

    const startIndex = visibleIndex * 4;
    const endIndex = Math.min(startIndex + 4, timeslots.length);
    const visibleTimeSlots = timeslots.slice(startIndex, endIndex);

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
              display: "flex", // flex must be there or it throws error
            }}
          >
            Choose A Time {t}
          </div>
          {/* {visibleTimeSlots.map((timeSlot, index) => (
            <div key={index} style={{ color: "white" }}>
              {timeSlot}
            </div>
          ))} */}
          <div
            style={{
              color: "white",
              display: "flex",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {visibleTimeSlots.map((timeSlot, index) => (
              <div
                key={index}
                style={{
                  fontSize: 14,
                  padding: 5,
                  background: "linear-gradient(to right, #9B30FF, #7158FF)",
                  // backgroundColor: "gray",

                  border:
                    index === parseInt(t) % 4 ? "2px solid white" : "none",
                  borderRadius: 5,
                }}
              >
                {timeSlot}
              </div>
            ))}
          </div>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target={`/bookings?duration=${booking["duration"]}&d=${booking["d"]}`}
        >
          back
        </Button>,
        <Button
          action="post"
          target={`/bookings?duration=${booking["duration"]}&d=${
            booking["d"]
          }&datefixed=true&t=${parseInt(booking["t"].toString()) - 1}`}
        >
          ⬅️
        </Button>,
        <Button
          action="post"
          target={`/bookings?duration=${booking["duration"]}&d=${
            booking["d"]
          }&datefixed=true&t=${parseInt(booking["t"].toString()) + 1}`}
        >
          ➡️
        </Button>,
        <Button
          action="post"
          target={`/bookings?duration=${booking["duration"]}&d=${booking["d"]}&datefixed=true&t=${booking["t"]}&timefixed=true`}
        >
          Confirm ✅
        </Button>,
      ],
    };
  } else if (booking["captcha"] === undefined) {
    const input: GenerateCaptchaChallengeInput = {
      options: { ratio: FrameRatio._1_91__1, includeImage: true },
    };

    const res: GenerateCaptchaChallengeOutput = await generateCaptchaChallenge(
      input
    );

    // console.log(res);
    // ctx.message!.state = res.state;
    // console.log("state");
    // console.log(ctx.message?.state);

    return {
      image: (
        <div style={{ display: "flex" }}>
          <img src={res.image}></img>
        </div>
      ),
      state: {
        captchaId: res.state.captchaId,
        valueHash: res.state.valueHash,
      },
      // image: res.image,
      buttons: [
        <Button
          action="post"
          target={`/bookings?duration=${booking["duration"]}&d=${booking["d"]}&datefixed=true&t=${booking["t"]}&timefixed=true&captcha=pending&captchaId=${res.state.captchaId}&hashvalue=${res.state.valueHash}`}
        >
          Verify
        </Button>,
      ],
      textInput: "Enter the answer",
    };
  } else if (booking["verified"] === undefined) {
    const inputText = ctx.message?.inputText;
    const states = ctx.message!.state;

    const state = {
      captchaId: booking["captchaId"],
      valueHash: booking["hashvalue"],
    };

    console.log(`state : ${state}`);
    const input: ValidateCaptchaChallengeInput = {
      inputText,
      state,
    };

    const res: ValidateCaptchaChallengeOutput = await validateCaptchaChallenge(
      input
    );

    console.log(res);
    return {
      image: (
        <div style={{ display: "flex" }}>
          <img src={res.image}></img>
        </div>
      ),
      // image: res.image,
      buttons: [
        <Button
          action="post"
          target={
            res.isValidated
              ? `/bookings?duration=${booking["duration"]}&d=${booking["d"]}&datefixed=true&t=${booking["t"]}&timefixed=true&captcha=pending&verified=true`
              : `/bookings?duration=${booking["duration"]}&d=${booking["d"]}&datefixed=true&t=${booking["t"]}&timefixed=true`
          }
        >
          {res.isValidated ? "Proceed" : "Try again!"}
        </Button>,
      ],
    };
  } else {
    const t = booking["t"].toString();
    const d = booking["d"].toString();

    const dur = booking["duration"].toString();

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
              display: "flex", // flex must be there or it throws error
              fontSize: 14,
            }}
          >
            You have booked a {dur} min appointment on {d} at {t}
          </div>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target={`/bookings?duration=${booking["duration"]}&d=${booking["d"]}&datefixed=true&t=${booking["t"]}`}
        >
          back
        </Button>,
        <Button action="tx" target="/txdata" post_url="/bookings">
          Book Now
        </Button>,
      ],
    };
  }
});

export const POST = handleRequest;
