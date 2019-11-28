"use strict";

const World = require("./world.js");

const WORLDS = [
    { "id": 37, "name": "Mateus" }
];

class HuntHandler {
    constructor(ms) {
        this.worlds = [];
        WORLDS.forEach(world => this.worlds.push(new World(world.id, world.name)));
    }

    update() {
        this.worlds.forEach(this.updateWorld.bind(this));
    }

    updateWorld(world) {
        HuntParser.getUpdate(world, huntinfos => {
            huntinfos.forEach(huntinfo => {
                let hunt = world.update(huntinfo);
                if (hunt) this.sendUpdate(hunt);
            });
        });
    }

    sendUpdate(hunt) {
        if (this.cb) {
            this.cb(hunt);
        }
    }

    onUpdate(cb) {
        this.cb = cb;
    }

    start(ms) {
        setInterval(this.update.bind(this), ms);
        this.update();
    }
}

module.exports = HuntHandler;