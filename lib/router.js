var _ = require('underscore')

function Router() {
  this.routes = {}
}

exports.Router = Router

Router.prototype.route = function(method, uri, callback) {
  var routes = this.routes[method] = this.routes[method] || []

  routes.push({
    regexp: new RegExp("^"+ uri + "$", "i"),
    callback: callback
  })
};

Router.prototype.handle = function(req, res) {
  var routes = this.routes[req.method],
    route = _.find(routes, function(route) {
      return route.regexp.test(req.url)
    })

  if (route) {
    route.callback(req, res)
  } else {
    var error = new Error("Not Found!")
    error.status = 404
    throw (error)
  }
};