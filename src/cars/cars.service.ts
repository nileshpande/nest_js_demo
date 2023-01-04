import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarModel } from './entities/car.entity';
import { carsFilterUtil } from './utils/typeInterface.cars';


@Injectable()
export class CarsService {

  public emptyCreateCarDto:CreateCarDto;

  constructor(@InjectRepository(CarModel) private CarRepository: Repository<CarModel>  )
  {

  }

  create(createCarDto: CreateCarDto) {
    return 'This action adds a new car';
  }

  async findAll(carsFilter:carsFilterUtil) {
    const take= carsFilter.RecordsPerPage || 10
    const page= carsFilter.PageNo || 1;
    const skip= (page-1) * take ;
    let orderNumber = carsFilter.SortOrder || 1;
    let orderStatus = "DESC";
    let orderColumn = carsFilter.SortColumn; 
    let emptyOrder={}; 

    if(orderColumn)
    { 
      if(orderNumber==1)
      { emptyOrder[orderColumn]="ASC" }
      else
      { emptyOrder[orderColumn]="DESC" }
    }
     
    const [result, total] = await this.CarRepository.findAndCount(
      {
          order: emptyOrder,
          take: take,
          skip: skip
      }
  );

  return {
      data: result,
      count: total
  }
    //return this.CarRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
