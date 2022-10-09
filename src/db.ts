import { INTEGER, Sequelize, STRING } from 'sequelize';
import ShortUniqueId from 'short-unique-id';
import { User } from './models';

const sequelize = new Sequelize({
	database: "de48ouogeq5e78",
	username: "pluouxxniejwmf",
	password: "67fe02329bed118ce0517e5525a74ae5c5a88cabaff66f7103a9ae2d97ebe251",
	host: "ec2-54-155-129-189.eu-west-1.compute.amazonaws.com",
	port: 5432,
	dialect: "postgres",
	dialectOptions: {
	  ssl: {
		require: true, // This will help you. But you will see nwe error
		rejectUnauthorized: false // This line will fix new error
	  }
	},
  });

//Instantiate
const uid = new ShortUniqueId({ length: 12 });

// Init all models
User.init(
	{
		nonce: {
			allowNull: false,
			type: INTEGER.UNSIGNED, // SQLITE will use INTEGER
			defaultValue: (): number => Math.floor(Math.random() * 10000), // Initialize with a random nonce
		},
		account: {
			allowNull: false,
			type: STRING,
			unique: true,
			validate: { isLowercase: true },
		},
		username: {
			allowNull: false,
			type: STRING,
			unique: true,
			defaultValue: (): string => uid(),
		},
	},
	{
		modelName: 'user',
		sequelize, // This bit is important
		timestamps: false,
	}
);

// Create new tables
sequelize.sync();

export { sequelize };
