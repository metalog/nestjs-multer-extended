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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const multer_1 = __importDefault(require("multer"));
const files_constants_1 = require("@nestjs/platform-express/multer/files.constants");
const multer_sharp_1 = require("../multer-sharp");
function AmazonS3FileInterceptor(fieldName, localOptions) {
    let MixinInterceptor = class MixinInterceptor {
        constructor(options = {}) {
            this.localOptions = localOptions;
            this.options = options;
            this.multer = multer_1.default(Object.assign(Object.assign({}, this.options), this.localOptions));
        }
        intercept(context, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const ctx = context.switchToHttp();
                if (this.localOptions) {
                    this.multer.storage = this.pickStorageOptions();
                }
                yield new Promise((resolve, reject) => this.multer.single(fieldName)(ctx.getRequest(), ctx.getResponse(), (err) => {
                    if (err) {
                        const error = multer_sharp_1.transformException(err);
                        return reject(error);
                    }
                    resolve();
                }));
                return next.handle();
            });
        }
        pickStorageOptions() {
            let storageOptions;
            const extendedOptionProperty = Object.keys(this.localOptions)[0];
            switch (extendedOptionProperty) {
                case multer_sharp_1.ExtendedOptions.CREATE_THUMBNAIL:
                    storageOptions = Object.assign(Object.assign({}, this.options.storage.storageOpts), { resize: [this.localOptions[extendedOptionProperty], { suffix: 'original' }], ignoreAspectRatio: true, dynamicPath: this.localOptions.dynamicPath });
                    return multer_sharp_1.AmazonS3Storage(storageOptions);
                case multer_sharp_1.ExtendedOptions.RESIZE_IMAGE:
                    storageOptions = Object.assign(Object.assign({}, this.options.storage.storageOpts), { resize: this.localOptions[extendedOptionProperty], dynamicPath: this.localOptions.dynamicPath });
                    return multer_sharp_1.AmazonS3Storage(storageOptions);
                case multer_sharp_1.ExtendedOptions.RESIZE_IMAGE_MULTIPLE_SIZES:
                    storageOptions = Object.assign(Object.assign({}, this.options.storage.storageOpts), { resizeMultiple: this.localOptions[extendedOptionProperty], ignoreAspectRatio: true, dynamicPath: this.localOptions.dynamicPath });
                    return multer_sharp_1.AmazonS3Storage(storageOptions);
                default:
                    return multer_sharp_1.AmazonS3Storage(Object.assign(Object.assign({}, this.options.storage.storageOpts), this.localOptions));
            }
        }
    };
    MixinInterceptor = __decorate([
        __param(0, common_1.Optional()),
        __param(0, common_1.Inject(files_constants_1.MULTER_MODULE_OPTIONS)),
        __metadata("design:paramtypes", [Object])
    ], MixinInterceptor);
    const Interceptor = common_1.mixin(MixinInterceptor);
    return Interceptor;
}
exports.AmazonS3FileInterceptor = AmazonS3FileInterceptor;
