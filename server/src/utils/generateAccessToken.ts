import jwt from "jsonwebtoken";

interface UserPayload {
    _id: string;
    email: string;
}

export const generateAccessToken = (
    payload: UserPayload
) => {

    const { _id, email } = payload;
    const newPayload = { _id, email };

    return jwt.sign(
        newPayload,
        String(process.env.ACCESS_TOKEN_SECRET),
        { expiresIn: '30m' }  
    );
};