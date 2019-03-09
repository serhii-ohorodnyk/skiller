export const OFFLINE_URL = new URL(
  `/offline?cacheBuster=${new Date().getTime()}`,
  self.location.toString()
).href;
