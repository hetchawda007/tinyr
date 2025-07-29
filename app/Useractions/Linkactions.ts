"use server"

import Link from "../models/Links";
import connectDb from "@/db/connectDb";

interface LinkType {
    url: string;
    usermail?: string;
}

export const createlink = async (link: LinkType) => {
    try {
        await connectDb();

        const existingLink = await Link.findOne({ url: link.url });
        if (existingLink) {
            return {
                url: existingLink.url,
                shortUrl: existingLink.shortUrl,
                clicks: existingLink.clicks,
                _id: existingLink._id.toString(),
                createdAt: existingLink.createdAt,
                updatedAt: existingLink.updatedAt
            };
        }

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        let isUnique = false;

        while (!isUnique) {
            result = '';
            for (let i = 0; i < 6; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            const existingShortUrl = await Link.findOne({ shortUrl: result });
            if (!existingShortUrl) {
                isUnique = true;
            }
        }

        const newLink = new Link({
            url: link.url,
            shortUrl: result
        });

        await newLink.save();

        return {
            url: newLink.url,
            shortUrl: newLink.shortUrl,
            clicks: newLink.clicks,
            _id: newLink._id.toString(),
            createdAt: newLink.createdAt,
            updatedAt: newLink.updatedAt
        };

    } catch (error) {
        console.error("Error creating link:", error);
        throw new Error("Failed to create link");
    }
}

export const getLinkByShortUrl = async (shortUrl: string) => {
    try {
        await connectDb();
        const link = await Link.findOne({ shortUrl });

        if (!link) {
            return null;
        }
        console.log(link.url);
        return link.url;
    } catch (error) {
        console.error("Error fetching link by short URL:", error);
        return null;
    }
}

export const incrementLinkClicks = async (shortUrl: string) => {
    try {
        await connectDb();
        const link = await Link.findOneAndUpdate(
            { shortUrl },
            { $inc: { clicks: 1 } },
            { new: true }
        );
        return link;
    } catch (error) {
        console.error("Error incrementing link clicks:", error);
        throw new Error("Failed to increment link clicks");
    }
}

export const getAllLinks = async () => {
    try {
        await connectDb();
        const links = await Link.find({}).sort({ createdAt: -1 }).limit(50);
        return links.map(link => ({
            url: link.url,
            shortUrl: link.shortUrl,
            clicks: link.clicks,
            _id: link._id.toString(),
            createdAt: link.createdAt,
            updatedAt: link.updatedAt
        }));
    } catch (error) {
        console.error("Error fetching links:", error);
        throw new Error("Failed to fetch links");
    }
}

export const deleteLink = async (id: string) => {
    try {
        await connectDb();
        const deletedLink = await Link.findByIdAndDelete(id);
        return deletedLink;
    } catch (error) {
        console.error("Error deleting link:", error);
        throw new Error("Failed to delete link");
    }
}

export const updateLink = async (id: string, url: string) => {
    try {
        await connectDb();
        const updatedLink = await Link.findByIdAndUpdate(
            id,
            { url },
            { new: true }
        );
        return {
            url: updatedLink.url,
            shortUrl: updatedLink.shortUrl,
            clicks: updatedLink.clicks,
            _id: updatedLink._id.toString(),
            createdAt: updatedLink.createdAt,
            updatedAt: updatedLink.updatedAt
        };
    } catch (error) {
        console.error("Error updating link:", error);
        throw new Error("Failed to update link");
    }
}

export const getLinkStats = async () => {
    try {
        await connectDb();
        const totalLinks = await Link.countDocuments();
        const totalClicks = await Link.aggregate([
            { $group: { _id: null, totalClicks: { $sum: "$clicks" } } }
        ]);
        const recentLinks = await Link.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });
        const topLinks = await Link.find({}).sort({ clicks: -1 }).limit(5);

        return {
            totalLinks,
            totalClicks: totalClicks[0]?.totalClicks || 0,
            recentLinks,
            topLinks: topLinks.map(link => ({
                url: link.url,
                shortUrl: link.shortUrl,
                clicks: link.clicks,
                _id: link._id.toString()
            }))
        };
    } catch (error) {
        console.error("Error fetching link stats:", error);
        throw new Error("Failed to fetch link stats");
    }
}