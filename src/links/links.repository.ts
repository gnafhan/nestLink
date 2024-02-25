import { db } from "../lib/firebase";
import { collection, doc, getDoc, getDocs, query, addDoc, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { createLinkDTO } from "./dto/create-link.dto";
import {
  InternalServerErrorException,
  NotFoundException, UnauthorizedException
} from "@nestjs/common";
import { editLinkDTO } from "./dto/edit-link.dto";


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

  async getLinkByPath(path: string){
    try {
      const docsQuery = query(collection(db, "links"), where("path","==", path ))
      const docSnap = await getDocs(docsQuery)
      if (docSnap.empty){
        return false
      } else {
        const docs = []
        docSnap.forEach(doc => docs.push(doc))
        return docs[0].data()
      }
    }catch (e) {
      throw new InternalServerErrorException(e)
    }
  }
  
  async editLinkByPath(id: string, editLinkDTO:editLinkDTO){
    try {
      const data:any = await this.getLinkById(id)
      if (!data){
        throw new NotFoundException("link not found")
        return
      }
      if (data.userId != editLinkDTO.userId ) throw new UnauthorizedException()
      const docRef = await doc(db, "links", data.id)
      await updateDoc(docRef, {originalURL: editLinkDTO.originalURL});
      return this.getLinkById(id)
    } catch (e) {
      throw new InternalServerErrorException(e)
    }
  }

  async getLinkUser(user){
    try {
      const docsQuery = query(collection(db, "links"), where("userId","==", user.user_id ))
      const docSnap = await getDocs(docsQuery)
      if (docSnap.empty){
        throw new NotFoundException("No data")
      } else {
        const docs = []
        docSnap.forEach(doc => docs.push({ ...doc.data(), id: doc.id }))
        return docs
      }
    }catch (e) {
      throw new InternalServerErrorException(e)
    }
  }

  async deleteLink(id: string, user_id: string){
    try {
      const data:any = await this.getLinkById(id)
      if (!data){
        throw new NotFoundException("link not found")
        return
      }
      if (data.userId != user_id) throw new UnauthorizedException()
      const docRef = await doc(db, "links", data.id)
      await deleteDoc(docRef);
      return {
        message: "data deleted successfully"
      }
    }catch (e) {
      throw new InternalServerErrorException(e)
    }
  }
}