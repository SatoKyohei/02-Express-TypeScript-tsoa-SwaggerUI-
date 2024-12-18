import { Request, NextFunction, Response } from "express";

export interface AuthenticatedRequest extends Request {
    userId?: string;
    req: AuthenticatedRequest;
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    // リクエストヘッダーからトークンを取得
    const token = req.headers["x-access-token"];

    // トークンが存在しない場合は401エラーを返す
    if (!token) {
        return res.status(401).json({ message: "No token privided" });
    }

    // 仮のトークン値を設定
    const expectedToken = "your-hardcoded-token-value";

    // トークンのチェック
    if (token === expectedToken) {
        // トークンが正しい場合、仮のユーザーIDをリクエストオブジェクトに追加
        req.userId = "123"; // 仮のユーザーID
        next(); // 認証成功。次のミドルウェアへ進む
    } else {
        return res.status(403).json({ message: "Invalid token" });
    }
};