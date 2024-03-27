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
import { SUBGRAPH_URL } from "@/lib/consts";
import { request, gql } from "graphql-request";

import { PinataFDK } from "pinata-fdk";
const pinataJwt = process.env.NEXT_PUBLIC_PINATA_JWT || "";
const fdk = new PinataFDK({
  pinata_jwt: pinataJwt,
  pinata_gateway: "",
});

async function gettimeslot(farcasterId: string) {
  try {
    const data: any = await request(
      SUBGRAPH_URL,
      gql`
        query GetProfile {
            profiles(where: {farcasterId: "${farcasterId}"}) {
              timeSlots
            }
        }
      `,
      {}
    );
    console.log("Profile: ", data?.profiles?.[0].timeSlots);
    return data?.profiles?.[0].timeSlots;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function getkarma(farcasterId: string) {
  try {
    const data: any = await request(
      SUBGRAPH_URL,
      gql`
        query GetProfile {
            profiles(where: {farcasterId: "${farcasterId}"}) {
                            karmaGatingEnabled

            }
        }
      `,
      {}
    );
    console.log("Profile: ", data);
    return data?.profiles?.[0].karmaGatingEnabled;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const handleRequest = frames(async (ctx) => {
  const body = await ctx.request.json();

  const encodedString = ctx.searchParams["fid"].toString();
  const decodedString = atob(encodedString);
  const decodedJSON = JSON.parse(decodedString);
  const ownerFID = decodedJSON.fid;

  // const karma = getkarma(ownerFID); // use this to emable this

  ///

  const ownerName = ctx.searchParams["name"];
  const ownerimg = ctx.searchParams["img"];
  const ownerbio = ctx.searchParams["bio"];

  const booking = ctx.searchParams;
  console.log(ctx);
  const userFID: number = ctx.message!.requesterFid;

  if (booking["duration"] === undefined) {
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
      const frameData = {
        untrustedData: body.untrustedData,
        trustedData: body.trustedData,
      };
      console.log(frameData);
      const frame_id = `${ownerFID}_15`;
      // const custom_id = ;
      try {
        console.log("sending");
        await fdk.sendAnalytics("389273_15", frameData, "booking");
      } catch (error) {
        console.log(error);
      }
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
                  {ownerName}
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
                    src={ownerimg}
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
                {ownerbio}
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
          <Button
            action="post"
            target={`/bookings?fid=${ctx.searchParams[
              "fid"
            ].toString()}&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}&duration=30`}
          >
            30min
          </Button>,
          <Button
            action="post"
            target={`/bookings?fid=${ctx.searchParams[
              "fid"
            ].toString()}&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}&duration=15`}
          >
            15min
          </Button>,
          <Button action="link" target="https://calcast.vercel.app">
            Create shedule
          </Button>,
        ],
      };
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
                  {ownerName}
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
                    src={ownerimg}
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
                {ownerbio}
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
          <Button
            action="post"
            target={`/dashboard?fid=${ctx.searchParams[
              "fid"
            ].toString()}&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
          >
            TryAgain
          </Button>,
        ],
      };
    }
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
                <div style={{ color: "white", fontSize: 32 }}>{ownerName}</div>
                <img
                  src={ownerimg}
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
        <Button
          action="post"
          target={`/bookings?fid=${ctx.searchParams["fid"].toString()}`}
        >
          back
        </Button>,
        <Button
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            parseInt(booking["d"].toString()) - 1
          }&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
        >
          ⬅️
        </Button>,
        <Button
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            parseInt(booking["d"].toString()) + 1
          }&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
        >
          ➡️
        </Button>,
        <Button
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            booking["d"]
          }&datefixed=true&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
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
    const timeSlots = await gettimeslot(ownerFID);
    const timeslots = createTimeSlots(timeSlots);
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
                <div style={{ color: "white", fontSize: 32 }}>{ownerName}</div>
                <img
                  src={ownerimg}
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
              gap: 20,
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
                  paddingLeft: 20,
                  backgroundColor: index === parseInt(t) % 4 ? "white" : "none",
                  color: index === parseInt(t) % 4 ? "black" : "white",
                  border: index === parseInt(t) % 4 ? "none" : "1px solid gray",
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
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            booking["d"]
          }&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
        >
          back
        </Button>,
        <Button
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            booking["d"]
          }&datefixed=true&t=${
            parseInt(booking["t"].toString()) - 1
          }&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
        >
          ⬅️
        </Button>,
        <Button
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            booking["d"]
          }&datefixed=true&t=${
            parseInt(booking["t"].toString()) + 1
          }&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
        >
          ➡️
        </Button>,
        <Button
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            booking["d"]
          }&datefixed=true&t=${
            booking["t"]
          }&timefixed=true&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
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
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            booking["d"]
          }&datefixed=true&t=${
            booking["t"]
          }&timefixed=true&captcha=pending&captchaId=${
            res.state.captchaId
          }&hashvalue=${
            res.state.valueHash
          }&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
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

    const res: ValidateCaptchaChallengeOutput = await validateCaptchaChallenge(
      input
    );

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
              ? `/bookings?fid=${ctx.searchParams["fid"].toString()}&duration=${
                  booking["duration"]
                }&d=${booking["d"]}&datefixed=true&t=${
                  booking["t"]
                }&timefixed=true&captcha=pending&verified=true&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`
              : `/bookings?fid=${ctx.searchParams["fid"].toString()}&duration=${
                  booking["duration"]
                }&d=${booking["d"]}&datefixed=true&t=${
                  booking["t"]
                }&timefixed=true&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`
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
                {ownerName}
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
                  src={ownerimg}
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
              {ownerbio}
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
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            booking["d"]
          }&datefixed=true&t=${
            booking["t"]
          }&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
        >
          back
        </Button>,
        <Button
          action="tx"
          target={`/txdata?fid=${ctx.searchParams["fid"].toString()}&duration=${
            booking["duration"]
          }&d=${booking["d"]}&datefixed=true&t=${
            booking["t"]
          }&timefixed=true&captcha=pending&verified=true&booked=true&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}&userfid=${
            ctx.message!.requesterFid
          }&owner=${ownerFID}`}
          post_url={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            booking["d"]
          }&datefixed=true&t=${
            booking["t"]
          }&timefixed=true&captcha=pending&verified=true&booked=true&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
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
    const timeSlots = await gettimeslot(ownerFID);
    const timeslots = createTimeSlots(timeSlots);
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
                {ownerName}
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
                  src={ownerimg}
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
              {ownerbio}
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
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&duration=${booking["duration"]}&d=${
            booking["d"]
          }&datefixed=true&t=${
            booking["t"]
          }&name=${ownerName}&img=${ownerimg}&bio=${ownerbio}`}
        >
          Back
        </Button>,
        <Button action="link" target={link}>
          Add to Calender
        </Button>,
      ],
    };
  }
});

export const POST = handleRequest;
