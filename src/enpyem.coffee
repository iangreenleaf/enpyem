npm = require "npm"
readInstalled = require "read-installed"
path = require "path"

module.exports.updateable = ->
  npm.load {"loglevel":"error"}, (err) ->
    throw err if err?
    readInstalled path.resolve(npm.dir, ".."), (err, data) ->
      for _,pkg of data.dependencies
        continue unless pkg.name?
        do (pkg) ->
          npm.commands.view [pkg.name], true, (err, data) ->
            for _,data of data
              latestVersion = data.versions.pop()
              if pkg.version isnt latestVersion
                console.log "#{pkg.name} is #{pkg.version}, could be #{latestVersion}"
