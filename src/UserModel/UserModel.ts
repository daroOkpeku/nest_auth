import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { BlogModel } from "./BlogModel";


@Table
export class UserModel extends Model{
@Column
name:string

@Column
email:string

@Column
password:string

// To add a foreign key relationship from user_id in your BlogModel to the users table using sequelize-typescript, you should use the @ForeignKey, @BelongsTo, 
// and properly reference the UserModel.
@HasMany(()=>require('./BlogModel').BlogModel)
blogs:BlogModel[]
} 