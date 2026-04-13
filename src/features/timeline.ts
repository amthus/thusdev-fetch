export function startTimer() {
  return Date.now();
}

export function endTimer(start: number) {
  return Date.now() - start;
}