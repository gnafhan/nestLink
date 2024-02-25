import { IsNotEmpty } from "class-validator";

export class editLinkDTO {
  @IsNotEmpty()

  originalURL: string

  userId:string

}