import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata, UseInterceptors, UploadedFiles, UsePipes, ValidationPipe, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }


  @Post('registerProfesional')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'foto', maxCount: 1 },
    { name: 'certificadoEstudios', maxCount: 10 },
  ]))
  // @UsePipes(new ValidationPipe())
  createProfesional(@Body() createProfesionalDto: CreateProfesionalDto, @UploadedFiles() files: {foto?: Express.Multer.File[], certificadoEstudios?: Express.Multer.File[]}) {
    return this.authService.createProfesional(createProfesionalDto, files);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // verificar este endpoint --------------------------------------------
  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    // @Req() req: Express.Request
  ) {
    // console.log({ user: req.user})
    // console.log({User})
    return {
      ok: true,
      msg: 'Hola mundo private',
      user,
      userEmail
    }
  }

  // @SetMetadata('roles', ['admin', 'suport'])
  //verificar este tambien
  @Get('private2')
  @RoleProtected( ValidRoles.admin)
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User,
  ) {

    return {
      ok: true,
      user,
    }
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(
    @GetUser() user: User,
  ) {

    return {
      ok: true,
      user,
    }
  }

}
