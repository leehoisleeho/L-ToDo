import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'; // 导入 UserService

@Injectable()
export class LoginService {
    constructor(private readonly userService: UserService) {} // 注入 UserService
    async index(data:any){
        const result = await this.userService.findOne(data.username)
        if (result){
            if(result.error===0 && result.data.password===data.password ){
                return {
                    error:0,
                    msg:'ok',
                    data:result.data
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
