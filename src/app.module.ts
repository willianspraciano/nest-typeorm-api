import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoursesModule, HomeModule, UsersModule, AuthModule } from './modules';

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
