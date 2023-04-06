import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../../enums/role.enum';

@Entity({name: 'users', schema: 'public'})
export class UserEntity {
  @PrimaryGeneratedColumn({unsigned: true})
  id?: number;

  @Column({length: 60})
  name: string;

  @Column({nullable: true})
  age?: number;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({default: Role.User})
  role: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}