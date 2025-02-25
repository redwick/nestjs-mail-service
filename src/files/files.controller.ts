import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as process from 'node:process';

@Controller('uploads')
export class FilesController {
  constructor() {}
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          let id = '';
          const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
          for (let i = 0; i < 8; i++) {
            id += characters.charAt(
              Math.floor(Math.random() * charactersLength),
            );
          }
          const date = new Date();
          const dateStr =
            ('0' + date.getDate()).slice(-2) +
            '.' +
            ('0' + (date.getMonth() + 1)).slice(-2) +
            '.' +
            date.getFullYear();
          const uploadPathL1 = './uploads/' + dateStr + '/';
          const uploadPathL2 = './uploads/' + dateStr + '/';
          const uploadPathL3 = './uploads/' + dateStr + '/' + id + '/';
          if (!fs.existsSync(uploadPathL1)) {
            fs.mkdirSync(uploadPathL1);
          }
          if (!fs.existsSync(uploadPathL2)) {
            fs.mkdirSync(uploadPathL2);
          }
          if (!fs.existsSync(uploadPathL3)) {
            fs.mkdirSync(uploadPathL3);
          }
          cb(null, uploadPathL3);
        },
        filename: (req, file, cb) => {
          cb(null, decodeURI(file.originalname));
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return JSON.stringify(
      file.destination.replace('./', process.env.HTTP_REST) + file.originalname,
    );
  }
  @Get(':date/:id/:name')
  downloadFile(@Param('date') date, @Param('id') id, @Param('name') name) {
    const path = './uploads/' + date + '/' + id + '/' + name;
    return new StreamableFile(fs.createReadStream(path));
  }
}
