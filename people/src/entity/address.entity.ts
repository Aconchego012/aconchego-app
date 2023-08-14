import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  streetName: string;

  @Column()
  neighborhood: string;

  @Column()
  number: number;

  @Column()
  city: string;
}
