import {
  differenceInDays,
  format,
  fromUnixTime,
  startOfDay,
  subHours,
} from "date-fns";

export const getOrdinalSuffix = (day: number) => {
  if (day >= 11 && day <= 13) return "th"; // Special cases for 11th, 12th, 13th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDate = (unixTimestamp: number) => {
  const date = fromUnixTime(unixTimestamp);
  const day = date.getUTCDate();
  const suffix = getOrdinalSuffix(day);

  return `${day}${suffix} ${format(date, "MMM yyyy", { useAdditionalDayOfYearTokens: true })}`;
};

export const getOrdinalDay = (day: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = day % 100;
  return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

export const formatTimeWithOffset = (date: Date) => {
  const offsetDate = subHours(date, 10);
  return format(offsetDate, "h:mm a");
};

export function getDaysDifferenceFromToday(
  unixTimestamp: number,
  todayUnix?: number,
): number {
  const eventDate = fromUnixTime(unixTimestamp);
  const todayDate = todayUnix ? fromUnixTime(todayUnix) : new Date();

  // Use date-fns to get difference in days
  return differenceInDays(startOfDay(eventDate), startOfDay(todayDate));
}

export const formatTime = (unixTimestamp: number): string => {
  const date = fromUnixTime(unixTimestamp);
  return format(date, "h:mm a");
};
