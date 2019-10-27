import { Injectable } from '@nestjs/common';
import inside from 'point-in-polygon';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Movement, Region } from '../entity';
import { Coord, DistrictSimplifiedData, Point } from '../model';
import { MovementRepository, RegionRepository } from '../repository';
import { getHourString } from '../utils';

@Injectable()
export class ComputingService {
  private districtsObj:
    | {
        districts: DistrictSimplifiedData[];
      }
    | undefined = undefined;

  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly regionRepository: RegionRepository,
  ) {}

  async getDistrictMovements(): Promise<any> {
    const result: {
      [key: string]: number[];
    } = {};

    const regions: Region[] = await this.regionRepository.find();
    const region_names: string[] = regions.map((region: Region) => region.name);

    for (const region_name of region_names) {
      result[region_name] = [];
    }

    const hourlyMovements: {
      [key: number]: Movement[];
    } = {};

    let counter = 0;

    for (let i: number = 0; i <= 23; i++) {
      hourlyMovements[i] = await this.getMovementsInRange(i);

      console.log('Calculating for hour: ', i);

      const avgDistrictSpeed: {
        [key: string]: number[];
      } = {};

      for (const region_name of region_names) {
        avgDistrictSpeed[region_name] = [];
      }

      for (let j: number = 0; j < hourlyMovements[i].length; ++j) {
        const point: Point = {
          x: hourlyMovements[i][j].geom.coordinates[0][0],
          y: hourlyMovements[i][j].geom.coordinates[0][1],
        };
        let time = hourlyMovements[i][j].endtime.getTime() - hourlyMovements[i][j].starttime.getTime();
        time = time / 3600 / 1000;
        if (time <= 1) {
          const district = (await this.getDistrictByPoint(point)).title;
          // if (counter !== i) {
          //   console.log('****: ', i);
          //   console.log(hourlyMovements[i][j]);
          // }
          if (district !== '') {
            const avgUserSpeed: number = hourlyMovements[i][j].length / time;
            avgDistrictSpeed[district].push(avgUserSpeed);
          }
        }
      }
      const avgSpeedDistrict: {
        [key: string]: number;
      } = {};
      for (const region_name of region_names) {
        avgSpeedDistrict[region_name] =
          avgDistrictSpeed[region_name].reduce((acum: number, element: number) => acum + element, 0) /
          avgDistrictSpeed[region_name].length;
      }
      for (const region_name of region_names) {
        result[region_name].push(avgSpeedDistrict[region_name]);
      }
      counter = counter + 1;
    }

    return result;
  }

  async getMovementsInRange(hour: number): Promise<Movement[]> {
    const hourStr: string = getHourString(hour);
    let startDate = new Date(`2019-06-03T${hourStr}:00:00-0000`);
    let endDate = new Date(`2019-06-03T${hourStr}:59:59-0000`);
    const rangeDateTimeMin: Date = new Date(startDate.getTime() - 3 * 3600 * 1000);
    const rangeDateTimeMax: Date = new Date(endDate.getTime() - 3 * 3600 * 1000);

    return this.movementRepository
      .find({
        where: {
          starttime: MoreThanOrEqual(rangeDateTimeMin),
          endtime: LessThanOrEqual(rangeDateTimeMax),
        },
        order: {
          starttime: 'ASC',
        },
        take: 200,
      })
      .then((movements: Movement[]) => {
        const movements2: Movement[] = movements.map((item: Movement) => {
          item.starttime = new Date(item.starttime.getTime() + 3 * 3600 * 1000);
          item.endtime = new Date(item.endtime.getTime() + 3 * 3600 * 1000);
          return item;
        });
        return movements2;
      });
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

    this.districtsObj = districtsObj;

    return districtsObj;
  }

  async getDistrictByPoint(point: Point): Promise<{ title: string }> {
    const districtsObj: {
      districts: DistrictSimplifiedData[];
    } = this.districtsObj || (await this.getSimplifiedDistricts());

    for (const district of districtsObj.districts) {
      if (inside([point.x, point.y], district.polygon)) {
        return { title: district.title };
      }
    }

    return { title: '' };
  }

  async getHitmap(): Promise<any> {
    const result: {
      hitmap: {
        hour: number;
        points: Coord[];
      }[];
    } = {
      hitmap: [],
    };

    for (let i: number = 0; i <= 23; i++) {
      const movementsByHour: Movement[] = await this.getMovementsInRange(i);

      result.hitmap.push({
        hour: i,
        points: [],
      });
      for (const movement of movementsByHour) {
        const point: Coord = [movement.geom.coordinates[0][0], movement.geom.coordinates[0][1]];
        result.hitmap[result.hitmap.length - 1].points.push(point);
      }
    }
    return result;
  }
}
