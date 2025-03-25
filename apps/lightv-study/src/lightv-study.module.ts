import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database';
import { AuthModule } from '@auth/auth';
import { SharedModule } from '@shared/shared';

@Module({
  imports: [DatabaseModule, AuthModule, SharedModule],
  controllers: [],
  providers: [],
})
export class LightvStudyModule {}
