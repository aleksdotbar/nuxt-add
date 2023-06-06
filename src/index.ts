#!/usr/bin/env node
import cac from "cac"
import ora from "ora"
import { consola } from "consola"
import { promptForModules } from "./prompts"
import { loadConfig, writeConfig, addModulesToConfig } from "./config"
import { installModules } from "./npm"

async function main() {
  const cli = cac()

  cli.command("[...modules]", "Install modules").action(async (modules: string[]) => {
    let spinner = ora()

    try {
      const cfg = await loadConfig()

      modules = await promptForModules()

      spinner.start("Installing modules...")
      await installModules(modules)

      addModulesToConfig(cfg, modules)
      await writeConfig(cfg)
      spinner.succeed("Modules are added to your nuxt.config.ts")
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong"

      if (spinner.isSpinning) {
        spinner.fail(message)
      } else {
        consola.error(message)
      }
    }
  })

  cli.parse()
}

main()
