const { userService } = require('../service');

const userController = {
  async getUserInfo(req,res,next) {
    try{
      const { id } = res.locals.user;
      const userInfo = await userService.getUserInfo(id);
      res.status(200).json({
        success: true,
        message: "find userInfo😊",
        data: userInfo,
      })
    } catch(error) {
      next(error);
    }
  },
};

module.exports = userController;