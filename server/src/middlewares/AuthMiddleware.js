import { JWT_TOKEN_SECRET, statusCode } from "../utils/constant.js"
import { jsonGenerate } from "../utils/helpers.js"
import Jwt from "jsonwebtoken"

const Authmiddleware = (req,res,next) => { 
    if(req.headers['auth']===undefined){
        return res.json(jsonGenerate(statusCode.AUTH_ERROR,"Access Denied"))
    }

    const token = req.headers['auth'];
    try {
        const decoded =  Jwt.verify(token,JWT_TOKEN_SECRET);
        //console.log(decoded);
        req.userID=decoded.userID;
        return next();
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"invalid token"));
    }
 }

 export default Authmiddleware;