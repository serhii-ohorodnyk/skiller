import { OFFLINE_URL } from "./const";

function respondOfflinePage(event: FetchEvent) {
  // we are interested only in navigation requests
  if (
    event.request.mode === "navigate" ||
    (event.request.method === "GET" &&
      event.request.headers.get("accept")!.includes("text/html"))
  ) {
    // tslint:disable-next-line:no-console
    console.log("Handling fetch event for", event.request.url);
    event.respondWith(
      fetch(event.request).catch(error => {
        // tslint:disable-next-line:no-console
        console.log("Fetch failed; returning offline page instead.", error);
        // offline page should be cached by now as static asset
        return caches.match(OFFLINE_URL) as Promise<Response>;
      })
    );
  }
}

export default respondOfflinePage;
