import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoursesModule, HomeModule, UsersModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoursesModule,
    HomeModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
