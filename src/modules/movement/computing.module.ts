import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputingController } from './controller';
import { Movement, Region } from './entity';
import { MovementRepository, RegionRepository } from './repository';
import { ComputingService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Movement, MovementRepository, Region, RegionRepository])],
  controllers: [ComputingController],
  providers: [ComputingService],
  exports: [],
})
export class ComputingModule {}
