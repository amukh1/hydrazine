"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const formatMessage_1 = __importDefault(require("../module/formatMessage"));
const db = new sqlite3_1.default.Database(':memory:');
function main(action) {
    switch (action.$type) {
        case 'console_log': {
            console.log((0, formatMessage_1.default)(action.$value));
            break;
        }
        case 'console_warn': {
            console.warn((0, formatMessage_1.default)(action.$value));
            break;
        }
        case 'run_sqlite_query': {
            db.serialize(() => {
                db.run(action.$query, function (err, rows) {
                    const $ERROR = err;
                    const $RESULT = rows;
                    if (action.$callbacks) {
                        action.$callbacks.forEach((callback) => {
                            main(callback);
                        });
                    }
                });
            });
            db.close();
            break;
        }
    }
}
exports.default = main;
