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