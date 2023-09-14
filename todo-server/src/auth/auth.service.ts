import {Injectable} from '@nestjs/common';
import {sign, verify} from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private readonly secretKey = 'lapland'; // 替换为您自己的密钥
    // 生成token
    generateToken(username: string): any {
        const payload = {username};
        return sign(payload, this.secretKey, {expiresIn: '24h'}); // 您可以自定义过期时间
    }
    // 验证token
     verifyToken(token: string) {
        try {
            const res = verify(token, this.secretKey);
            if (res) {
                return {
                    error: 0,
                    msg: '验证通过'
                }
            } else {
                return {
                    error: 1,
                    msg: '验证不通过'
                }
            }
        } catch (error) {
            return {
                error: error,
                msg: 'token无效'
            }
        }
    }
}