import { STORAGE_REGISTRY_ADDRESS } from "@farcaster/core";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
} from "viem";
import { baseSepolia, base } from "viem/chains";
import { storageRegistryABI } from "./contracts/storage-registry";
import { err } from "neverthrow";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  try {
    const json = await req.json();

    const frameMessage = await getFrameMessage(json);

    if (!frameMessage) {
      throw new Error("No frame message");
    }

    // Get current storage price
    const units = BigInt(1);

    const calldata = encodeFunctionData({
      abi: storageRegistryABI,
      functionName: "createProfile",
      args: [
        BigInt(1),
        [BigInt(1), BigInt(1)],
        [BigInt(1), BigInt(1)],
        [BigInt(1), BigInt(1)],
        "Hello",
      ],
    });

    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });

    const storageRegistry = getContract({
      address: "0x935A5B36C923CDFfD3986f2488E92Cf2D1d8c09D",
      abi: storageRegistryABI,
      client: publicClient,
    });

    return NextResponse.json({
      chainId: "eip155:84532", // OP Mainnet 10
      method: "eth_sendTransaction",
      params: {
        abi: storageRegistryABI as Abi,
        to: "0x935A5B36C923CDFfD3986f2488E92Cf2D1d8c09D",
        data: calldata,
        value: "0",
      },
    });
  } catch (error) {
    console.log(error);
    const calldata = encodeFunctionData({
      abi: storageRegistryABI,
      functionName: "createProfile",
      args: [
        BigInt(1),
        [BigInt(1), BigInt(1)],
        [BigInt(1), BigInt(1)],
        [BigInt(1), BigInt(1)],
        "Hello",
      ],
    });
    return NextResponse.json({
      chainId: "eip155:84532", // OP Mainnet 10
      method: "eth_sendTransaction",
      params: {
        abi: storageRegistryABI as Abi,
        to: "0x935A5B36C923CDFfD3986f2488E92Cf2D1d8c09D",
        data: calldata,
        value: "0",
      },
    });
  }
}
