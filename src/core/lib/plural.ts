export function plural(titles: string[], empty?: string) {
  return (count: number): string => {
    if (empty && count === 0) {
      return empty;
    }

    if (
      count % 10 === 1 &&
      count % 100 !== 11
    ) {
      return format(0);
    }

    if (
      count % 10 >= 2 &&
      count % 10 <= 4 &&
      (count % 100 < 10 || count % 100 >= 20)
    ) {
      return format(1);
    }

    return format(2);

    function format(index: number): string {
      return `${count} ${titles[index]}`;
    }
  };
}
