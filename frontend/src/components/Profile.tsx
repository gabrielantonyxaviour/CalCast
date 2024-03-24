"use client";
import { SUBGRAPH_URL } from "@/lib/consts";
import { request, gql } from "graphql-request";
import { useState, useEffect } from "react";
import CreateProfile from "@/components/CreateProfile";
import { usePrivy } from "@privy-io/react-auth";

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

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const { user, ready } = usePrivy();
  const [farcasterId, setFarcasterId] = useState<any>(0);

  useEffect(() => {
    if (ready && user && user.farcaster) {
      setFarcasterId(user?.farcaster?.fid);
    }
    getProfile(farcasterId).then((profile) => setProfile(profile));
  }, [farcasterId]);
  return (
    <div className="flex my-2">
      {profile ? (
        <div className="ml-5">
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      ) : (
        <CreateProfile />
      )}
    </div>
  );
}
