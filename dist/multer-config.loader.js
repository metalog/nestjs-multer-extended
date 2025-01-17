"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MulterConfigLoader_1;
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_sharp_1 = require("./multer-sharp");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
let MulterConfigLoader = MulterConfigLoader_1 = class MulterConfigLoader {
    constructor(s3Options) {
        this.s3Options = s3Options;
        aws_sdk_1.default.config.update({
            accessKeyId: s3Options.accessKeyId,
            secretAccessKey: s3Options.secretAccessKey,
            region: s3Options.region || MulterConfigLoader_1.DEFAULT_REGION,
        });
        this.S3 = new aws_sdk_1.default.S3({ endpoint: s3Options.endpoint });
        this.logger = s3Options.logger || new common_1.Logger(MulterConfigLoader_1.name);
        this.logger.log(JSON.stringify(s3Options));
    }
    createMulterOptions() {
        const storage = multer_sharp_1.AmazonS3Storage({
            Key: (req, file, cb) => {
                const basePath = `${this.s3Options.basePath}`;
                cb(null, basePath);
            },
            s3: this.S3,
            Bucket: this.s3Options.bucket,
            ACL: this.s3Options.acl || MulterConfigLoader_1.DEFAULT_ACL,
        });
        return {
            storage,
            fileFilter: this.filterImageFileExtension,
            limits: {
                fileSize: +this.s3Options.fileSize || MulterConfigLoader_1.DEFAULT_MAX_FILESIZE,
            },
        };
    }
    filterImageFileExtension(req, file, cb) {
        const { mimetype } = file;
        const extension = mimetype.substring(mimetype.lastIndexOf('/') + 1);
        const mimetypeIsNotImage = (ext) => !Object.values(multer_sharp_1.ImageFileExtensions).includes(ext);
        if (mimetypeIsNotImage(extension)) {
            req.fileValidationError = multer_sharp_1.MulterExceptions.INVALID_IMAGE_FILE_TYPE;
            return cb(new common_1.BadRequestException(multer_sharp_1.MulterExceptions.INVALID_IMAGE_FILE_TYPE), false);
        }
        return cb(null, true);
    }
};
MulterConfigLoader.DEFAULT_ACL = 'public-read';
MulterConfigLoader.DEFAULT_REGION = 'us-west-2';
MulterConfigLoader.DEFAULT_MAX_FILESIZE = 3145728;
MulterConfigLoader = MulterConfigLoader_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.MULTER_EXTENDED_S3_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], MulterConfigLoader);
exports.MulterConfigLoader = MulterConfigLoader;
