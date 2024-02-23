import { db } from "../lib/firebase";
import { collection, doc, getDoc, getDocs, query, addDoc } from 'firebase/firestore';
import { createLinkDTO } from "./dto/create-link.dto";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

export class LinkRepository{
  async addLink(createLinkDTO:createLinkDTO){
    const { originalURL, shortURL, path, userId } = createLinkDTO
    try {
      const result = await addDoc(collection(db, "links"), {
        originalURL,
        shortURL,
        path,
        userId,
        createdAt: Date.now()
      })

      return {
        id: result.id,
        originalURL,
        shortURL,
        path,
        userId,
        createdAt: Date.now()
      };
    }catch (err){
      throw new InternalServerErrorException(err);
    }
  }

  async getLinks(){
    try {
      const docsQuery = query(collection(db, "links"))
      const docSnap = await getDocs(docsQuery)
      const res = []
      if (docSnap.empty){
        throw new NotFoundException("empty")
        return
      }
      docSnap.forEach(doc => res.push({
        ...doc.data(),
        id: doc.id
      }))
      return res
    } catch (err){
      throw new InternalServerErrorException(err);
    }
  }

  async getLinkById( id: string){
    try {
      const docRef = doc(db, "links", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()){
        return { ...docSnap.data(), id: docSnap.id }
      } else {
        throw new NotFoundException("data not found")
      }
    } catch (e) {
      throw new InternalServerErrorException(e)
    }
  }
}