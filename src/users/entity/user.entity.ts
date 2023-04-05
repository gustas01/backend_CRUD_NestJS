import { Role } from 'src/enums/role.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'users', schema: 'public'})
export class UserEntity {
  @PrimaryGeneratedColumn({unsigned: true})
  id: number;

  @Column({length: 60})
  name: string;

  @Column({nullable: true})
  age: number;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({default: Role.User})
  role: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}