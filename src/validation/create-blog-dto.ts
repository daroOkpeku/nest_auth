import {IsNumber, IsOptional, IsString } from "class-validator";

export class Blogvalidation{
    @IsString()
    title:string

    @IsString()
    user_id:string

    @IsOptional()
    picture:string

    @IsString()
    body:string
}


