import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Role } from './role.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  phone: string;

  @Column()
  birthdate: Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}
