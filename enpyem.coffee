npm = require "npm"
readJson = require "npm/lib/utils/read-json"
path = require "path"

npm.load {}, (err) ->
  throw err if err?
  npm.commands.ls [], true, (err, data) ->
    throw err if err?
    readJson path.resolve(npm.dir, "..", "package.json"), (err, data) ->
      for _,pkg of data.dependencies
        continue unless pkg.name?
        do (pkg) ->
          npm.commands.view [pkg.name], true, (err, data) ->
            for _,data of data
              latestVersion = data.versions.pop()
              if pkg.version isnt latestVersion
                console.log "#{pkg.name} is #{pkg.version}, could be #{latestVersion}"
