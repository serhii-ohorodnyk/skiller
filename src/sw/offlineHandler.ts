export const registerOfflineHandler = (offlineUrl: string) => {
  const networkOnly = workbox.strategies.networkOnly();

  const offlineHandler = async args => {
    try {
      const response = await networkOnly.handle(args);
      return response || caches.match(offlineUrl);
    } catch (error) {
      return caches.match(offlineUrl);
    }
  };

  const navigationRoute = new workbox.routing.NavigationRoute(offlineHandler);

  workbox.routing.registerRoute(navigationRoute);
};
