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
  jwtSecret: process.env.JWT_SECRET || 'v#rYsE&Re7kEy',
});
