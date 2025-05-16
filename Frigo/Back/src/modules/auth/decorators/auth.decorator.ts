import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";

export function Auth(role: Role) {
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    )
}