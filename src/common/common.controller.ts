import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Common')
@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    ) {}

  @Get('stats')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'Stats of the platform'})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  getPlatformStats() {
    return this.commonService.getPlatformStats();
  }

  @Get('analytics/new-users')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'New users of the platform'})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  getNewUsers() {
    return this.commonService.getNewUsers();
  }

}
