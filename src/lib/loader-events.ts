/** Window events the intro loader dispatches so page sections can sync with it. */
export const LOADER_REVEAL_START = "loader:hero-reveal-start";
export const LOADER_REVEALED = "loader:hero-revealed";
export const LOADER_KEY = "nowhere:loader-played";

/** True once the loader has lifted (or was skipped) in this page load. */
export const loaderState = { done: false };

export function loaderPlayed() {
  try {
    return sessionStorage.getItem(LOADER_KEY) === "1";
  } catch {
    return false;
  }
}
export function markLoaderPlayed() {
  try {
    sessionStorage.setItem(LOADER_KEY, "1");
  } catch {}
}
