(function() {
  var npm, path, readJson;

  npm = require("npm");

  readJson = require("npm/lib/utils/read-json");

  path = require("path");

  module.exports.updateable = function() {
    return npm.load({
      "loglevel": "error"
    }, function(err) {
      if (err != null) throw err;
      return npm.commands.ls([], true, function(err, data) {
        if (err != null) throw err;
        return readJson(path.resolve(npm.dir, "..", "package.json"), function(err, data) {
          var pkg, _, _ref, _results;
          _ref = data.dependencies;
          _results = [];
          for (_ in _ref) {
            pkg = _ref[_];
            if (pkg.name == null) continue;
            _results.push((function(pkg) {
              return npm.commands.view([pkg.name], true, function(err, data) {
                var latestVersion, _, _results2;
                _results2 = [];
                for (_ in data) {
                  data = data[_];
                  latestVersion = data.versions.pop();
                  if (pkg.version !== latestVersion) {
                    _results2.push(console.log("" + pkg.name + " is " + pkg.version + ", could be " + latestVersion));
                  } else {
                    _results2.push(void 0);
                  }
                }
                return _results2;
              });
            })(pkg));
          }
          return _results;
        });
      });
    });
  };

}).call(this);
