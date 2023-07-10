import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statusCode, JWT_TOKEN_SECRET } from "../utils/constant.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Jwt  from "jsonwebtoken";

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, username, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userExist = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    if(userExist){
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"User or Email already exists"))
    }
    //save to DB
    try {
      const result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        username: username,
      });

      const token = Jwt.sign({userID:result._id},JWT_TOKEN_SECRET);

      res.json(
        jsonGenerate(statusCode.SUCCESS, "Registration successfull", {userID:result._id,token:token})
      );
    } catch (error) {
      console.log(error);
    }
  }

  res.json(
    jsonGenerate(
      statusCode.VALIDATION_ERROR,
      "Validation Error",
      errors.mapped()
    )
  );
};

export default Register;
