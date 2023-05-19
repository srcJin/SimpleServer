const Users = require("../dal/users")

class UsersService {
    async login(username, password) {
        const user = await Users.verifyUser(username, password);
        return user;
    }
    
    async register(username, password, imageUrl) {
        return await Users.create(username, password, imageUrl);
    }
}

module.exports = UsersService;

