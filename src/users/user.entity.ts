import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Guess } from "../guesses/guess.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  username: string;

  @Column({nullable: true})
  avatar: string;

  @OneToMany(() => Guess, guess => guess.user)
  guesses: Guess[]

  @AfterInsert()
  logInsert() {
    console.log("Inserted User with id", this.id);
  }

  @AfterInsert()
  logUpdate() {
    console.log("Updated User with id", this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log("Removed User with id", this.id);
  }
}
