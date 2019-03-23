declare module "serviceworker-webpack-plugin";

declare module "serviceworker-webpack-plugin/lib/runtime" {
  interface Runtime {
    register: (
      options?: RegistrationOptions
    ) => Promise<ServiceWorkerRegistration>;
  }

  declare var runtime: Runtime;
  export default runtime;
}
