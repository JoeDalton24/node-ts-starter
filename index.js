#! /usr/bin/node

const { spawn } = require("child_process");
const { join } = require("path");
const fs = require("fs");
const {
  fetgitignore,
  createTsConfig,
  customizePackageJson,
} = require("./utils/utils");

if (fs.existsSync(join(process.cwd(), process.argv[2]))) {
  throw new Error(`${process.argv[2]} already exist !!`);
}

const project_name = process.argv[2];
const rootPath = join(process.cwd(), project_name);

const child = spawn(`mkdir ${project_name}`, {
  stdio: "inherit",
  shell: true,
});

child.on("exit", function (code, signal) {
  const child_2 = spawn(
    `npm init -y | mkdir src | touch .env | touch .gitignore |touch tsconfig.json`,
    {
      stdio: "inherit",
      shell: true,
      cwd: rootPath,
    }
  );

  child_2.on("exit", function (code, signal) {
    // fetch gitignore file
    fetgitignore(join(process.cwd(), project_name, ".gitignore"));

    // add script command
    customizePackageJson(rootPath);

    //create tsconfig file
    createTsConfig(rootPath);

    // create index.ts
    fs.writeFileSync(join(rootPath, "/src/index.ts"), "//start build your app");

    // install dependencies
    const child_3 = spawn(`npm i -D ts-node-dev typescript | npm i dotenv`, {
      stdio: "inherit",
      shell: true,
      cwd: rootPath,
    });
  });
});
