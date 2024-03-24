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
              receivedBookings {
                day
                id
                month
                timeStartInSeconds
                timePeriodInSeconds
                year
              }
            }
        }
      `,
      {}
    );
    console.log(`Profile for ${farcasterId}: `, data);
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
  }, [farcasterId, profile]);
  return (
    <div className=" ring-1 ring-zinc-900 rounded-xl flex flex-col justify-center items-center my-2">
      <h1 className="rounded-xl bg-zinc-900 font-bold w-full text-2xl p-4">
        1. View/Create your Calcast Profile
      </h1>
      {profile ? (
        <div className="p-4 rounded grid grid-cols-3 gap-3 justify-start">
          <p>Karma enabled: {profile.karmaGatingEnabled ? "Yes" : "No"}</p>
          <p>Meeting location: {profile.metadata}</p>
          <p>
            Your availability: {parseInt(profile.timeSlots[0]) / 60 / 60} -{" "}
            {parseInt(profile.timeSlots[profile.timeSlots.length - 1]) /
              60 /
              60}
          </p>
          <p>Your meeting price: {profile.prices?.[0]}</p>
          <p>
            Your meeting types:{" "}
            {profile?.timePeriods[0] == "900" ? "15 min" : "30 mins"}
          </p>
          <p>
            Your earnings: {profile.totalEarnings} from {profile.totalBookings}{" "}
            bookings
          </p>
          <p>
            Your bookings:{" "}
            {profile.receivedBookings.length > 0
              ? profile?.receivedBookings?.map((booking: any) => {
                  return `${booking.day}/${booking.month}/${booking.year} at ${
                    booking.timeStartInSeconds / 60 / 60
                  } for ${booking.timePeriodInSeconds / 60 / 60} hours`;
                })
              : "No bookings yet"}
          </p>
        </div>
      ) : (
        <CreateProfile />
      )}
    </div>
  );
}
