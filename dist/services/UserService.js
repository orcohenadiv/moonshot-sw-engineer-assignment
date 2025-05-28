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
exports.UserService = void 0;
const datasource_1 = require("../datasource");
const User_1 = require("../entities/User");
const snsService_1 = require("./snsService"); // add this line
class UserService {
    static createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = datasource_1.AppDataSource.getRepository(User_1.User);
            const user = userRepository.create(Object.assign(Object.assign({}, input), { created_at: new Date(), updated_at: new Date() }));
            const savedUser = yield userRepository.save(user);
            // Send SNS message after user is saved
            const message = `New user created: ${savedUser.first_name} ${savedUser.last_name} (ID: ${savedUser.id})`;
            yield (0, snsService_1.publishUserCreated)(`New user created: ${user.first_name} ${user.last_name}`);
            return savedUser;
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = datasource_1.AppDataSource.getRepository(User_1.User);
            return yield userRepository.findOneBy({ id });
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = datasource_1.AppDataSource.getRepository(User_1.User);
            return yield userRepository.find();
        });
    }
    static updateUser(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = datasource_1.AppDataSource.getRepository(User_1.User);
            const user = yield userRepository.findOneBy({ id });
            if (!user) {
                throw new Error('User not found');
            }
            Object.assign(user, input);
            user.updated_at = new Date();
            return yield userRepository.save(user);
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = datasource_1.AppDataSource.getRepository(User_1.User);
            const result = yield userRepository.delete(id);
            return result.affected !== 0;
        });
    }
}
exports.UserService = UserService;
