import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
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

  @Column({enum: [1, 2]})
  role: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}