// dateUtils.ts

type DateComponents = {
  year: number;
  month: number;
  day: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

function getLocalDateComponents(): DateComponents {
  const now = new Date();
  const localDate = new Date(now.getTime());

  return {
    year: localDate.getFullYear(),
    month: localDate.getMonth() + 1, // 월은 0부터 시작하므로 1을 더함
    day: localDate.getDate(),
    hours: localDate.getHours(),
    minutes: localDate.getMinutes(),
    seconds: localDate.getSeconds(),
  };
}

export function getYearMonthDay(): string {
  const { year, month, day } = getLocalDateComponents();

  // 년, 월, 일 추출
  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');

  return `${year}-${paddedMonth}-${paddedDay}`;
}

export function getYearMonthDayTime(): string {
  const { year, month, day, hours, minutes, seconds } =
    getLocalDateComponents();

  // 년, 월, 일, 시, 분, 초 추출
  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');
  const paddedHours = (hours ?? 0).toString().padStart(2, '0');
  const paddedMinutes = (minutes ?? 0).toString().padStart(2, '0');
  const paddedSeconds = (seconds ?? 0).toString().padStart(2, '0');

  return `${year}-${paddedMonth}-${paddedDay} ${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}
