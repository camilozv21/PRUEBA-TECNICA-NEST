import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { GetUser } from './decorators/get-user.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { RateProfesionalDto } from './dto/rate-profesional.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Profesional } from './entities/profesional.entity';
import { SolicitudProfesionalDto } from './dto/aprobar-profesional.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User created', type: User})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }


  @Post('registerProfesional')
  @ApiResponse({ status: 201, description: 'Profesional created', type: Profesional})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'foto', maxCount: 1 },
    { name: 'certificadoEstudios', maxCount: 10 },
  ]))
  createProfesional(
    @Body() createProfesionalDto: CreateProfesionalDto,
    @UploadedFiles() files: {foto?: Express.Multer.File[], certificadoEstudios?: Express.Multer.File[]}
    ) {
    return this.authService.createProfesional(createProfesionalDto, files);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in', type: User || Profesional})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('rate/:id')
  @Auth(ValidRoles.user)
  @ApiResponse({ status: 200, description: 'User rated', type: RateProfesionalDto})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  rateProfesional(@Param('id') id: string, 
  @Body() rateProfesionalDto: RateProfesionalDto,
  @GetUser('_id') userId: string,
  ) {
    return this.authService.rateProfesional(id, rateProfesionalDto, userId);
  }

  @Get('searchByTerm/:term')
  @Auth(ValidRoles.user, ValidRoles.admin, ValidRoles.soporte)
  @ApiResponse({ status: 200, description: 'User found', type: Profesional})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findByTerm(@Param('term') term: string) {
    return this.authService.findByTerm(term);
  }
  
  @Post('solicitudProfesional/:id')
  @Auth(ValidRoles.user)
  @ApiResponse({ status: 200, description: 'Solicitud enviada', type: SolicitudProfesionalDto})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  solicitudProfesional(@Param('id') id: string, 
  @GetUser('_id') userId: string,
  ) {
    return this.authService.solicitudProfesional(id, userId);
  }
  
  @Patch('activateProfesional/:id')
  @Auth(ValidRoles.soporte)
  @ApiResponse({ status: 200, description: 'Profesional activated', type: Profesional})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  activateProfesional(@Param('id') id: string, 
  ) {
    return this.authService.activateProfesional(id);
  }

  @Patch('updateUser/:id')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'User updated', type: UpdateUserDto})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  updateUser(@Param('id') id: string, 
  @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Patch('updateProfesional/:id')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'Profesional updated', type: UpdateProfesionalDto})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  updateProfesional(@Param('id') id: string, 
  @Body() updateProfesionalDto: UpdateProfesionalDto,
  ) {
    return this.authService.updateProfesional(id, updateProfesionalDto);
  }

  @Get('user/:id')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'User found userId or ProfesionalId', type: User || Profesional})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findById(@Param('id') id: string) {
    return this.authService.findById(id);
  }

}
