import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementController } from './controller';
import { Movement } from './entity';
import { MovementRepository } from './repository';
import { MovementService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Movement, MovementRepository])],
  controllers: [MovementController],
  providers: [MovementService],
  exports: [],
})
export class MovementModule {}
