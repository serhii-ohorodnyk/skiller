import React from "react";
import { HelmetData } from "react-helmet";

export interface HtmlProps {
  appHtml?: string;
  StyleLinks?: React.ReactNode[];
  JsScripts?: React.ReactNode[];
  LinkElements?: React.ReactNode[];
  helmet: HelmetData;
  StyleElements?: Array<React.ReactElement<{}>>;
  window?: Partial<Window>;
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
      <link rel="shortcut icon" href="/favicon.ico" />
      {helmet.meta.toComponent()}
      {helmet.style.toComponent()}
      {helmet.link.toComponent()}
      {...StyleLinks}
      {StyleElements}
      {helmet.script.toComponent()}
      {helmet.noscript.toComponent()}
      {...LinkElements}
    </head>
    <body {...helmet.bodyAttributes.toComponent()}>
      <div id="root" dangerouslySetInnerHTML={{ __html: appHtml || "" }} />
      <script dangerouslySetInnerHTML={{ __html: stringifyWindow(window) }} />
    </body>
    {...JsScripts}
  </html>
);

export default Html;
