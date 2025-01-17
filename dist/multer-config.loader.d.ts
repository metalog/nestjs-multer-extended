import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { MulterExtendedS3Options } from './interfaces';
interface MulterS3ConfigService extends MulterOptionsFactory {
    filterImageFileExtension(req: any, file: any, cb: any): any;
}
export declare class MulterConfigLoader implements MulterS3ConfigService {
    private s3Options;
    static DEFAULT_ACL: string;
    static DEFAULT_REGION: string;
    static DEFAULT_MAX_FILESIZE: number;
    private readonly S3;
    private readonly logger;
    constructor(s3Options: MulterExtendedS3Options);
    createMulterOptions(): MulterModuleOptions | Promise<MulterModuleOptions>;
    filterImageFileExtension(req: any, file: any, cb: any): any;
}
export {};
