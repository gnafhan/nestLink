import { IsNotEmpty } from "class-validator";

export class createLinkDTO {
  @IsNotEmpty()
  
  originalURL: string
  @IsNotEmpty()
  shortURL: string
  @IsNotEmpty()
  path: string
  userId: string
}