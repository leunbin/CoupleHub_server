require('dotenv').config();
const jwt = require('jsonwebtoken');
const { userDAO } = require("../data-access");

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  async logIn({ name, phoneNum }) {
    try {
      const user = await userDAO.findByName(name);
      if (user === null) {
        console.log("User not found");
        return { success: false, message: "User not found" };
      }

      if (user.phoneNum !== phoneNum) {
        console.log("Incorrect phone number");
        return { success: false, message: "Incorrect phone number" };
      }

      const tokenPayload = {
        id: user._id,
        name,
        phoneNum,
      };

      const encodedToken = await new Promise((resolve, reject) => {
        jwt.sign(
          tokenPayload,
          JWT_SECRET,
          (error, encoded) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(encoded);
          }
        );
      });

      console.log('Login successful');
      return { success: true, message: 'Login successful', encodedToken };
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Login failed' };
    }
  }
}

module.exports = new AuthService();
