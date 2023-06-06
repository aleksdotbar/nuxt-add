import { ProxifiedModule, loadFile, writeFile } from "magicast"
import { addNuxtModule } from "magicast/helpers"

const fileName = "nuxt.config.ts"

export async function loadConfig() {
  const cfg = await loadFile(fileName)

  if (!cfg.exports.default) {
    throw new Error(`Your ${fileName} file must have a default export`)
  }

  return cfg
}

export async function writeConfig(cfg: ProxifiedModule) {
  await writeFile(cfg.$ast, fileName)
}

export function addModulesToConfig(cfg: ProxifiedModule, modules: string[]) {
  modules.forEach((x) => addNuxtModule(cfg, x))
}
