import { Injectable, NotFoundException } from '@nestjs/common';
import inside from 'point-in-polygon';
import { Movement, Region } from '../entity';
import { DistrictSimplifiedData, Point } from '../model';
import { MovementRepository, RegionRepository } from '../repository';

@Injectable()
export class ComputingService {
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly regionRepository: RegionRepository,
  ) {}
  async getDistrictMovements(): Promise<any> {
    const result: any = {
      district: [],
    };

    const regions: Region[] = await this.regionRepository.find();
    const region_names: string[] = regions.map((region: Region) => region.name);

    for (const region_name of region_names) {
      result.district.push({
        title: region_name,
        avg_speed: [],
      });
    }

    const movement: Movement | undefined = await this.movementRepository.findOne({ id: 1 });

    if (!movement) throw new NotFoundException();

    const timeDiff: number = Math.abs(movement.endtime.getTime() - movement.starttime.getTime()); // miliseconds

    console.log(timeDiff, movement.id, movement.agent);

    // if (movement) {
    //   console.log(movement.geom.coordinates[0][0], movement.geom.coordinates[0][1]);
    // }
    // return this.movementRepository.findOne({ id: 1 });

    return result;
  }

  async getSimplifiedDistricts(): Promise<{
    districts: DistrictSimplifiedData[];
  }> {
    const regions: Region[] = await this.regionRepository.find();

    const districtsObj: {
      districts: DistrictSimplifiedData[];
    } = {
      districts: [],
    };

    for (const region of regions) {
      DistrictSimplifiedData;
      districtsObj.districts.push(new DistrictSimplifiedData(region.name, region.geom.coordinates.flat(2)));
    }

    return districtsObj;
  }

  async getDistrictByPoint(point: Point): Promise<{ title: string }> {
    const districtsObj: {
      districts: DistrictSimplifiedData[];
    } = await this.getSimplifiedDistricts();

    for (const district of districtsObj.districts) {
      if (inside([point.x, point.y], district.polygon)) {
        return { title: district.title };
      }
    }

    throw new NotFoundException();
  }
}
