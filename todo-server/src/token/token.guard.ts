import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {verify} from 'jsonwebtoken';

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      // 如果请求头中没有 token，返回 false 并发送响应给前端
      const response = context.switchToHttp().getResponse();
      response.status(401).json({ message: 'Unauthorized' });
      return false;
    }
    try {
      // 使用 JWT Service 验证 token 的有效性
      const decoded = verify(token,'lapland');
      request.user = decoded; // 将解码后的用户信息存储在请求对象中
      return true; // 认证成功，请求将继续执行
    } catch (error) {
      // 验证失败，返回响应给前端
      const response = context.switchToHttp().getResponse();
      response.status(403).json({ message: 'token过期' });
      return false;
    }
  }
}
