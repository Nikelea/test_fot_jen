import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';

@Entity({ name: 'tracks' })
export class Track {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    trackNumber!: number;

  @Column()
    title!: string;

  @Column()
    duration!: string;

  @Column()
    albumId!: number;

  @ManyToOne(() => Album)
  @JoinColumn({ name: 'albumId' })
    album!: Album;
}
