import { Model } from 'sequelize';

export class User extends Model {
	public id!: number; // Note that the `null assertion` `!` is required in strict mode.
	public nonce!: number;
	public account!: string;
	public username!: string; // for nullable fields
}
