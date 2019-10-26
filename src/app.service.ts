import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTrolleyRoutes(): string {
    return 'Hello Bitches!';
  }
}
