import Link from "next/link";
import BaseLayout from "@/components/layouts/BaseLayout";
import CreateSlot from "@/components/CreateSlot";
import Analytics from "@/components/Analytics";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "CalCast",
    description: "Scheduling infrastructure for the new social.",
    other: {
      ...(await fetchMetadata(
        new URL("/frames", process.env.HOST || "http://localhost:3000")
      )),
    },
  };
}

export default async function Home() {
  return (
    <BaseLayout pageTitle="Dashboard">
      <Analytics />
      <CreateSlot />
    </BaseLayout>
  );
}
