export function processJsonValue(options, ctx, value) {
  const type = typeof value
  if (
    type === "string" ||
    type === "number" ||
    type === "boolean" ||
    value === null
  ) {
    ctx.appendText(JSON.stringify(value))
    return
  } else if (type !== "object") {
    ctx.appendText('"?"')
    return
  }
  if (Array.isArray(value)) {
    ctx.appendText("[\n").indent()
    const arr = [...value]
    while (arr.length) {
      ctx.appendIndent()
      const e = arr.shift()
      processJsonValue(options, ctx, e)
      if (arr.length) {
        ctx.appendText(",")
      }
      ctx.appendText("\n")
    }
    ctx.outdent().appendIndent().appendText("]")
  } else {
    let entries = Object.entries(value)
    const valueIsNode = isNode(value)
    if (valueIsNode) {
      ctx.pushNode(value)
      const typeEntry = entries.find(([key]) => key === "type")
      const locEntries = options.showLocations
        ? entries.filter(([key]) => key === "loc" || key === "range")
        : []
      entries = entries.filter(
        ([key]) =>
          key !== "type" &&
          key !== "loc" &&
          key !== "range" &&
          key !== "parent" &&
          !(
            (key === "start" || key === "end") &&
            typeof value.start === "number"
          ),
      )
      if (typeEntry) entries.unshift(typeEntry)
      entries.push(...locEntries)
    }
    ctx.appendText("{\n").indent()
    while (entries.length) {
      const [key, val] = entries.shift()
      ctx.appendIndent()
      processJsonValue(options, ctx, key)
      ctx.appendText(": ")
      processJsonValue(options, ctx, val)
      if (entries.length) {
        ctx.appendText(",")
      }
      ctx.appendText("\n")
    }
    ctx.outdent().appendIndent().appendText("}")

    if (valueIsNode) {
      ctx.popNode()
    }
  }
}

/**
 * Check if given value is node
 */
function isNode(value) {
  return (
    value != null &&
    Array.isArray(value.range) &&
    "loc" in value &&
    "type" in value
  )
}
