/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const userFID: number = 2134;
  const ownerFID: number = 2134;
  if (userFID !== ownerFID) {
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
                  fontSize: 80,
                  marginBottom: 8,
                }}
              >
                0xLeo
              </div>
              <hr
                style={{
                  borderColor: "white",
                  width: 80,
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
                    width: 90,
                    height: 90,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontSize: 40,
                marginTop: 8,
                alignSelf: "flex-end",
                color: "gray",
              }}
            >
              Talks about Infrastructure and tooling
            </div>
          </div>
        </div>
      ),
      buttons: [
        <Button action="post" target="/bookings">
          Schedule a call now!
        </Button>,
      ],
    };
  } else {
    const combinations = [
      ["0xFaby", "24/3", "6.30 - 7.00"],

      ["0xFaby", "25/3", "6.30 - 7.00"],

      ["0xGabby", "24/3", "7.00 - 7.30"],
      ["0xGabby", "25/3", "7.00 - 7.30"],
    ];
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

          {/* <div
            style={{ display: "flex", flexDirection: "column", color: "white" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "150px", fontWeight: "bold" }}>
                User Name
              </div>
              <div style={{ width: "100px", fontWeight: "bold" }}>Date</div>
              <div style={{ width: "150px", fontWeight: "bold" }}>
                Time Slot
              </div>
            </div>
            {combinations.map((combination, index) => (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ width: "150px" }}>{combination[0]}</div>
                <div style={{ width: "100px" }}>{combination[1]}</div>
                <div style={{ width: "150px" }}>{combination[2]}</div>
              </div>
            ))}
          </div> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "white",
              fontSize: 35,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  width: "200px",
                  fontWeight: "bold",
                  marginRight: "5px",
                }}
              >
                User Name
              </div>
              <div
                style={{
                  width: "150px",
                  fontWeight: "bold",
                  marginRight: "5px",
                }}
              >
                Date
              </div>
              <div style={{ width: "200px", fontWeight: "bold" }}>
                Time Slot
              </div>
            </div>
            {combinations.map((combination, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: "5px",
                  fontSize: 30,
                  alignItems: "center",
                }}
              >
                <div style={{ width: "200px", marginRight: "5px" }}>
                  {combination[0]}
                </div>
                <div style={{ width: "150px", marginRight: "5px" }}>
                  {combination[1]}
                </div>
                <div style={{ width: "200px" }}>{combination[2]}</div>
              </div>
            ))}
          </div>
        </div>
      ),
      buttons: [
        <Button action="post" target="/bookings">
          Analytics
        </Button>,
        <Button action="link" target="https://calcast.vercel.app">
          Go to app
        </Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
