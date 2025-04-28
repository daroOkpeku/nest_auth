import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { title } from 'process';
import { BlogModel } from 'src/UserModel/BlogModel';

@Injectable()
export class BlogService {

    constructor(@InjectModel(BlogModel) private readonly blogModel: typeof BlogModel ){}

    Createblog(data:{ title:string, user_id:number, picture:string,  body:string}){
      this.blogModel.create({
        title:data.title,
        picture:data.picture,
        user_id:data.user_id,
        body:data.body
      })

      return {"message":'successful'}
    }
}
