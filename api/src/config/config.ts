import { Photo } from 'src/photos/entities/photo.entity';
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
    entities: [Photo, User],
    synchronize: process.env.NODE_ENV !== 'production',
  },
  minio: {
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT, 10) || 9090,
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioaccess',
    secretKey: process.env.MINIO_SECRET_KEY || 'miniosecret',
  },
  jwtSecret: process.env.JWT_SECRET || 'v#rYsE&Re7kEy',
});
