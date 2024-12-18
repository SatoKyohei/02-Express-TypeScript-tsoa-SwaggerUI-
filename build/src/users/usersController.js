"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UsersController = void 0;
const tsoa_1 = require("tsoa");
const usersService_1 = require("./usersService");
const authMiddleware_1 = require("../middleware/authMiddleware");
let UsersController = class UsersController extends tsoa_1.Controller {
    getUser(_token, req, userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new usersService_1.UsersService().get(userId, name);
        });
    }
    createUser(_token, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(201);
            new usersService_1.UsersService().create(requestBody);
            return;
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, tsoa_1.Get)("{userId}"),
    __param(0, (0, tsoa_1.Header)("X-Access-Token")),
    __param(1, (0, tsoa_1.Request)()),
    __param(2, (0, tsoa_1.Path)()),
    __param(3, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, tsoa_1.Response)(422, "Validation Failed"),
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Header)("X-Access-Token")),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
exports.UsersController = UsersController = __decorate([
    (0, tsoa_1.Route)("users"),
    (0, tsoa_1.Middlewares)([authMiddleware_1.authMiddleware])
], UsersController);
