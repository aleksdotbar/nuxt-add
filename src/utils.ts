import preferredPM from "preferred-pm"

export async function getPackageManager() {
  const { name } = (await preferredPM(process.cwd())) ?? { name: "npm" }
  return name
}
