import { Module } from '@nestjs/common';
import { AuthModule } from './modules/access-control/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/access-control/infrastructure/adapters/primary/guards/jwt-auth.guard';
import { DatabaseModule } from '@infrastructure-general/database/database.module';
import { ConstantModule } from '@infrastructure-general/constants/constant.module';
import { OperationsProgrammingModule } from './modules/operations-programming/operations-programming.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    ConstantModule,
    DatabaseModule,
    OperationsProgrammingModule,
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
