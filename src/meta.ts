import pkg from "../package.json" with { type: "json" }
export const name: string = pkg.name
export const version: string = pkg.version
