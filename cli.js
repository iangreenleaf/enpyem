#!/usr/bin/env node
if (process.argv.length != 3) {
  console.log("Usage:");
  console.log("  enpyem updateable");
  return;
}
require("./enpyem.js").updateable()
