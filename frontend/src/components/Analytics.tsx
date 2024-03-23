"use client";
import * as React from "react";
import { Minus, Plus } from "lucide-react";
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

export class Chart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-area-chart-4ujxw";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

// Function to format date in YYYY-MM-DD HH:MM:SS format
function formatDate(date: Date) {
  const isoDate = date.toISOString();
  const dateParts = isoDate.split(/[T.]/);
  const time = dateParts[1].split(":").slice(0, 3).join(":");
  return `${dateParts[0]} ${time}`;
}

export default function Analytics() {
  const [data, setData] = useState(null);
  const frame_id = "0x1234";

  useEffect(() => {
    // Values in YYYY-MM-DD HH:MM:SS format
    const today = new Date();
    fetch(
      `https://api.pinata.cloud/farcaster/frames/interactions?frame_id=${frame_id}&start_date=${
        // A very old date
        formatDate(new Date(0))
      }&end_date=${formatDate(today)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT || ""}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("Chart data: ", response);
        setData(response);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-zinc-900" variant={"outline"}>
          View Analytics 📈
        </Button>
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
              {/* <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button> */}
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">123</div>
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
              <Chart />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
