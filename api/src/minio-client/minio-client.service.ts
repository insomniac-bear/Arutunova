import { Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './types/minio.interface';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioStorageService');
  }

  private readonly logger: Logger;
  private readonly bucketName = process.env.MINO_BUCKET_NAME || 'files';

  public get client() {
    return this.minio.client;
  }

  public async upload(
    path: string,
    file: BufferedFile,
    bucketName: string = this.bucketName,
  ) {
    if (
      !(
        file.mimetype.includes('jpeg') ||
        file.mimetype.includes('png') ||
        file.mimetype.includes('svg') ||
        file.mimetype.includes('webp') ||
        file.mimetype.includes('pdf')
      )
    ) {
      throw new ServerException(ErrorCode.BadFile);
    }
    const tempFilename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(tempFilename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    const fileName: string = path + hashedFileName + ext;
    const fileBuffer = file.buffer;

    this.client.putObject(bucketName, fileName, fileBuffer, (err, _res) => {
      if (err) {
        console.log(err);
        throw new ServerException(ErrorCode.BadFile);
      }
    });

    return `http://127.0.0.1:9000/${bucketName}/${fileName}`;
  }

  public async delete(
    path: string,
    objectName: string,
    bucketName: string = this.bucketName,
  ) {
    this.client.removeObject(bucketName, `${path}${objectName}`, (err) => {
      if (err) throw new ServerException(ErrorCode.BadFile);
    });
  }
}
