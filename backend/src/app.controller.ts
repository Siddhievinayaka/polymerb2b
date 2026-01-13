import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getStatus() {
    return {
      message: 'Polymer Trading Platform API',
      status: 'Running',
      version: '1.0.0',
      endpoints: {
        docs: '/api',
        auth: '/auth',
        inventory: '/inventory',
        orders: '/orders',
        admin: '/admin'
      }
    };
  }
}