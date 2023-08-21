import { Photo } from 'src/photos/entities/photo.entity';
import { Post } from 'src/post/entities/post.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'arutunova',
    entities: [Photo, User, Post, Tag],
    synchronize: process.env.NODE_ENV !== 'production',
  },
  minio: {
    endPoint: process.env.MINIO_ENDPOINT || '127.0.0.1',
    port: parseInt(process.env.MINIO_PORT, 10) || 9000,
    accessKey: process.env.MINIO_ACCESS_KEY || 'sggLNAEizJCrzGaB',
    secretKey:
      process.env.MINIO_SECRET_KEY || 'cZKmKUKf6mR7ZELcGSm79W4GrQ5qgXyw',
  },
  jwtSecret: process.env.JWT_SECRET || 'v#rYsE&Re7kEy',
});
