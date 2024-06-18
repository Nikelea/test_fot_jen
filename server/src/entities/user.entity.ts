import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import bcrypt from "bcrypt";
import { nanoid } from 'nanoid';

@Entity('users')
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    username!: string;

  @Column()
    password!: string;

  @Column({ nullable: true })
    token?: string;

  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  public generateToken() {
    this.token = nanoid();
  }
}
