import { LoggerService } from '@nestjs/common';
export interface MulterExtendedS3Options {
    readonly accessKeyId: string;
    readonly secretAccessKey: string;
    readonly region: string;
    readonly bucket: string;
    readonly basePath: string;
    readonly acl?: string;
    readonly fileSize?: number | string;
    readonly logger?: LoggerService;
    readonly endpoint: string;
}
