if (process.env.NODE_ENV === "production")
    module.exports = require("./build/void.min.js");
else
    module.exports = require("./build/void.dev.js");
