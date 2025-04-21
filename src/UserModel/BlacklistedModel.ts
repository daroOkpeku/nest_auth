import { Table, Model, Column, DataType } from "sequelize-typescript";
@Table({ tableName: 'blacklisted_tokens' })
export class BlacklistModel extends Model {
@Column({ type: DataType.TEXT('long'), allowNull: false })
token:string

@Column({ type: DataType.BOOLEAN, defaultValue: true })
is_blackedlisted:Boolean
}