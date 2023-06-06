import { execa } from "execa"
import { getPackageManager } from "./utils"

export async function installModules(modules: string[]) {
  const packageManager = await getPackageManager()
  await execa(packageManager, [packageManager === "yarn" ? "add" : "install", "-D", ...modules])
}
