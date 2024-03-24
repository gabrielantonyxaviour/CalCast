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

export default function CreateProfile() {
  const [profile, setProfile] = useState<{
    _karmaGatingEnabled: boolean;
    _profileMetadata: string;
    _prices: number[];
    _timePeriods: number[];
    _timeSlots: number[];
  }>({
    _karmaGatingEnabled: false,
    _profileMetadata: "",
    _prices: [],
    _timePeriods: [],
    _timeSlots: [],
  });
  const { connectWallet, user } = usePrivy();
  const { ready, wallets } = useWallets();

  async function createProfile() {
    const wallet = wallets[0]; // Replace this with your desired wallet
    const provider = await wallet.getEthereumProvider();

    const transactionHash = await provider.request({
      method: "eth_sendTransaction",
      params: [
        {
          to: CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi: ABI,
            functionName: "createProfile",
            args: [
              user?.farcaster?.fid, // Farcaster ID
              profile._karmaGatingEnabled,
              user?.farcaster?.ownerAddress, // Profile Metadata
              profile._prices,
              profile._timePeriods,
              profile._timeSlots,
            ],
          }),
          //   value: 100000, // Only necessary for payable methods
        },
      ],
    });

    console.log("Transaction hash: ", transactionHash);
  }

  return (
    <form className="flex w-full flex-col justify-start items-start">
      <div className="grid grid-cols-3 w-full items-start gap-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Set Price</Label>
          <Input
            type="number"
            className="bg-black"
            placeholder="Amount to charge per call"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Choose availability (start/end):</Label>
          <Input
            type="datetime-local"
            className="bg-black"
            placeholder="Start time"
          />
          <Input
            type="datetime-local"
            className="bg-black"
            placeholder="End time"
          />
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
        variant={"outline"}
        className="bg-black hover:bg-white hover:text-black flex w-full mt-5"
      >
        Create Profile
      </Button>
    </form>
  );
}
