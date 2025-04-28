import { Body, Controller, Post, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blogvalidation } from 'src/validation/create-blog-dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path'
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


@Post('upload_img')
@UseInterceptors(FileInterceptor('picture',{
  storage:diskStorage({
    destination:'./upload',  //this where the image will be saved
    filename:(req, file, cb)=>{
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix+extname(file.originalname) )
    }
  })
}),
)
async Createblog(@Body(new ValidationPipe()) Blog:Blogvalidation, @UploadedFile() file: Express.Multer.File){


  const user = {
    title:Blog.title,
    user_id:parseInt(Blog.user_id),
    picture:file.filename || "",
    body:Blog.body
  }
 return this.blogService.Createblog(user);
}

}
