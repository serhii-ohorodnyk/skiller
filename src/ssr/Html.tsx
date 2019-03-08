import manifest from "app/public/manifest.json";
import React from "react";
import { HelmetData } from "react-helmet";

export interface HtmlProps {
  appHtml?: string;
  StyleLinks?: React.ReactNode[];
  JsScripts?: React.ReactNode[];
  LinkElements?: React.ReactNode[];
  helmet: HelmetData;
  StyleElements?: Array<React.ReactElement<{}>>;
  window?: any;
}

const stringifyWindow = (input: Partial<Window>) =>
  Object.keys(input).reduce(
    (out, key) =>
      (out += `window.${key}=${JSON.stringify(input[key]).replace(
        /</g,
        "\\u003c"
      )};`),
    ""
  );

/**
 * Server-side React component to render the full HTML response in React
 */
const Html: React.FC<HtmlProps> = ({
  appHtml,
  helmet,
  StyleLinks = [],
  JsScripts = [],
  LinkElements = [],
  StyleElements,
  window = {}
}) => (
  <html lang="en" {...helmet.htmlAttributes.toString()}>
    <head>
      {helmet.title.toComponent()}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="msapplication-TileColor" content={manifest.theme_color} />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="theme-color" content={manifest.theme_color} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={manifest.short_name} />
      <meta name="apple-mobile-web-app-status-bar-style" content="white" />

      <link rel="shortcut icon" href="media/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/media/app-icons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/media/app-icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/media/app-icons/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/media/app-icons/safari-pinned-tab.svg"
        color={manifest.theme_color}
      />

      {helmet.meta.toComponent()}
      {helmet.style.toComponent()}
      {helmet.link.toComponent()}
      {StyleLinks}
      {StyleElements}
      {helmet.script.toComponent()}
      {helmet.noscript.toComponent()}
      {LinkElements}
    </head>
    <body {...helmet.bodyAttributes.toComponent()}>
      <div id="root" dangerouslySetInnerHTML={{ __html: appHtml || "" }} />
      <script dangerouslySetInnerHTML={{ __html: stringifyWindow(window) }} />
    </body>
    {JsScripts}
  </html>
);

export default Html;
