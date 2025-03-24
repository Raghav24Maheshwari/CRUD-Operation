import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, createApiResponse } from 'src/utils/response.util';
import { ConfigService } from '@nestjs/config';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { version } from '../../v1.constant';
import { AddDto } from './auth.dto';
import { TrimPipe } from 'src/pipes/trim.pipe';

@Controller(`api/${version}/admin/auth`)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/demo')
  // @UseGuards(RolesGuard)
  // @Roles('admin')
  async demo1(@Body() body: any): Promise<ApiResponse<object>> {
    try {
      const data = await this.authService.demo1();
      return createApiResponse(data, 'Demo API Response Succesfull');
    } catch (error) {
      console.error('Error :', error);
      throw new BadRequestException('API Failed ');
    }
  }

  @Get('/get-profile')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getProfile(@Req() req: Request): Promise<ApiResponse<any | {}>> {
    try {
      const authData = (req as any).authData;
      const id = authData.id;
      const user = await this.authService.getProfile(id);
      return createApiResponse(user, 'Profile fetched successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/add')
  @UsePipes(
    new ValidationPipe({ transform: true }),
    new TrimPipe([
      'first_name',
      'last_name',
      'email',
      'mobile',
      'country_code',
    ]),
  )
  async add(
    @Req() req: Request,
    @Body() addDto: AddDto,
  ): Promise<ApiResponse<object>> {
    try {
      const user = await this.authService.add(addDto);
      return createApiResponse(user, 'admin Added Succesfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
