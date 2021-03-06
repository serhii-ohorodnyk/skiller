import "cross-fetch/polyfill";

import { ChunkExtractor } from "@loadable/server";
import { IncomingMessage, ServerResponse } from "http";
import React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { StaticRouter } from "react-router";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { Stats } from "webpack";

// import { LOADABLE_STATS_PATH } from "../../webpack/const"
import App from "app/App";
import { AppThemeProvider } from "app/styles";
import Html from "./Html";

const handler = (stats: Stats) => async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  // Create a new styled-components stylesheet instance
  const sheet = new ServerStyleSheet();
  // Create a fresh 'context' for React Router
  const routerContext: any = {};
  const extractor = new ChunkExtractor({ stats });

  const applicationTree = extractor.collectChunks(
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter location={req.url} context={routerContext}>
        <AppThemeProvider userAgent={req.headers["user-agent"]}>
          <App />
        </AppThemeProvider>
      </StaticRouter>
    </StyleSheetManager>
  );

  const appHtml = renderToString(applicationTree);
  // collect script elements
  const JsScripts = extractor.getScriptElements();
  // collect style elements
  const StyleLinks = extractor.getStyleElements();
  const staticHelmet = Helmet.renderStatic();
  const StyleElements = sheet.getStyleElement();

  // Handle redirects
  if (routerContext.url) {
    res.writeHead(302, { Location: routerContext.url });
    res.end();
  } else {
    const html = renderToStaticMarkup(
      <Html
        // if you don't need SSR - remove 'appHtml'
        appHtml={appHtml}
        StyleLinks={StyleLinks}
        helmet={staticHelmet}
        JsScripts={JsScripts}
        StyleElements={StyleElements}
      />
    );

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!DOCTYPE html>${html}`);
  }
};

export default handler;
