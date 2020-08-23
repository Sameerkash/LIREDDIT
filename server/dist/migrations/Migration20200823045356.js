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
exports.Migration20200823045356 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20200823045356 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('alter table "post" drop constraint if exists "post_created_at_check";');
            this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
            this.addSql('alter table "post" alter column "created_at" set default \'NOW()\';');
            this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null);');
        });
    }
}
exports.Migration20200823045356 = Migration20200823045356;
//# sourceMappingURL=Migration20200823045356.js.map