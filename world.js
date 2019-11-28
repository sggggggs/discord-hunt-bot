"use strict";

const Hunt = require("./hunt.js");

class World {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.hunts = {};
    }

    update(info) {
        if (!this.hunts[info.name]) {
            this.hunts[info.name] = new Hunt(info.name, info.rank);
        }

        // returns true if changed
        return this.hunts[info.name].update(info.status);
    }
}

module.exports = World;