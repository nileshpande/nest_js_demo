import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateCarDto } from './dto/create-car.dto';
import { filterParamsDTO } from './dto/filterCars.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarModel } from './entities/car.entity';
import { carsFilterUtil } from './utils/typeInterface.cars';


@Injectable()
export class CarsService {

  public emptyCreateCarDto: CreateCarDto;

  constructor(@InjectRepository(CarModel) private CarRepository: Repository<CarModel>) {

  }

  create(createCarDto: CreateCarDto) {
    return 'This action adds a new car';
  }

  async findAll(carsFilter: carsFilterUtil) {
    const take = carsFilter.RecordsPerPage || 10
    const page = carsFilter.PageNo || 1;
    const skip = (page - 1) * take;
    let orderNumber = carsFilter.SortOrder || 1;
    let orderStatus = "ASC";
    let orderColumn = carsFilter.SortColumn;
    let orderQuery = {};
    let whereQuery = {};
    let oneQuery = {};
    let elementQuery: filterParamsDTO;

    let stringSQL = '';

    if (orderColumn) {
      if (orderNumber == 1) { orderStatus = "ASC"; orderQuery[orderColumn] = orderStatus; }
      else { orderStatus = "DESC"; orderQuery[orderColumn] = orderStatus; }
    }
    if (carsFilter.FilterApplied && carsFilter.FilterParams.length > 0) {
      let tempSQLSTR = "";
      stringSQL = stringSQL + " where ";
      carsFilter.FilterParams.forEach((elementQuery: filterParamsDTO) => {
        oneQuery[elementQuery.FilterColumn] = elementQuery.FilterText;
        if (elementQuery.MatchMode == "NUMERIC_EQUALS") {
          tempSQLSTR = " = ";
          stringSQL = stringSQL + elementQuery.FilterColumn + tempSQLSTR + " " + elementQuery.FilterText;
          tempSQLSTR = "";
        }
      }); 
    }

    const [customCount] = await this.CarRepository.query('select count(*)as count from car_models ' + stringSQL);
    const customResult = await this.CarRepository.query('select * from car_models ' + stringSQL + ' LIMIT '+take+' OFFSET '+skip);

    /******   findAndCount with where condition and pagination  ******/
    // const [result, total] = await this.CarRepository.findAndCount(
    //   {
    //     where: {model_id: 8},
    //     order: orderQuery,
    //     take: take,
    //     skip: skip
    //   }
    // ); 
    /******   findAndCount with where condition and pagination  ******/

    /*****  Create Query Builder method to get data as per condition and page no  *****/

    // let offsetVar = ((page-1) * take);
    // const builder  = await this.CarRepository.createQueryBuilder() 
    // .select(['CarModel.model_id', 'CarModel.make_id', 'CarModel.model_name']) 
    // .where("CarModel.model_id = :model_id", {model_id: '8'})
    // .orWhere("CarModel.make_id = :make_id", {make_id: '2'})
    // builder.orderBy(`CarModel.${orderColumn}`,'ASC')
    // builder.offset(offsetVar).limit(take);

    // const getManyAndCount =await builder.getManyAndCount(); 
      /*****  Create Query Builder method to get data as per condition and page no  *****/

    
    return {  
      data: customResult,
      count: customCount.count, 
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
