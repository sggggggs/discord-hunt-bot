"use strict";

const fs = require("fs");
const discord = require("discord.js");

class Bot {
    constructor() {
        this.config = require("./config.json");
        this.client = new discord.Client();
        this.commands = new Map();
        this.setupClient();
        this.addCommand("relay-a", console.log);
        this.addCommand("relay-s", console.log);
    }

    writeConfig() {
        fs.writeFile("config.json", JSON.stringify(this.config, null, 2));
    }

    fromAdministrator(msg) {
        return msg.member.permissions.has("ADMINISTRATOR");
    }

    parseCommand(msg) {
        let text = msg.toString().trim();
        if (text.indexOf(this.config.prefix) == 0) {
            text = text.slice(this.config.prefix.length);
            return text.split(/(\s+)/).map(str => str.toLowerCase());
        }
    
        return false;
    }

    setupClient() {
        this.client.on("ready", () => {
            console.log("ready");
        });
    
        this.client.on("message", msg => {
            if (this.fromAdministrator(msg)) {
                let args = this.parseCommand(msg);
                console.log(args);
                if (args && args.length >= 1) {
                    this.executeCommand(args[0], args[1]);
                }
            }
        })
    }

    executeCommand(command, args) {
        let cb = this.commands.get(command);
        if (cb) {
            cb(args);
        }
    }
    
    addCommand(command, cb) {
        this.commands.set(command, cb);
    }

    start() {
        this.client.login(this.config.token);
    }
}

module.exports = Bot;