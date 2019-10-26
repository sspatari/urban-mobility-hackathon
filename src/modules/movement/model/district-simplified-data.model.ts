export class DistrictSimplifiedData {
  title: string;
  polygon: DistrictCoord[];

  constructor(title: string, coords: DistrictCoord[]) {
    this.title = title;
    this.polygon = coords;
  }
}

type DistrictCoord = [number, number];
