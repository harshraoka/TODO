import { check } from "express-validator";

export const LoginSchemaSchema  = [
    check('username','username is required').exists().isAlphanumeric().withMessage('username should be aplha numeric only').trim().isLength({min:6,max:32}),
    check('password','Password is required').isLength({min:6,max:100}).trim(),
]