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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210126093752 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210126093752 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.Migration20210126093752 = Migration20210126093752;
//# sourceMappingURL=Migration20210126093752.js.map