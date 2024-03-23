export const createGoogleCalendarLink = (
  startDate: Date,
  endDate: Date,
  title: string
): string => {
  // Format the start and end dates in the required format (YYYYMMDDTHHMMSSZ)
  const formattedStartDate =
    startDate.toISOString().replace(/[:-]/g, "").slice(0, -5) + "Z";
  const formattedEndDate =
    endDate.toISOString().replace(/[:-]/g, "").slice(0, -5) + "Z";

  // Encode the title for the URL
  const encodedTitle = encodeURIComponent(title);

  // Construct the Google Calendar link
  const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${formattedStartDate}%2F${formattedEndDate}&text=${encodedTitle}`;

  return calendarLink;
};

// Example usage:
const startDate = new Date("2024-03-23T17:45:00Z");
const endDate = new Date("2024-03-23T18:15:00Z");
const title = "Meeting";
