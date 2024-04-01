/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../../frames";

function formatDate(date: Date) {
  const isoDate = date.toISOString();
  const dateParts = isoDate.split(/[T.]/);
  const time = dateParts[1].split(":").slice(0, 3).join(":");
  return `${dateParts[0]} ${time}`;
}

const handleRequest = frames(async (ctx) => {
  const encodedString = ctx.searchParams["fid"].toString();
  const decodedString = atob(encodedString);
  const decodedJSON = JSON.parse(decodedString);
  const ownerFID = decodedJSON.fid;
  const frame_id = `${ownerFID}_15`;
  const today = new Date();

  const response = await fetch(
    `https://api.pinata.cloud/farcaster/frames/interactions?frame_id=${frame_id}&start_date=${formatDate(
      new Date(0)
    )}&end_date=${formatDate(today)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT || ""}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  console.log("Chart data: ", data);

  interface TimePeriod {
    interactions: number;
    period_start_time: string;
    unique_interactions: number;
  }

  interface Result {
    time_periods: TimePeriod[];
    total_interactions: number;
    total_unique_interactions: number;
  }

  // const result: Result = {
  //   time_periods: [
  //     {
  //       interactions: 71,
  //       period_start_time: "2024-03-15 00:00:00",
  //       unique_interactions: 18,
  //     },
  //     {
  //       interactions: 23,
  //       period_start_time: "2024-03-17 00:00:00",
  //       unique_interactions: 20,
  //     },
  //     {
  //       interactions: 56,
  //       period_start_time: "2024-03-18 00:00:00",
  //       unique_interactions: 39,
  //     },
  //   ],
  //   total_interactions: 73,
  //   total_unique_interactions: 20,
  // };
  const result: Result = data as Result;
  console.log(result);

  // Initialize arrays to hold labels and data for each dataset
  const labels: string[] = [];
  const interactionData: number[] = [];
  const uniqueInteractionData: number[] = [];

  // Extract data from the result object
  result.time_periods.forEach((period) => {
    const date = period.period_start_time.split(" ")[0];

    labels.push(date);

    interactionData.push(period.interactions);
    uniqueInteractionData.push(period.unique_interactions);
  });

  // Construct the chart data object
  const chartData = {
    type: "line",
    data: {
      labels: labels,
      datasets: [{ label: "interaction", data: interactionData }],
    },
  };

  // Encode the chart data object
  const encodedChartData = encodeURIComponent(JSON.stringify(chartData));

  // Construct the URL
  const chartUrl = `https://quickchart.io/chart?c=${encodedChartData}&width=280&height=150`;

  console.log(chartUrl);

  return {
    accepts: [
      {
        id: "farcaster",
        version: "vNext",
      },
      {
        id: "xmtp",
        version: "vNext",
      },
    ],
    image: chartUrl,
    imageOptions: {
      aspectRatio: "1.91:1",
    },
    buttons: [
      <Button
        action="post"
        target={`/dashboard?fid=${ctx.searchParams["fid"].toString()}`}
      >
        Back
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
