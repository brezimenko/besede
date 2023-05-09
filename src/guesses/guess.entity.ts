import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Word } from "../words/word.entity";

@Entity()
export class Guess {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  guesses: string
  @Column()
  success: boolean
  @ManyToOne(() => User, user => user.guesses)
  user: User
  @ManyToOne(() => Word)
  word: Word
}
