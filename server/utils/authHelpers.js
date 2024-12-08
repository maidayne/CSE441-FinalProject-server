const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("./logger");

async function HashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        logger.info("Hash password complete");
        return hashedPassword;
    } catch (error) {
        logger.error("Error hash password: ", error);
        throw new Error("Hashing password failed" + error);
    }
}

async function CompareHashPassword(password, hashedPassword) {
    try {
        const compare = bcrypt.compare(password, hashedPassword);
        logger.info("Compare hash complete");
        return compare;
    } catch (error) {
        logger.error("Error compare hash: ", error);
        throw new Error("Comparing password failed" + error);
    }
}

async function CreateToken(id) {
    try {
        const token = await jwt.sign({ id: id }, process.env.SECRET_TOKEN_KEY, {
            expiresIn: "1h"
        });
        logger.info("Complete create token");
        return token;
    } catch (error) {
        logger.error("Error create token: ", error);
        return null;
    }
}

async function VerifiedToken(token) {
    if (!token) {
        logger.warn("No token provided");
        return null;
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        return verified;
    } catch (error) {
        logger.error("Error verified token: ", error);
        return null;
    }
}

module.exports = {
    HashPassword,
    CompareHashPassword,
    CreateToken,
    VerifiedToken
};
