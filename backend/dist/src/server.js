"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./app/config");
const seedAdmin_1 = require("./app/utils/seedAdmin");
// import mongoose from "mongoose";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // if you are using MongoDB, uncomment the following lines
            yield mongoose_1.default.connect(config_1.envVars.MONGODB_URL);
            app_1.default.listen(config_1.envVars.PORT, () => __awaiter(this, void 0, void 0, function* () {
                yield (0, seedAdmin_1.seedAdmin)();
                console.log(`App running on port ${config_1.envVars.PORT}`);
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
