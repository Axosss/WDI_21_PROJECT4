dbURIs = {
  test: "mongodb://localhost/guessWhArt-test",
  development: "mongodb://localhost/guessWhArt-app-4",
  production: process.env.MONGODB_URI || "mongodb://localhost/guessWhArt-app-4"
}

module.exports = function(env) {
  return dbURIs[env];
}