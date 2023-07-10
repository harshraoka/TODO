import User from "../models/User.js"
import { statusCode } from "../utils/constant.js";
import { jsonGenerate } from "../utils/helpers.js";

export const GetTodos = async (req,res) => 
{
    try {
        const list = await User.findById(req.userID).select("-password").populate('todos').exec();
        console.log(list);
        return res.json(jsonGenerate(statusCode.SUCCESS,"ALL todo list", list));
    }
    catch(error){
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"something went wrong can not fetch", error));
    }
}