import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define an interface for the JWT payload structure
interface JwtPayload {
  id: string;
  email: string;
  username: string;
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!,
    ) as JwtPayload;
    return decodedToken.id;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : "Unknown error occurred",
    );
  }
};
