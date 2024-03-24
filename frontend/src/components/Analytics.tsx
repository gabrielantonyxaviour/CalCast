"use client";
import * as React from "react";
import { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { usePrivy } from "@privy-io/react-auth";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Chart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data?.time_periods}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period_start_time" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="interactions"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Function to format date in YYYY-MM-DD HH:MM:SS format
function formatDate(date: Date) {
  const isoDate = date.toISOString();
  const dateParts = isoDate.split(/[T.]/);
  const time = dateParts[1].split(":").slice(0, 3).join(":");
  return `${dateParts[0]} ${time}`;
}

export default function Analytics() {
  const [data, setData] = useState<any>(null);
  const [frameId, setFrameId] = useState<string>("");
  const { user, ready } = usePrivy();

  async function fetchAnalytics(frameId: string) {
    const today = new Date();
    const query = `https://api.pinata.cloud/farcaster/frames/interactions?frame_id=${frameId}&start_date=${
      // A very old date
      encodeURIComponent("2021-01-01 00:00:00")
    }&end_date=${encodeURIComponent(formatDate(today))}`;

    console.log(query);
    fetch(query, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT || ""}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        console.log("Chart data: ", data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (ready && user && user.farcaster) {
      setFrameId(`${user?.farcaster?.fid}_15`);
      if (frameId) {
        console.log("Loading analytics for frame ID: ", frameId);
        fetchAnalytics(frameId);
      } else {
        console.error("No frame ID found for user. Can't render analytics.");
      }
    }
  }, []);

  return ready && user && user.farcaster ? (
    <div className="ring-1 ring-zinc-900 rounded-xl">
      <div className="flex flex-col p-4 bg-zinc-900 rounded-xl ">
        <h1 className="font-bold w-full text-2xl">3. View frame analytics</h1>
        {/* <p className="mt-2 text-sm text-zinc-400">
          Track your frame interactions and performance over time using
          Pinata&apos;s Frame Analytics.
        </p> */}
      </div>
      <Drawer>
        <DrawerTrigger asChild className="my-2 p-4">
          <div className="flex justify-between items-center">
            <p>
              Track your frame interactions and performance over time using
              Pinata&apos;s Frame Analytics.{" "}
            </p>
            <Button className="bg-black rounded-xl" variant={"ghost"}>
              View Analytics 📈
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-black">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Frame Analytics</DrawerTitle>
              <DrawerDescription>
                Your aggregated frame interaction data - powered by Pinata APIs.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {data?.total_interactions || 0}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    Total interactions
                  </div>
                </div>
                {/* <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button> */}
              </div>
              <div className="mt-3 h-[120px]">
                {data ? <Chart data={data} /> : <div>Loading...</div>}
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
              <Button onClick={() => fetchAnalytics(frameId)} variant="ghost">
                Refresh
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  ) : (
    <div>Loading</div>
  );
}
