import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    ) {}

  @Get('stats')
  @Auth(ValidRoles.admin)
  getPlatformStats() {
    return this.commonService.getPlatformStats();
  }

  @Get('analytics/new-users')
  @Auth(ValidRoles.admin)
  getNewUsers() {
    return this.commonService.getNewUsers();
  }

}
