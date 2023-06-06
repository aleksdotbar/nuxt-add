import { execa } from "execa"
import { getPackageManager } from "./utils"

export async function installModules(modules: string[]) {
  const packageManager = getPackageManager()
  const command = packageManager === "yarn" ? "add" : "install"
  await execa(packageManager, [command, ...modules])
}
