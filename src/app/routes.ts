import loadable from "@loadable/component";
import { RouteProps } from "react-router";

const routes: { [key: string]: RouteProps } = {
  candidates: {
    component: loadable(() => import("./views/Candidates")),
    path: "/candidates"
  },
  profiles: {
    component: loadable(() => import("./views/Profiles")),
    exact: true,
    path: "/"
  }
};

export default routes;
