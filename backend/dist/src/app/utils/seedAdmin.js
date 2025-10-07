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
exports.seedAdmin = void 0;
const config_1 = require("../config");
const user_interface_1 = require("../modules/user/user.interface");
const user_model_1 = require("../modules/user/user.model");
const user_service_1 = require("../modules/user/user.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const name = config_1.envVars.ADMIN_NAME;
    const email = config_1.envVars.ADMIN_EMAIL;
    const password = config_1.envVars.ADMIN_PASSWORD;
    const role = user_interface_1.IROLE.admin;
    const existing = yield (0, user_service_1.findUserByEmail)(email);
    if (existing) {
        console.log("Admin exists.");
    }
    else {
        const hashed = yield bcryptjs_1.default.hash(password, 10);
        const admin = user_model_1.User.create({ name, email, password: hashed, role });
    }
});
exports.seedAdmin = seedAdmin;
