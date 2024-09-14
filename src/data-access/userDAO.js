const { User } = require('./model');

class UserDAO {
  async findById(id) {
    const user = await User.findById(id).lean();
    return user;
  }

  async findByName(name) {
    const user = await User.findOne({name}).lean();
    console.log(name)
    if(!user) {
      return null;
    }

    return user;
  }
}

module.exports = new UserDAO();