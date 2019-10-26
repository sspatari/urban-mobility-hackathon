import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { MovementModule } from './movement/movement.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), MovementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
