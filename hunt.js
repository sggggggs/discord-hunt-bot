"use strict";

class Hunt {
    constructor(name, rank) {
        this.name = name;
        this.rank = rank;
    }

    update(status) {
        let old = this.status;
        if (status.includes("Missing")) {
            this.status = "Missing"; 
        }
        else if (status.includes("Open")) { 
            this.status = "Dead";
        }
        else {
            let left = status.indexOf("(");
            let mid = status.indexOf(",");
            let right = status.indexOf(")");
            if (left && mid && right) {
                this.x = status.substring(left+1, mid).trim();
                this.y = status.substring(mid+1, right).trim();
                this.status = "Located";
            }
        }

        return old && old != this.status ? this : false;
    }
}

module.exports = Hunt;