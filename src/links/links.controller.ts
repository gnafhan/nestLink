import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { LinksService } from "./links.service";
import { createLinkDTO } from "./dto/create-link.dto";
import { editLinkDTO } from "./dto/edit-link.dto";
import { FirebaseAuthGuard } from "../firebase-auth/firebase-auth.guard";

@Controller('links')
@UseGuards(FirebaseAuthGuard)
export class LinksController {
  constructor(private linksService: LinksService) {}
  @Get("/all")
  getLinks(@Req() request){
    if (request.user.email != "nafhanghifari@gmail.com") throw new UnauthorizedException()
    return this.linksService.getAllLinks();
  }

  @Get()
  getLinkUser(@Req() request){
    return this.linksService.getLinkUser(request.user)
  }

  @Get("/:id")
  getLinkById(@Param('id') id:string){
    return this.linksService.getLinkById(id);
  }

  @Post()
  postLink(@Body() createLinkDTO: createLinkDTO, @Req() request){
    createLinkDTO.userId = request.user.user_id;
    return this.linksService.postLink(createLinkDTO)
  }

  @Patch("/:id")
  editLink(@Body() editLinkDTO:editLinkDTO, @Param("id") id:string, @Req() request){
    editLinkDTO.userId = request.user.user_id;
    return this.linksService.editLink(editLinkDTO, id)
  }

  @Delete("/:id")
  deleteLink(@Param("id") id:string, @Req() request) {
    return this.linksService.deleteLink(id, request.user.user_id)
  }
}
