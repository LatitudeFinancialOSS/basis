#!/usr/bin/env zx
/* eslint-disable no-console */
/* eslint-disable no-undef */

import semver from "semver";
import inquirer from "inquirer";

// Updated version of: https://github.com/google/zx/blob/ea6a800d52ffb128f546252fbba8977369343397/zx.mjs#L174
async function runWithSpinner(command, message) {
  const build = runSilently(command);

  let i = 0,
    color = [
      chalk.magentaBright,
      chalk.cyanBright,
      chalk.yellowBright,
      chalk.greenBright,
      chalk.blueBright,
    ][new Date().getMinutes() % 5],
    interval = setInterval(() => {
      process.stdout.write(
        `${message}  ` +
          color(["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"][i++ % 10]) +
          "\r"
      );
    }, 100);

  const result = await build;

  clearInterval(interval);
  process.stdout.write(`${message.replace(/./g, " ")}    \r`);

  return result;
}

async function runSilently(command) {
  let v = $.verbose;
  $.verbose = false;
  let build = command();

  const result = await build;
  $.verbose = v;

  return result.toString();
}

async function chooseTag() {
  const tags = ["latest", "beta"];

  await sleep(1000);
  const { tag } = await inquirer.prompt([
    {
      name: "tag",
      type: "list",
      message: "What tag is this release under?",
      choices: tags,
    },
  ]);

  await sleep(1000);
  const { proceed } = await inquirer.prompt([
    {
      name: "tag",
      type: "list",
      message: `Are you sure you want to release to npm@${tag}`,
      choices: ["yes", "no", "choose different tag"],
    },
  ]);

  if (proceed === "choose different tag") {
    return chooseTag();
  }

  if (proceed === "no") {
    return;
  }

  return tag;
}

async function main() {
  if (!process.env.PERCY_TOKEN) {
    console.log(chalk.red("No PERCY_TOKEN found in the environment"));
    process.exit(1);
  }

  const branch = await runSilently(() => $`git branch --show-current`);

  if (branch !== "master") {
    await sleep(1000);
    const { proceed } = await inquirer.prompt([
      {
        name: "proceed",
        type: "list",
        message: `You are currently on branch ${branch}, do you wish to proceed?`,
        choices: ["switch to latest master", "yes", "no"],
      },
    ]);

    if (proceed === "no") {
      console.log(chalk.red("aborting the release"));
      process.exit(1);
    }

    if (proceed === "switch to latest master") {
      await $`git checkout master`;
      await $`git pull`;
    }
  }

  let { version } = await require("../package.json");
  console.log("current version: ", chalk.blue(version));

  const versions = [
    "prerelease",
    "patch",
    "premajor",
    "preminor",
    "prepatch",
    "major",
    "minor",
    "pre",
  ];

  await sleep(1000);
  const { release } = await inquirer.prompt([
    {
      name: "release",
      type: "list",
      message: "Choose the type of release",
      choices: versions,
    },
  ]);

  const newVersion = semver.inc(version, release);

  await sleep(1000);
  const { proceed } = await inquirer.prompt([
    {
      name: "proceed",
      type: "list",
      message: `The new version will be ${newVersion}, do you wish to proceed?`,
      choices: ["yes", "no"],
    },
  ]);

  if (proceed === "no") {
    console.log(chalk.red("aborting the release"));
    process.exit(1);
  }
  const content = await fs.readFile("./package.json");
  const replaced = content.toString().replace(version, newVersion);
  await fs.writeFile("./package.json", replaced);
  console.log(chalk.green("bumped version in package"));

  await runWithSpinner(() => $`yarn`, "installing dependencies");
  console.log(chalk.green("installed dependencies"));
  await runWithSpinner(() => $`yarn build`, "building basis");
  console.log(chalk.green("build complete"));
  const percyOutput = await runWithSpinner(
    () => $`yarn percy`,
    "running percy build"
  );
  console.log(chalk.green("percy build complete"));
  const buildUrl = percyOutput.match(/(https:\/\/percy.io\S*)/g)[0];

  await sleep(1000);
  const { passes } = await inquirer.prompt([
    {
      name: "passes",
      type: "list",
      message: `Confirm that the following percy build passes: ${buildUrl}`,
      choices: ["yes", "no"],
    },
  ]);

  if (passes === "no") {
    console.log(chalk.red("aborting the release"));
    process.exit(1);
  }

  const tag = await chooseTag();

  if (!tag) {
    console.log(chalk.red("aborting the release"));
    process.exit(1);
  }

  await $`git commit -am "${newVersion}"`;
  await $`git tag "${newVersion}"`;
  await $`git push && git push --tags`;
  await $`npm publish --tag ${tag}`;
}

main();
