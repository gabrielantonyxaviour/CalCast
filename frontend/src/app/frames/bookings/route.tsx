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
import { createGoogleCalendarLink } from "@/lib/calendar";

const handleRequest = frames(async (ctx) => {
  const booking = ctx.searchParams;
  console.log(ctx);
  const userFID: number = ctx.message!.requesterFid;
  const ownerFID: number = 215781;
  const url =
    "https://graph.cast.k3l.io/scores/personalized/engagement/fids?k=1&limit=1000";
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: `["${ownerFID}"]`,
  };
  let containsUserFID;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    containsUserFID = data.result.some((item: any) => item.fid === userFID);
  } catch (error) {
    console.log(error);
  }
  if (containsUserFID) {
    if (booking["duration"] === undefined) {
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
                    src="https://calcast.vercel.app/calendar.png"
                    width={64}
                    height={64}
                    alt="calendar"
                  />
                </div>
              </div>
              <div
                style={{
                  color: "gray",
                  fontSize: 40,
                }}
              >
                Scheduling Infrastructure for Farcaster
              </div>
            </div>
            <div
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                marginTop: 50,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: 60,
                    marginBottom: 8,
                  }}
                >
                  0xLeo
                </div>
                <hr
                  style={{
                    borderColor: "white",
                    width: 70,
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
                    src="https://calcast.vercel.app/calendar.png"
                    alt="Circular Image"
                    style={{
                      borderRadius: "50%",
                      border: "1px solid white",
                      width: 80,
                      height: 80,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  fontSize: 30,
                  marginTop: 8,
                  alignSelf: "flex-end",
                  color: "gray",
                }}
              >
                Talks about Infrastructure and tooling
              </div>
            </div>
            <div
              style={{
                color: "white",
                alignSelf: "flex-start",
                fontSize: 38,
                marginTop: 10,
              }}
            >
              schedule a call for ?
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
          <Button action="link" target="https://calcast.vercel.app">
            Create shedule
          </Button>,
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
                    gap: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "white", fontSize: 32 }}>OxLeo</div>
                  <img
                    src="https://calcast.vercel.app/calendar.png"
                    alt="Circular Image"
                    style={{
                      borderRadius: "50%",
                      border: "1px solid white",
                      width: 68,
                      height: 68,
                    }}
                  />
                  <img
                    src="https://calcast.vercel.app/calendar.png"
                    width={64}
                    height={64}
                    alt="calendar"
                  />
                </div>
              </div>
              <div
                style={{
                  color: "gray",
                  fontSize: 40,
                }}
              >
                Scheduling Infrastructure for Farcaster
              </div>
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
                marginTop: 50,
                fontSize: 36,
              }}
            >
              Choose a date
            </div>
            <div
              style={{
                color: "white",
                display: "flex",
                gap: 10,
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 10,
              }}
            >
              {dates.map((date, index) => (
                <div
                  key={index}
                  style={{
                    padding: 30,
                    border: index.toString() === d ? "none" : "1px solid gray",
                    borderRadius: 15,
                    backgroundColor: index.toString() === d ? "white" : "none",
                    color: index.toString() === d ? "black" : "white",
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
                    gap: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "white", fontSize: 32 }}>OxLeo</div>
                  <img
                    src="https://calcast.vercel.app/calendar.png"
                    alt="Circular Image"
                    style={{
                      borderRadius: "50%",
                      border: "1px solid white",
                      width: 68,
                      height: 68,
                    }}
                  />
                  <img
                    src="https://calcast.vercel.app/calendar.png"
                    width={64}
                    height={64}
                    alt="calendar"
                  />
                </div>
              </div>
              <div
                style={{
                  color: "gray",
                  fontSize: 40,
                }}
              >
                Scheduling Infrastructure for Farcaster
              </div>
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
                marginTop: 50,
                fontSize: 36,
              }}
            >
              Choose a Time
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
                justifyContent: "flex-start",
                marginTop: 10,
              }}
            >
              {visibleTimeSlots.map((timeSlot, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: 30,
                    padding: 15,
                    backgroundColor:
                      index === parseInt(t) % 4 ? "white" : "none",
                    color: index === parseInt(t) % 4 ? "black" : "white",
                    border:
                      index === parseInt(t) % 4 ? "none" : "1px solid gray",
                    borderRadius: 15,
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

      const res: GenerateCaptchaChallengeOutput =
        await generateCaptchaChallenge(input);

      // console.log(res);
      // ctx.message!.state = res.state;
      // console.log("state");
      // console.log(ctx.message?.state);

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
      const inputText = ctx.message!.inputText || "";
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

      const res: ValidateCaptchaChallengeOutput =
        await validateCaptchaChallenge(input);

      console.log(res);
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
    } else if (booking["booked"] === undefined) {
      const t = booking["t"].toString();
      const d = booking["d"].toString();

      const dur = booking["duration"].toString();

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
                    src="https://calcast.vercel.app/calendar.png"
                    width={64}
                    height={64}
                    alt="calendar"
                  />
                </div>
              </div>
              <div
                style={{
                  color: "gray",
                  fontSize: 40,
                }}
              >
                Scheduling Infrastructure for Farcaster
              </div>
            </div>
            <div
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                marginTop: 60,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: 60,
                    marginBottom: 8,
                  }}
                >
                  0xLeo
                </div>
                <hr
                  style={{
                    borderColor: "white",
                    width: 70,
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
                    src="https://calcast.vercel.app/calendar.png"
                    alt="Circular Image"
                    style={{
                      borderRadius: "50%",
                      border: "1px solid white",
                      width: 80,
                      height: 80,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  fontSize: 30,
                  marginTop: 8,
                  alignSelf: "flex-end",
                  color: "gray",
                }}
              >
                Talks about Infrastructure and tooling
              </div>
            </div>
            <div
              style={{
                color: "white",
                fontSize: 32,
                marginTop: 20,
              }}
            >
              You are about to book a call on 24th at 6:30pm. Book now, to
              confirm.
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
          <Button
            action="tx"
            target="/txdata"
            post_url={`/bookings?duration=${booking["duration"]}&d=${booking["d"]}&datefixed=true&t=${booking["t"]}&timefixed=true&captcha=pending&verified=true&booked=true`}
          >
            Book for 0.05 ETH
          </Button>,
          <Button
            action="post"
            target={`/bookings?duration=${booking["duration"]}&d=${booking["d"]}&datefixed=true&t=${booking["t"]}&timefixed=true&captcha=pending&verified=true&booked=true`}
          >
            Book for 0.05 ETH
          </Button>,
        ],
      };
    } else {
      const t = booking["t"].toString();
      const d = booking["d"].toString();

      const dur = booking["duration"].toString();
      const dates = getNextSixDates();
      const timeslots = createTimeSlots("06:00", "13:00");
      const start_date = new Date(
        2024,
        3,
        parseInt(dates[parseInt(d)]),
        parseInt(timeslots[parseInt(t)].split("-")[0].split(":")[0]),
        parseInt(timeslots[parseInt(t)].split("-")[0].split(":")[1])
      );
      const end_date = new Date(
        2024,
        3,
        parseInt(dates[parseInt(d)]),
        parseInt(timeslots[parseInt(t)].split("-")[1].split(":")[0]),
        parseInt(timeslots[parseInt(t)].split("-")[1].split(":")[1])
      );
      const link = createGoogleCalendarLink(start_date, end_date, "meeting");
      console.log(link);
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
                    src="https://calcast.vercel.app/calendar.png"
                    width={64}
                    height={64}
                    alt="calendar"
                  />
                </div>
              </div>
              <div
                style={{
                  color: "gray",
                  fontSize: 40,
                }}
              >
                Scheduling Infrastructure for Farcaster
              </div>
            </div>
            <div
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                marginTop: 60,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: 60,
                    marginBottom: 8,
                  }}
                >
                  0xLeo
                </div>
                <hr
                  style={{
                    borderColor: "white",
                    width: 70,
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
                    src="https://calcast.vercel.app/calendar.png"
                    alt="Circular Image"
                    style={{
                      borderRadius: "50%",
                      border: "1px solid white",
                      width: 80,
                      height: 80,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  fontSize: 30,
                  marginTop: 8,
                  alignSelf: "flex-end",
                  color: "gray",
                }}
              >
                Talks about Infrastructure and tooling
              </div>
            </div>
            <div
              style={{
                color: "white",
                fontSize: 32,
                marginTop: 20,
              }}
            >
              Your call on 24th at 6:30pm is confirmed 🎉
            </div>
          </div>
        ),
        buttons: [
          <Button
            action="post"
            target={`/bookings?duration=${booking["duration"]}&d=${booking["d"]}&datefixed=true&t=${booking["t"]}`}
          >
            Back
          </Button>,
          <Button action="link" target={link}>
            Add to Calender
          </Button>,
        ],
      };
    }
  } else {
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
                  src="https://calcast.vercel.app/calendar.png"
                  width={64}
                  height={64}
                  alt="calendar"
                />
              </div>
            </div>
            <div
              style={{
                color: "gray",
                fontSize: 40,
              }}
            >
              Scheduling Infrastructure for Farcaster
            </div>
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              marginTop: 50,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 60,
                  marginBottom: 8,
                }}
              >
                0xLeo
              </div>
              <hr
                style={{
                  borderColor: "white",
                  width: 70,
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
                  src="https://calcast.vercel.app/calendar.png"
                  alt="Circular Image"
                  style={{
                    borderRadius: "50%",
                    border: "1px solid white",
                    width: 80,
                    height: 80,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontSize: 30,
                marginTop: 8,
                alignSelf: "flex-end",
                color: "gray",
              }}
            >
              Talks about Infrastructure and tooling
            </div>
          </div>
          <div
            style={{
              color: "white",
              alignSelf: "flex-start",
              fontSize: 38,
              marginTop: 10,
            }}
          >
            Sorry. You havent met the criteria to schedule a call
          </div>
        </div>
      ),
      buttons: [
        <Button action="post" target="/dashboard">
          TryAgain
        </Button>,
      ],
    };
  }
});

export const POST = handleRequest;
