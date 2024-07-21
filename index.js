#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import { readFileSync } from "node:fs";
import path from "node:path";
import pm2 from "pm2";
import { fileURLToPath } from "url";

// @todo Read project name and new-issue url from package.json.
const APP_NAME = "Local Sui Explorer";
const APP_URL = "http://localhost:9001";
const REPORT_ISSUE_URL = "https://github.com/kkomelin/sui-explorer/issues/new";

const main = async () => {
  // Commands.

  const program = new Command();

  program
    .name("sui-explorer-local")
    .description(`Easily manage ${APP_NAME}`)
    .version(_getPackageVersion());

  program
    .command("start")
    .description(`Start ${APP_NAME}`)
    .option("-v, --verbose", "display logs")
    .action((options) => {
      pm2.connect(function (err) {
        if (err) {
          _displayErrorMessage(`Could not start ${APP_NAME}`);
          options.verbose && err && console.error(err);
          process.exit(1);
        }

        pm2.start(
          {
            name: "sui-explorer-local",
            script: "serve",
            env: {
              PM2_SERVE_PATH: path.join(
                _getCliDirectory(),
                "/apps/explorer/build/"
              ),
              PM2_SERVE_PORT: 9001,
              PM2_SERVE_SPA: "true",
            },
          },
          (err, apps) => {
            pm2.disconnect();

            if (err) {
              _displayErrorMessage(`Could not start ${APP_NAME}`);
              options.verbose && console.error(err);
              process.exit(1);
            }
          }
        );
      });

      _displaySuccessMessage(`${APP_NAME} started on ${APP_URL}`);
    });

  program
    .command("stop")
    .description(`Stop ${APP_NAME}`)
    .option("-v, --verbose", "display logs")
    .action((options) => {
      pm2.connect(function (err) {
        if (err) {
          _displayErrorMessage(`Could not stop ${APP_NAME}`);
          options.verbose && err && console.error(err);
          process.exit(1);
        }

        pm2.stop("sui-explorer-local", (err, apps) => {
          pm2.disconnect();

          if (err) {
            _displayErrorMessage(`Could not stop ${APP_NAME}`);
            options.verbose && console.error(err);
            process.exit(1);
          }
        });
      });

      _displaySuccessMessage(`${APP_NAME} stopped`);
    });

  program
    .command("restart")
    .description(`Restart ${APP_NAME}`)
    .option("-v, --verbose", "display logs")
    .action((options) => {
      pm2.connect(function (err) {
        if (err) {
          _displayErrorMessage(`Could not restart ${APP_NAME}`);
          options.verbose && err && console.error(err);
          process.exit(1);
        }

        pm2.restart("sui-explorer-local", (err, apps) => {
          pm2.disconnect();

          if (err) {
            _displayErrorMessage(`Could not restart ${APP_NAME}`);
            options.verbose && err && console.error(err);
            process.exit(1);
            // throw err;
          }
        });
      });

      _displaySuccessMessage(`${APP_NAME} restarted on ${APP_URL}`);
    });

  program.parse();
};

const _getCliDirectory = () => {
  const currentFileUrl = import.meta.url;
  return path.dirname(decodeURI(fileURLToPath(currentFileUrl)));
};

const _getPackageVersion = () => {
  try {
    const packageFile = readFileSync(
      path.join(_getCliDirectory(), "/package.json"),
      "utf8"
    );
    const packageMeta = JSON.parse(packageFile);
    return packageMeta.version;
  } catch (e) {
    _displayErrorMessage(
      `Cannot read package meta-data. Please report the issue ${REPORT_ISSUE_URL}`
    );
    console.error(e);
    process.exit(1);
  }
};

const _displayErrorMessage = (message) => {
  console.error(chalk.red(message));
};

const _displaySuccessMessage = (message) => {
  console.log(chalk.green(message));
};

// Main entry point.
main().catch((e) => {
  console.error(chalk.red(e));
});
