import Link from "next/link";
import BaseLayout from "@/components/layouts/BaseLayout";
import Analytics from "@/components/Analytics";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import Profile from "@/components/Profile";
import Share from "@/components/Share";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "CalCast",
    description: "Scheduling infrastructure for the new social.",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames?fid=eyJmaWQiOjIxNTc4MSwiZHVyYXRpb24iOjE1fQ==",
          "https://calcast.vercel.app" || "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  return (
    <BaseLayout pageTitle="Good day, ser!">
      <Profile />
      <Share />
      <Analytics />
    </BaseLayout>
  );
}
