export const registerOfflineHandler = (offlineUrl: string) => {
  const networkFirst = workbox.strategies.networkFirst();

  const offlineHandler = async args => {
    try {
      const response = await networkFirst.handle(args);
      return response || caches.match(offlineUrl);
    } catch (error) {
      return caches.match(offlineUrl);
    }
  };

  const navigationRoute = new workbox.routing.NavigationRoute(offlineHandler);

  workbox.routing.registerRoute(navigationRoute);
};
