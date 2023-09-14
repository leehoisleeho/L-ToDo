import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'; // 导入 UserService
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LoginService {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {} // 注入 UserService

    async index(data:any){
        const result = await this.userService.findOne(data.username)
        if (result){
            if(result.error===0 && result.data.password===data.password ){
                const token = this.authService.generateToken(data.username)
                return {
                    error:0,
                    msg:'ok',
                    data:result.data,
                    token
                }
            }else {
                return{
                    error:1,
                    msg:'用户名不正确或密码错误'
                }
            }
        }else {
            return{
                error:1,
                msg:'用户名不存在'
            }
        }
    }
}
