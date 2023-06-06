import prompts from "prompts"
import modules from "@nuxt/modules"

export async function promptForModules(version = "3") {
  const available = modules.filter((m) => m.compatibility.nuxt.includes(`^${version}`))

  const { selected } = await prompts({
    name: "selected",
    type: "autocompleteMultiselect",
    message: "Which modules would you like to install?",
    hint: "Use <space> to select",
    instructions: false,
    choices: available.map((m) => ({
      value: m.npm,
      title: m.name,
    })),
  })

  return selected
}
