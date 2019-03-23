import loadable from "@loadable/component";
import React from "react";
import { RouteComponentProps, RouteProps } from "react-router";

const Candidates = loadable(() => import("./views/Candidates"));
const Profiles = loadable(() => import("./views/Profiles"));

const renderRoute = (
  Component: React.ComponentType | React.ComponentType<RouteComponentProps>
) => (props: RouteComponentProps) => <Component {...props} />;

const routes: { [key: string]: RouteProps } = {
  candidates: {
    path: "/candidates",
    render: renderRoute(Candidates)
  },
  profiles: {
    exact: true,
    path: "/",
    render: renderRoute(Profiles)
  }
};

export default routes;
