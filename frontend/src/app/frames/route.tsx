/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { init, fetchQuery } from "@airstack/node";

const handleRequest = frames(async (ctx) => {
  const ownerFID: number = 215781;
  init("1f9e41f9f56744c71a61d1cb98fed31cd");
  const query = `query MyQuery {
  Socials(
    input: {
      filter: { dappName: { _eq: farcaster }, identity: { _eq: "fc_fid:${ownerFID}" } }
      blockchain: ethereum
    }
  ) {
    Social {
      id
      chainId
      blockchain
      dappName
      dappSlug
      dappVersion
      userId
      userAddress
      userCreatedAtBlockTimestamp
      userCreatedAtBlockNumber
      userLastUpdatedAtBlockTimestamp
      userLastUpdatedAtBlockNumber
      userHomeURL
      userRecoveryAddress
      userAssociatedAddresses
      profileBio
      profileDisplayName
      profileImage
      profileUrl
      profileName
      profileTokenId
      profileTokenAddress
      profileCreatedAtBlockTimestamp
      profileCreatedAtBlockNumber
      profileLastUpdatedAtBlockTimestamp
      profileLastUpdatedAtBlockNumber
      profileTokenUri
      isDefault
      identity
      fnames
    }
  }
}
`;

  const { data, error } = await fetchQuery(query);

  console.log("data:", data.Socials.Social[0].profileDisplayName);
  const ownerName = data.Socials.Social[0].profileDisplayName;
  const ownerimg = data.Socials.Social[0].profileImage;
  const ownerbio = data.Socials.Social[0].profileBio;

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
                fontSize: 80,
                marginBottom: 8,
              }}
            >
              {ownerName}
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
                src={ownerimg}
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
              fontSize: 30,
              marginTop: 8,
              alignSelf: "flex-end",
              color: "gray",
            }}
          >
            {ownerbio}
          </div>
        </div>
      </div>
    ),
    buttons: [
      <Button action="post" target="/dashboard">
        Start
      </Button>,
      <Button action="link" target="https://calcast.vercel.app">
        Go to app
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
