import { Button } from "frames.js/next";
import { frames } from "../frames";
import { getNextSixDates } from "@/lib/date";
import { createTimeSlots } from "@/lib/time";

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
  } else {
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
  }
});

export const POST = handleRequest;
