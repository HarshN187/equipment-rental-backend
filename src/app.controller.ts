import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('app')
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async punchInAttendance(
    @UploadedFile() // new ParseFilePipeBuilder()
    // .addFileTypeValidator({
    file //   fileType: 'jpeg',
    // }),
    : Express.Multer.File,
  ) {
    console.log(file);
    return 'hello';
  }

  @Get('check')
  async checkLogin() {
    return this.appService.CheckLogin();
  }
}
