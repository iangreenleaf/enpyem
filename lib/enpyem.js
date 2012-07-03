(function() {
  var client, npmReg, path, readInstalled;

  readInstalled = require("read-installed");

  path = require("path");

  npmReg = require("npm-registry-client");

  client = new npmReg({
    registry: "http://registry.npmjs.org/",
    cache: "."
  });

  module.exports.updateable = function() {
    return readInstalled(path.resolve("."), function(err, data) {
      var pkg, _, _ref, _results;
      _ref = data.dependencies;
      _results = [];
      for (_ in _ref) {
        pkg = _ref[_];
        if (pkg.name == null) continue;
        _results.push((function(pkg) {
          return client.get("" + pkg.name + "/latest", function(err, latest) {
            if (pkg.version !== latest.version) {
              return console.log("" + pkg.name + " is " + pkg.version + ", could be " + latest.version);
            }
          });
        })(pkg));
      }
      return _results;
    });
  };

}).call(this);
