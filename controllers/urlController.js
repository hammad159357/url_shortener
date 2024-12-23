const urlService = require('../services/urlService')
const responseFunctions = require("../utils/responses");
const { validateUrl } = require("../validations/url");

module.exports = {
    createURL: async (req, res) => {
        const { long_url } = req.body
        try {
            const { error } = validateUrl(req.body);
            if (error) {
                return responseFunctions._400(res, error.details[0].message);
            }
            const response = await urlService.createURL(long_url)
            if (!response.success) {
                return responseFunctions._400(res, response.message);
            }
            return responseFunctions._200(
                res,
                response.data,
                "Url generated successfully"
            );
        } catch (error) {
            return responseFunctions._500(res, "Internal Server Error");
        }
    },

    getURL: async (req, res) => {
        const { short_url } = req.params
        if (!short_url) return responseFunctions._400(res, "url is required");
        const response = await urlService.getURL(short_url)
        if (!response.success) {
            return responseFunctions._400(res, response.message);
        }
        res.redirect(response.data.redirectUrl)
    },
}