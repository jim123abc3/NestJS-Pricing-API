import { Report } from "../reports/report.entity";
import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]

  @AfterInsert()
  logInsert() {
    console.log('Insert USER with id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated USER with id: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed USER with id: ', this.id);
  }
}