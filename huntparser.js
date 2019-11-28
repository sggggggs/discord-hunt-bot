"use strict";

const https = require("https");
const parse = require("node-html-parser").parse;

const BASE_URL = "https://xivhunt.net/home/HuntTablePartial/";

class HuntParser {
    static huntInfo(element) {
        let rank = element.querySelector(".badge-secondary");
        if (rank) rank = rank.text;
        else if (element.querySelector(".fateicon")) rank = "FATE";
        let name = element.querySelector(".huntname").text;
        let status = element.querySelector(".hunttime").text;
        return { "rank": rank, "name": name, "status": status };
    }

    static getUpdate(world, cb) {
        console.log("scraping");
        https.get(BASE_URL + world.id, res => {
            res.setEncoding("utf8");
            res.on("data", data => {
                const root = parse(data);
                if (cb) {
                    cb(root.querySelectorAll(".huntrow").map(HuntParser.huntInfo));
                }
            });
        });
    }
}

module.exports = HuntParser;