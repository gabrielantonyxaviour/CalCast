"use client";
import { SUBGRAPH_URL } from "@/lib/consts";
import { request, gql } from "graphql-request";
import { useState, useEffect } from "react";

async function getProfile(farcasterId: string) {
  try {
    const data: any = await request(
      SUBGRAPH_URL,
      gql`
        query GetProfile {
            profiles(where: {farcasterId: "${farcasterId}"}) {
              farcasterId
              id
              karmaGatingEnabled
              metadata
              prices
              timePeriods
              timeSlots
              totalBookings
              totalEarnings
              transactionHash
            }
        }
      `,
      {}
    );
    console.log("Profile: ", data);
    return data?.profiles?.[0];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default function Profile({
  farcasterId,
}: Readonly<{ farcasterId: string }>) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile(farcasterId).then((profile) => setProfile(profile));
  }, [farcasterId]);
  return (
    <div className="flex mt-5">
      <h1>Your Preferences: </h1>
      {profile ? (
        <div className="ml-5">
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      ) : (
        <p className="ml-5">{"No profile found."}</p>
      )}
    </div>
  );
}
