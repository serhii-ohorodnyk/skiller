import { readFileSync } from "fs";
import requireFromString from "require-from-string";

// Ideally should relay on consts from <root>/webpack/const.ts.
// But in that case now.sh deployment fails with "not found file" error.
// TODO: investigate why. Could be related to https://github.com/zeit/ncc/issues/216 ?
const statsFile = `${__dirname}/../dist/loadable-stats.json`;
const ssrFile = `${__dirname}/../dist/ssr.js`;

const stringStats = readFileSync(statsFile, {
  encoding: "utf8"
});
const handler = requireFromString(
  readFileSync(ssrFile, {
    encoding: "utf8"
  })
);

export default handler.default(JSON.parse(stringStats));
