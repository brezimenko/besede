import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({example: 1, description: 'user id'})
  id: number;
  @Column()
  @ApiProperty({example: 'joe@gmail.com', description: 'User email'})
  email: string;
  @ApiProperty({example: 'f13h1g02i10o3g=!WS.', description: 'User password'})
  @Column()
  password: string;

  @ApiProperty({example: 'f13h1g02i10o3g=!WS.', description: 'Username'})
  @Column({nullable: true})
  username: string;

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
