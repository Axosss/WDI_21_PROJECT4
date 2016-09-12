dbURIs = {
  test: "mongodb://localhost/guessWhArt-test",
  development: "mongodb://localhost/guessWhArt-app",
  production: process.env.MONGODB_URI || "mongodb://localhost/guessWhArt-app"
}

module.exports = function(env) {
  return dbURIs[env];
}