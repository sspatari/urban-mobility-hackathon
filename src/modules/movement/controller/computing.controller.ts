import { Controller, Get, Query } from '@nestjs/common';
import { DistrictSimplifiedData, Point } from '../model';
import { ComputingService } from '../service';

@Controller()
export class ComputingController {
  constructor(private readonly computingService: ComputingService) {}

  @Get('/district/movement')
  async getDistrictMovemens(): Promise<any> {
    return this.computingService.getDistrictMovements();
  }

  @Get('/districts')
  async getSimplifiedDistricts(): Promise<{
    districts: DistrictSimplifiedData[];
  }> {
    return this.computingService.getSimplifiedDistricts();
  }

  @Get('/point/district')
  async getDistrictByPoint(@Query() point: Point): Promise<{ title: string }> {
    return this.computingService.getDistrictByPoint(point);
  }

  @Get('/hitmap')
  async getHitmap(): Promise<any> {
    return this.computingService.getHitmap(point);
  }
}
