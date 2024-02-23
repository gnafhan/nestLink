import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';


type LinksType = {
  originalURL: string,
  shortURL: string,
  path: string,
  userId: string,
  createdAt: number,
  id: string
}
@Injectable()
export class LinksService {
  private links: LinksType[] = [
    {
      originalURL: "https://nafhan.site3",
      shortURL: "https://nafhan.site/test3",
      path: "test3",
      userId: "sdndcdns-1213ndw-sddncadfc",
      createdAt: Date.now(),
      id:"asdw"
    },
    {
      originalURL: "https://nafhan.site2",
      shortURL: "https://nafhan.site/test2",
      path: "test2",
      userId: "sdndcdns-1213ndw-sddnaasc",
      createdAt: Date.now(),
      id: "qwerty"
    },
    {
      originalURL: "https://nafhan.site2",
      shortURL: "https://nafhan.site/test1",
      path: "test1",
      userId: "sdndcdns-1213ndw-sddncc",
      createdAt: Date.now(),
      id:"abcd"
    },
  ]

  getAllLinks(){
    return this.links;
  }

  getLinkById(id:string){
    const result = this.links.find(item => item.id == id);
    if (!result){
      throw new NotFoundException();
    }
    return result;
  }

  postLink(originalURL, shortURL, path, userId){
    const newData: LinksType = {
      originalURL: originalURL,
        shortURL: shortURL,
        path: path,
        userId: userId,
        createdAt: Date.now(),
        id: uuidv4()
    }
    this.links.push(newData);
    return newData;
  }
}
