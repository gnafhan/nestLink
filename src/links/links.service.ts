import { Injectable } from "@nestjs/common";
import { createLinkDTO } from "./dto/create-link.dto";
import {LinkRepository} from "./links.repository";
@Injectable()
export class LinksService {
  constructor( private readonly linkRepository:LinkRepository) {
  }

  getAllLinks(){
    return this.linkRepository.getLinks()
  }

  getLinkById(id:string){
    return this.linkRepository.getLinkById(id)
  }

  postLink(createLinkDTO: createLinkDTO){
    return this.linkRepository.addLink(createLinkDTO)
  }
}
