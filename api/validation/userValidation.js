import Joi from 'joi'

//register validation
export const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        role: Joi.string(),
        
    })
    return schema.validate(data)
}
//Login validation
export const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data)
}
