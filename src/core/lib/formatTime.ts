const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
  hour12: false,
  hour: "numeric",
  minute: "numeric"
});

export function formatTime(date: Date): string {
  return timeFormatter.format(date);
}

export function formatTimeDuration(date: number): string {
  const hours = Math.floor(date / 60);
  const minutes = date % 60;

  return `${hours}ч ${minutes}м`;
}

export function formatTimePeriod(date: string, duration: number): string {
  const startDate = new Date(date);
  const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

  return `${formatTime(startDate)} – ${formatTime(endDate)}`;
}
