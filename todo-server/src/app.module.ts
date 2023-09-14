import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TodolistModule } from './todolist/todolist.module';
import { LoginModule } from './login/login.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '119.45.199.52',
      port: 3306,
      username: 'todo',
      password: 'biYd8DyX7TBYZGWH',
      database: 'todo',
      retryDelay: 500,
      retryAttempts: 10,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    TodolistModule,
    LoginModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
