import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import {UserModule} from "../user/user.module";
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[UserModule,AuthModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
