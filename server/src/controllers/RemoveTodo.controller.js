import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { statusCode } from "../utils/constant.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const RemoveTodo = async (req,res) => 
{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"Todo id is required",error.mapped()));
    }
    try {
        const result = await Todo.findOneAndDelete({
            userID:req.userID,
            _id:req.body.todo_id,
        });
        if(result){
            const user = await User.findOneAndUpdate({
                _id:req.userID,
            },
            {$pull:{todos:req.body.todo_id}}
            )
            return res.json(jsonGenerate(statusCode.SUCCESS), "Todo deleted successfully",null)
        }
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY), "Could not delete",error)
    }
}