import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name!: string;

  @Column()
    photo!: string;

  @Column()
    information!: string;
}
