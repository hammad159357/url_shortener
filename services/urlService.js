const { nanoid } = require('nanoid');
const urlModel = require('../models/url')

module.exports = {
    createURL: async (long_url) => {
        try {
            let existingUrl = await urlModel.findOne({ redirectUrl: long_url });
            if (existingUrl) {
                return {
                    success: true,
                    data: { short_url: `${process.env.BASE_URL}:${process.env.PORT}/${existingUrl.shortUrl}` }
                };
            }
            const shortUrl = nanoid();
            await urlModel.create({
                shortUrl,
                redirectUrl: long_url,
                visitHistory: []
            })
            return { success: true, data: { short_url: `${process.env.BASE_URL}:${process.env.PORT}/${shortUrl}` } };
        } catch (error) {
            console.log(error);
            return { success: false, message: error.message };
        }
    },

    getURL: async (short_url) => {
        try {
            const data = await urlModel.findOneAndUpdate({ shortUrl: short_url }, {
                $push: {
                    visitHistory: [{ timeStamp: Date.now() }]
                }
            })
            if (!data) {
                return { success: false, message: 'URL not found' };
            }
            return { success: true, data };
        } catch (error) {
            console.log(error);
            return { success: false, message: error.message };
        }
    },
}