dbURIs = {
  test: "mongodb://localhost/auth-express-test",
  development: "mongodb://localhost/auth-express-app",
  production: process.env.MONGODB_URI || "mongodb://localhost/auth-express-app"
}

module.exports = function(env) {
  return dbURIs[env];
}