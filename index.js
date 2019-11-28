"use strict";

const HuntHandler = require("./hunthandler.js");
const Bot = require("./bot.js");

let handler = new HuntHandler();
handler.onUpdate(hunt => {
    console.log("UPDATE");
    console.log(hunt);
    console.log("\n");
});
// handler.start(25000);

let bot = new Bot();
bot.start();

