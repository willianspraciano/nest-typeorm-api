import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoursesModule, HomeModule, UsersModule } from './modules';

@Module({
  imports: [ConfigModule.forRoot(), CoursesModule, HomeModule, UsersModule],
})
export class AppModule {}
