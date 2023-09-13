import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoursesModule } from './modules/courses/courses.module';
import { HomeModule } from './modules/home/home.module';

@Module({
  imports: [ConfigModule.forRoot(), CoursesModule, HomeModule],
})
export class AppModule {}
