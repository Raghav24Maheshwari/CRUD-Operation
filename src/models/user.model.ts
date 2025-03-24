import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
    // unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  mobile: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  countryCode: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  loginOtp: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  verifyOtp: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  forgotCode: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  profilePic: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  slug: string;

  @Column({
    type: DataType.ENUM('admin'),
    defaultValue: 'admin',
  })
  access: string;

  @Column({
    type: DataType.ENUM('active', 'inactive', 'deleted'),
    defaultValue: 'inactive',
  })
  status: string;
}
