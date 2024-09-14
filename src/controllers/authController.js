const { authService } = require("../service");

const authController = {
  async postLogIn(req, res, next) {
    try {
      const { name, phoneNum } = req.body;
      const result = await authService.logIn({ name, phoneNum });

      if (result.success) {
        res.status(200).json({
          success: true,
          message: "Login successful. Token generated.😊",
          data: result.encodedToken,
        });
      } else {
        res.status(401).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = authController;
