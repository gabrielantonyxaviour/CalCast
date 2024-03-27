export function createTimeSlots(periods: any[]): string[] {
  const slots: string[] = [];

  for (const period of periods) {
    const seconds = parseInt(period);
    slots.push(convertSecondsToTime(seconds));
  }

  return slots;
}

function convertSecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutesDecimal = (seconds / 3600 - hours) * 60;
  const minutes = Math.floor(minutesDecimal);

  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0")
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
