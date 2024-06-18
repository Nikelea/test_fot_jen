import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Track } from './track.entity';

@Entity('track_history')
export class TrackHistory {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    userId!: number;

  @Column()
    trackId!: number;

  @Column()
    datetime!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
    user!: User;

  @ManyToOne(() => Track)
  @JoinColumn({ name: 'trackId' })
    track!: Track;
}
