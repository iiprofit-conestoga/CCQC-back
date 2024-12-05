/**
 * This file is for custom logs generation
 */

// Chalk library import for custom log generation
import chalk from "chalk";

// This class is used to modify the default log behaviours.
export default class Logging {
  //Simple Logs
  public static log = (args: any) => this.info(args)

  // Informative Logs
  public static info = (args: any) =>
    console.log(
      chalk.white(`[${new Date().toLocaleDateString()}] 
    [INFO]`),
      typeof args == "string" ? chalk.greenBright(args) : args
    )

  // Warning Logs
  public static warn = (args: any) =>
    console.log(
      chalk.white(`[${new Date().toLocaleDateString()}] [WARN]`),
      typeof args == "string" ? chalk.bgYellowBright(args) : args
    )

  // Error Logs
  public static error = (args: any) =>
    console.log(
      chalk.white(`[${new Date().toLocaleDateString()}] [ERROR]`),
      typeof args == "string" ? chalk.redBright(args) : args
    )
}
