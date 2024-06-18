import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist.entity';

@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    title!: string;

  @Column()
    releaseYear!: number;

  @Column()
    coverImage!: string;

  @Column()
    artistId!: number;

  @ManyToOne(() => Artist)
  @JoinColumn({ name: 'artistId' })
    artist!: Artist;
}
