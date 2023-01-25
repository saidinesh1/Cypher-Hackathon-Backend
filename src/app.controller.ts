import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
  async getAggregateBalance(): Promise<string> {
    return this.appService.getAggregateBalance();
  }
  async WatchListManagementFeature():Promise<string>{
    return this.appService.WatchListManagementFeature();
  }
  
}
