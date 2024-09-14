const { userDAO } = require('../data-access');

class UserService {
  async getUserInfo(id) {
    const user = await userDAO.findById(id);

    if(!user) {
      console.log("cannot find user");
    }

    const userInfo = {
      name: user.name,
      phoneNum: user.phoneNum,
    };

    return userInfo;
  }
}

module.exports = new UserService();