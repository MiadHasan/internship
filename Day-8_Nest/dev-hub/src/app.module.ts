import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config.schema';

@Module({
  imports: [
    UserModule,
    PostsModule,
    CommentsModule,
    MongooseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URL'),
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
