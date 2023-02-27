import { Jwt } from "jsonwebtoken";

export const verifyToken = async(req, res, next) => {

    try {
        const token = req.header("Authorization");

        if (!token) { 
            return res.status(401).send("Access Denied");  
        }
        if (token.startswith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = await Jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}