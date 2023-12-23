"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log("serving trafic on port", port);
    console.log("serving/fetching cells form ", filename);
    console.log("that file is in", dir);
};
exports.serve = serve;
