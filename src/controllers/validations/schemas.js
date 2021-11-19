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
	userId: joi.number().required(),
	planId: joi.number().required(),
	name: joi.string().min(3).required(),
	shipDateId: joi.number().required(),
	productsId: joi.array().min(1).required(),
	ZIPCode: joi.string().length(8).required(),
	address: joi.string().required(),
	stateId: joi.number().required(),
	city: joi.string().min(3).required(),
})

export {
    newUserSchema,
    newSessionSchema,
	newSubscriptionSchema
}