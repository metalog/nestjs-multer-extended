import { BadRequestException, PayloadTooLargeException } from '@nestjs/common';
import sharp from 'sharp';
import { SharpOptions, ResizeOption } from './interfaces/sharp-options.interface';
import { S3StorageOptions } from './interfaces/s3-storage.interface';
export declare const transformException: (error: Error) => Error | PayloadTooLargeException | BadRequestException;
export declare const transformImage: (options: SharpOptions, size: ResizeOption) => sharp.Sharp;
export declare const getSharpOptionProps: (storageOpts: S3StorageOptions) => any;
export declare const isOriginalSuffix: (suffix: string) => boolean;
export declare const getSharpOptions: (options: SharpOptions) => SharpOptions;
