export function createTimeSlots(startTime: string, endTime: string): string[] {
  const slots: string[] = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    const nextTime = add30Minutes(currentTime);
    slots.push(`${currentTime} - ${nextTime}`);
    currentTime = nextTime;
  }

  return slots;
}

function add30Minutes(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + 30;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  return `${padWithZero(newHours)}:${padWithZero(newMinutes)}`;
}
function padWithZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
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
