import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statusCode } from "../utils/constant.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const createTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        statusCode.VALIDATION_ERROR,
        "Todo list required",
        error.mapped()
      )
    );
  }

  try {
    const result = await Todo.create({
      userID: req.userID,
      desc: req.body.desc,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.userID },
        {
          $push: { todos: result },
        }

      );

      return res.json(
        jsonGenerate(statusCode.SUCCESS, "Todo created successfully", result)
      );
    }
  } catch (er) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Something went wrong", er)
    );
  }
};


