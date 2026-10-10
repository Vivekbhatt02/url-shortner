import {nanoid} from 'nanoid';
import URL from "../models/url.js";

const ID_LENGTH = 8;

async function handleGenerateNewShortURL(req, res) {
    const shortId = nanoid(ID_LENGTH);
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({error: "URL is required"});
    }
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });

    return res.redirect(`/?id=${shortId}`);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});

    if (!result) {
        return res.status(404).json({error: "URL not found"});
    }

    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

async function handleRedirectToURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
            shortId
        }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            }
        }
    );

    if (!entry) {
        return res.status(404).json({error: "Short URL not found"});
    }

    return res.redirect(entry.redirectUrl);
}

export {handleGenerateNewShortURL, handleGetAnalytics, handleRedirectToURL};