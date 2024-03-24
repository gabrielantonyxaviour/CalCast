"use client";
import { useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { encodeFunctionData } from "viem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { CONTRACT_ADDRESS, ABI } from "@/lib/consts";
import { useWriteContract } from "wagmi";

export default function CreateProfile() {
  const { writeContract } = useWriteContract();
  const { ready, user } = usePrivy();

  const [profile, setProfile] = useState<{
    _karmaGatingEnabled: boolean;
    _profileMetadata: string;
    _price: number;
    _startTimeInSecs: number;
    _endTimeInSecs: number;
  }>({
    _karmaGatingEnabled: false,
    _profileMetadata: "",
    _price: 0,
    _startTimeInSecs: 0,
    _endTimeInSecs: 0,
  });

  function generateTimeSlots(startTime: number, endTime: number): number[] {
    let slots = [];
    for (let i = startTime; i <= endTime; i += 900) {
      slots.push(i);
    }
    return slots;
  }

  async function createProfile() {
    // const wallet = wallets[0]; // Replace this with your desired wallet
    // console.log("Wallet: ", wallet);
    // const provider = await wallet.getEthereumProvider();
    const args = [
      user?.farcaster?.fid, // Farcaster ID
      generateTimeSlots(profile._startTimeInSecs, profile._endTimeInSecs), // Time slots
      [900], // Time periods
      [profile._price], // Pricing
      profile._karmaGatingEnabled, // Karma Gating
      profile._profileMetadata, // Metadata
    ];

    writeContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "createProfile",
      args: args,
    });

    console.log("Creating profile with args: ", args);

    // const transactionHash = await provider.request({
    //   method: "eth_sendTransaction",
    //   params: [
    //     {
    //       from: wallet.address,
    //       to: CONTRACT_ADDRESS,
    //       data: encodeFunctionData({
    //         abi: ABI,
    //         functionName: "createProfile",
    //         args: args,
    //       }),
    //       //   value: 100000, // Only necessary for payable methods
    //     },
    //   ],
    // });

    // console.log("Transaction hash: ", transactionHash);
  }

  return (
    <>
      {ready && user && user.farcaster ? (
        <section className="p-5 rounded-xl flex w-full flex-col justify-start items-start">
          <div className="grid grid-cols-4 w-full items-start gap-5">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Choose Location</Label>
              <Input
                onChange={(e) => {
                  setProfile({
                    ...profile,
                    _profileMetadata: e.target.value,
                  });
                }}
                type="text"
                className="bg-black"
                placeholder="Huddle01 Url, Zoom Link, etc."
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Set Price</Label>
              <Input
                onChange={(e) => {
                  setProfile({
                    ...profile,
                    _price: parseInt(e.target.value),
                  });
                }}
                type="number"
                className="bg-black"
                placeholder="Amount to charge per call"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Choose availability (start/end):</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  onChange={(e) => {
                    var a = e.target.value.split(":"); // split it at the colons
                    var seconds = +a[0] * 60 * 60 + +a[1] * 60;
                    setProfile({
                      ...profile,
                      _startTimeInSecs: seconds,
                    });
                  }}
                  type="time"
                  className="bg-black"
                  placeholder="Start time"
                />
                <Input
                  onChange={(e) => {
                    var a = e.target.value.split(":"); // split it at the colons
                    var seconds = +a[0] * 60 * 60 + +a[1] * 60;
                    // minutes are worth 60 seconds. Hours are worth 60 minutes.
                    setProfile({
                      ...profile,
                      _endTimeInSecs: seconds,
                    });
                  }}
                  type="time"
                  className="bg-black"
                  placeholder="End time"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 mb-5">
              <Label htmlFor="name">Enable Karma Gating</Label>
              <Toggle
                variant={"outline"}
                aria-label="Toggle italic"
                onClick={() => {
                  profile._karmaGatingEnabled
                    ? setProfile({ ...profile, _karmaGatingEnabled: false })
                    : setProfile({ ...profile, _karmaGatingEnabled: true });
                }}
              >
                Karma Gating
              </Toggle>
            </div>
          </div>

          <Button
            onClick={createProfile}
            variant={"outline"}
            className="bg-black hover:bg-white hover:text-black flex w-full mt-2"
          >
            Create Profile
          </Button>
        </section>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
