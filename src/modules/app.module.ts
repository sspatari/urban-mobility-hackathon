import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { ComputingModule } from './movement/computing.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), ComputingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
