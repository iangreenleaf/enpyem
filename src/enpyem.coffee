readInstalled = require "read-installed"
path = require "path"
npmReg = require "npm-registry-client"
client = new npmReg registry: "http://registry.npmjs.org/", cache: "."

module.exports.updateable = ->
  readInstalled path.resolve("."), (err, data) ->
    for _,pkg of data.dependencies
      continue unless pkg.name?
      do (pkg) ->
        client.get "#{pkg.name}/latest", (err, latest) ->
          if pkg.version isnt latest.version
            console.log "#{pkg.name} is #{pkg.version}, could be #{latest.version}"
