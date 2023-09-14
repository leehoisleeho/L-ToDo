import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService ) {}
    @Post('check')
    async verifyToken(@Body() tokenData: { token: string }): Promise<any> {
        // 使用JWT服务验证令牌
        const decoded = this.authService.verifyToken(tokenData.token);
        return { decoded };
    }
}
