const User = require("../models/user");
const hash = require("../utils/hash");

module.exports = {
  /**
   * This function will get a user by their username. If no user is found, return a null.
   * @param {*} username
   * @returns A null when there is no user, or got DB error.
   */
  async getByUserName(username) {
    try {
      return await User.collection().where({ username: username }).fetchOne();
    } catch (err) {
      console.error("Cannot find user", username, err);
    }

    return null;
  },

  /**
   * Checks the credentials for a user
   * @param {string} username The username
   * @param {string} password The password
   * @returns
   */
  async verifyUser(username, password) {
    const user = await this.getByUserName(username);
    if (user && user.attributes.password === hash(password)) {
      return user;
    }
    return null;
  },

  async create(username, password, imageUrl) {
    let user = new User({
      username: username,
      password: hash(password),
      image_url: imageUrl,
    });
    return await user.save(null, { method: "insert" });
  },
};
