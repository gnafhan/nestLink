import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LinksService } from "./links.service";
import { createLinkDTO } from "./dto/create-link.dto";

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
  postLink(@Body() createLinkDTO: createLinkDTO){

    return this.linksService.postLink(createLinkDTO)
  }
}
