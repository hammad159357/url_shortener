const Joi = require("joi");

module.exports = {
    validateUrl: function (obj) {
        const schema = Joi.object({
            long_url: Joi.string().uri().required()
        });
        return schema.validate(obj, { allowUnknown: false });
    },
}