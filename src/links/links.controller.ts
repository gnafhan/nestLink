import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { LinksService } from "./links.service";

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}
  @Get()
  getLinks(){
    return this.linksService.getAllLinks();
  }

  @Get("/:id")
  getLinkById(@Param('id') id:string){
    return this.linksService.getLinkById(id);
  }

  @Post()
  postLink(
    @Body("originalURL") originalURL: string,
    @Body("shortURL") shortURL: string,
    @Body("path") path: string,
    @Body("userId") userId : string
  ){
    return this.linksService.postLink(originalURL, shortURL, path, userId)
  }
}
