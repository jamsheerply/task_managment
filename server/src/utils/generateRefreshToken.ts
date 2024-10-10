import jwt from "jsonwebtoken";

export const generateRefreshToken = (
    payload: {
        _id: string,
        email: string,
    }
) => {

    const { _id, email } = payload;
    const newPayload = { _id, email };
    
    return jwt.sign(
        newPayload,
        String(process.env.REFRESH_TOKEN_SECRET),
        { expiresIn: '15d' }
    );
};