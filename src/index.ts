// import chalk from "chalk";
import path from "path";
import { consolekit } from "./client";

// consolekit.log("before .timestamp.log");
// consolekit.timestamp.log("after .timestamp.log");
// consolekit.log("index.ts");

// const dbCall = consolekit.startTime();
// (async () => {
//   await new Promise(resolve => {
//     setTimeout(resolve, 1000);
//   }).catch(() => {});

//   dbCall.endTime(t => `db call took ${t}ms`);
// })();

consolekit.tag("epic").log("Hello");
consolekit.tag("ooo").log("ooo");

// console.log(chalk.hex("#00fff2").bgHex("#001c1b")("this is a test"));
// console.log(chalk.hex("#FF8C00").bgHex("#1C0F00")("warn!"));
// console.log(chalk.hex("f1411a").bgHex("#1c0803")("danger!"));
