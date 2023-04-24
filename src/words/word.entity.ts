import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  word: string;
  @Column()
  normalizedWord: string;
  @Column({nullable: true})
  synonym?: string;
  @Column({nullable: true})
  definition?: string;
  @Column({nullable: true})
  examples?: string;
  @Column()
  createdAt: string;
  @Column()
  updatedAt: string;
}
