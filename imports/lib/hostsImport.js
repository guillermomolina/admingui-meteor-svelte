import fs from 'fs';
import csv from 'csv-parser';
import { HostsCollection } from '../db/HostsCollection';

(function () {
    function parseDotNotation(str, val, obj) {
        if (val !== '') {
            var currentObj = obj,
                keys = str.split("."),
                i, l = Math.max(1, keys.length - 1),
                key;

            for (i = 0; i < l; ++i) {
                key = keys[i];
                currentObj[key] = currentObj[key] || {};
                currentObj = currentObj[key];
            }
            currentObj[keys[i]] = val;

        }
        delete obj[str];
    }

    Object.expand = function (obj) {
        for (var key in obj) {
            if (key.indexOf(".") !== -1) {
                parseDotNotation(key, obj[key], obj);
            }
        }
        return obj;
    };
})();

export function importHosts(fileName) {
    fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', Meteor.bindEnvironment((row) => {
            host = Object.expand(row);
            id = HostsCollection.insert(host);
            console.log(`Added host ${row.name} with id ${id}`);
        }))
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
}
