export function createTimeSlots(startTime: string, endTime: string): string[] {
  const slots: string[] = [];
  var a = startTime.split(":"); // split it at the colons
  let startTimeInSeconds = +a[0] * 60 * 60 + +a[1] * 60;
  let currentTime = startTimeInSeconds;
  var b = endTime.split(":"); // split it at the colons
  let endTimeInSeconds = +b[0] * 60 * 60 + +b[1] * 60;
  for (let i = startTimeInSeconds; i <= endTimeInSeconds; i += 900) {
    slots.push(convertSecondsToTime(i));
  }

  return slots;
}

function convertSecondsToTime(seconds: number): string {
  return (
    Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (seconds % 60).toString().padStart(2, "0") +
    seconds
  );
}

export function generateTimeSlots(startTime: string, endTime: string): string {
  const slots = [];
  let current = startTime;

  while (current <= endTime) {
    const next = new Date(current);
    next.setMinutes(next.getMinutes() + 30);
    const endTimeFormatted = next.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    slots.push(`${current} - ${endTimeFormatted}`);
    current = endTimeFormatted;
  }

  return slots.join(",");
}

export function generateTimePeriods(
  startTime: string,
  endTime: string
): number[] {
  const slots = [];
  let current = startTime;

  while (current <= endTime) {
    const next = new Date(current);
    next.setMinutes(next.getMinutes() + 30);
    const endTimeFormatted = next.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    slots.push(`${current} - ${endTimeFormatted}`);
    current = endTimeFormatted;
  }

  return slots.map((time) => parseInt(time));
}
