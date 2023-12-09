import { ExecutionContext, Inject, Injectable } from "@nestjs/common"
import { RolesGuard } from "./role.guard"
import { BorderCrossSerivce } from "src/BorderCross/border.cross.service"
import { Observable } from "rxjs";
@Injectable()
export class BorderCrossGuard extends RolesGuard{
    override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.getUserRole(context)==='bc';
    }
}
