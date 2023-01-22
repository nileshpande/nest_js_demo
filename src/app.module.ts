import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env','.prod.env'],
    }),
    TypeOrmModule.forRootAsync(
      {
        useFactory:()=>({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT) || 3306,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          cors: {
            origin: 'http://localhost:3000',
            credentials: true,
          },
        })
      }
    ),
    CarsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
