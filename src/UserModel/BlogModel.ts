import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import { UserModel } from "./UserModel";

@Table({tableName:"blog"})
export class BlogModel extends Model {
    @Column
    title:string

    @Column
    picture:string 

    @ForeignKey(()=>UserModel)
    @Column({type:DataType.INTEGER})
    user_id:number

    @BelongsTo(()=>UserModel)
    user:UserModel

    @Column({type:DataType.TEXT('long'), allowNull:false})
    body:string

}