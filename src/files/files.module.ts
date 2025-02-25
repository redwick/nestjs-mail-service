import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [FilesController],
  providers: [],
  exports: [FilesModule],
  imports: [ConfigModule.forRoot({ envFilePath: 'conf.env' })],
})
export class FilesModule {}
