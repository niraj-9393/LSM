import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  try {
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return token;

  } catch (error) {
    throw new Error("Token generation failed");
  }
};