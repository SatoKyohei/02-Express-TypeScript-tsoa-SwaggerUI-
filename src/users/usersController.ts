import {
    Body,
    Controller,
    Get,
    Header,
    Middlewares,
    Path,
    Post,
    Query,
    Request,
    Response,
    Route,
    SuccessResponse,
} from "tsoa";
import { User } from "./user";
import { UserCreationParams, UsersService } from "./usersService";
import {
    AuthenticatedRequest,
    authMiddleware,
} from "../middleware/authMiddleware";

interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

@Route("users")
@Middlewares([authMiddleware])
export class UsersController extends Controller {
    @Get("{userId}")
    public async getUser(
        @Header("X-Access-Token") _token: string,
        @Request() req: AuthenticatedRequest,
        @Path() userId: number,
        @Query() name?: string
    ): Promise<User> {
        return new UsersService().get(userId, name);
    }

    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("201", "Created")
    @Post()
    public async createUser(
        @Header("X-Access-Token") _token: string,
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201);
        new UsersService().create(requestBody);
        return;
    }
}
