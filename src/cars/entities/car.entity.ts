import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('car_models')
export class CarModel {
  @PrimaryGeneratedColumn()
  model_id: number;
    
  @Column()
  model_name: string;
  
  @Column()
  make_id:string; 
  
  @Column()
  make_name:string;
  
  @Column()
  Image1:string;
  
  @Column()
  Image2:string;
  
  @Column()
  Image3:string;
  
  @Column()
  Image4:string;

  @Column()
  isActive:boolean;
}
	 