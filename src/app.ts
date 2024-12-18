import express, {
    json,
    urlencoded,
    Response as ExResponse,  // ExはExpress用の型定義だとわかりやすくするため
    Request as ExRequest,
    NextFunction,
} from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { ValidateError } from "tsoa";

export const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

// http://localhost:3000/docsで参照
// swaggerUi.serve：SwaggerUIを実行するミドルウェア
// _req：未使用の引数にアンダースコア。未使用だけどreqは記述しなければならないため
// generateHTML：Swagger.jsonを読み込んでHTML化
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    res.send(swaggerUi.generateHTML(await import("../build/swagger.json")));
});

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
) {
    // ValidateError：tsoa専用のエラークラス。リクエストパラメータ／ボディのバリデーション失敗時に発生
    if (err instanceof ValidateError) {

        // fields：リクエストパラメータ／ボディのキーとバリデーションエラーの詳細
        // 例: { fields: { "age": { message: "Age must be a positive number" } } }
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        
        // 422ステータスとmessage, detailsを返す
        res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        // 500ステータスとmessageを返す
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
    next();
});

// tsoaが自動生成したルーティング情報を Express アプリケーションに登録
RegisterRoutes(app);
