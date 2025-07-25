import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  CheckLogin(): boolean {
    return true;
  }
}
