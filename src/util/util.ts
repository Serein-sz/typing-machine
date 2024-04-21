export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce<A extends any[], R>(
  func: (...args: A) => R,
  duration: number
): (...args: A) => void {
  let timerId: string | number | NodeJS.Timeout | undefined;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      func(...args);
    }, duration);
  };
}
