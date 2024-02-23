import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { LinkRepository } from "./links.repository";

@Module({
  controllers: [LinksController],
  providers: [LinksService, LinkRepository],
})
export class LinksModule {}
