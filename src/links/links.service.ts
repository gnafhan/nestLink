import { BadRequestException, Injectable } from "@nestjs/common";
import { createLinkDTO } from "./dto/create-link.dto";
import {LinkRepository} from "./links.repository";
import { editLinkDTO } from "./dto/edit-link.dto";
@Injectable()
export class LinksService {
  constructor( private readonly linkRepository:LinkRepository) {
  }

  getAllLinks(){
    return this.linkRepository.getLinks()
  }

  getLinkUser(user){
    return this.linkRepository.getLinkUser(user)
  }

  getLinkById(id:string){
    return this.linkRepository.getLinkById(id)
  }

  async postLink(createLinkDTO: createLinkDTO){
    const isRegistered = await this.linkRepository.getLinkByPath(createLinkDTO.path)
    if (!isRegistered){
      return this.linkRepository.addLink(createLinkDTO)
    } else {
      throw new BadRequestException("path already registered")
    }
  }

  async editLink(editLinkDTO: editLinkDTO, id: string){
    return this.linkRepository.editLinkByPath(id, editLinkDTO)
  }

  async deleteLink(id:string, user_id:string){
    return this.linkRepository.deleteLink(id, user_id)
  }
}
