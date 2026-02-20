import { Injectable } from '@nestjs/common';

@Injectable()
export class DataInitService {
  private isDataInitialized = false;

  isInitialized(): boolean {
    return this.isDataInitialized;
  }

  initialize(): void {
    if (this.isDataInitialized) {
      return;
    }
    this.isDataInitialized = true;
  }
}
