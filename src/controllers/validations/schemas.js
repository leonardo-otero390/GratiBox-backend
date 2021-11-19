import joi from "joi";

const newUserSchema = joi.object({
	name: joi.string().min(3).required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
});

const newSessionSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});

const newSubscriptionSchema = joi.object({
	user: joi.number().required(),
	plan: joi.number().required(),
	name: joi.string().min(3).required(),
	shipDate: joi.number().required(),
	products: joi.array().min(1).required(),
})

export {
    newUserSchema,
    newSessionSchema,
	newSubscriptionSchema
}