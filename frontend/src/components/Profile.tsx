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
    <div className=" ring-1 ring-zinc-900 rounded-xl flex flex-col justify-center items-center my-2">
      <h1 className="rounded-xl bg-zinc-900 font-bold w-full text-2xl p-4">
        1. View/Create your Calcast Profile
      </h1>
      {profile ? (
        <div className="">
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      ) : (
        <CreateProfile />
      )}
    </div>
  );
}
