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
                id
                farcasterId
                creatorAddress
                minimumKarma
                timePeriods
                timeSlots
                totalBookings
                totalEarnings
                transactionHash
                metadata
                prices
            }
        }
      `,
      {}
    );
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
    <div>
      <h1>Profile</h1>
      {profile ? (
        <div>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
