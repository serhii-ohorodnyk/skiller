import { createServer, IncomingMessage, ServerResponse } from "http"

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "text/html" })
  res.end(`
    <html lang="en">
    <head>
      <title>Skiller</title>
      <meta charset="utf8">
      <meta name="viewport" content="user-scalable=0, initial-scale=1, width=device-width">
      <link rel="shortcut icon" href="/favicon.ico" />
    </head>
    <body>
      <h1>Skiller</h1>
      <div>${req.url}</div>
    </body>
    </html>
  `)
}

if (!process.env.IS_NOW) {
  createServer(handler).listen(3000)
}

export default handler
