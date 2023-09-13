import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoursesModule, HomeModule } from './modules';

@Module({
  imports: [ConfigModule.forRoot(), CoursesModule, HomeModule],
})
export class AppModule {}
