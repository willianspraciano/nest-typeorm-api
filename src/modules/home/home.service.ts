import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  getStatus() {
    return { status: 'Server running!' };
  }
}
