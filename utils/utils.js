const https = require("https");
const fs = require("fs");
const { join } = require("path");

exports.fetgitignore = (gitignorePath) => {
  https.get("https://www.toptal.com/developers/gitignore/api/node", (res) => {
    res.pipe(fs.createWriteStream(gitignorePath));
  });
};

exports.createTsConfig = function (tsConfigPath) {
  fs.createReadStream(join(__dirname, "/basic_ts_config.txt")).pipe(
    fs.createWriteStream(join(tsConfigPath, "/tsconfig.json"))
  );
};

exports.customizePackageJson = function (packageJsonPath) {
  const packageJson = JSON.parse(
    fs.readFileSync(join(packageJsonPath, "/package.json"))
  );

  packageJson.scripts = {
    dev: "ts-node-dev --transpile-only --no-notify --exit-child src/index.ts",
    build: "tsc",
  };

  packageJson.main = "index.ts";

  fs.writeFileSync(
    join(packageJsonPath, "/package.json"),
    JSON.stringify(packageJson, null, 2)
  );
};
