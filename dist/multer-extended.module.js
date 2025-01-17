"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var MulterExtendedModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const multer_config_loader_1 = require("./multer-config.loader");
const multer_extended_providers_1 = require("./multer-extended.providers");
const constants_1 = require("./constants");
let MulterExtendedModule = MulterExtendedModule_1 = class MulterExtendedModule {
    static register(options) {
        return {
            module: MulterExtendedModule_1,
            providers: multer_extended_providers_1.createMulterExtendedProviders(options),
            exports: [constants_1.MULTER_EXTENDED_S3_OPTIONS, constants_1.MULTER_MODULE_OPTIONS],
        };
    }
    static registerAsync(options) {
        return {
            module: MulterExtendedModule_1,
            providers: [
                ...this.createProviders(options),
                {
                    provide: constants_1.MULTER_EXTENDED_S3_MODULE_ID,
                    useValue: random_string_generator_util_1.randomStringGenerator(),
                },
                multer_extended_providers_1.createMulterOptionsFactory,
            ],
            exports: [constants_1.MULTER_EXTENDED_S3_OPTIONS, constants_1.MULTER_MODULE_OPTIONS],
        };
    }
    static createProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createOptionsProvider(options)];
        }
        return [
            this.createOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: constants_1.MULTER_EXTENDED_S3_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: constants_1.MULTER_EXTENDED_S3_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return optionsFactory.createMulterExtendedS3Options(); }),
            inject: [options.useExisting || options.useClass],
        };
    }
};
MulterExtendedModule = MulterExtendedModule_1 = __decorate([
    common_1.Module({
        providers: [multer_config_loader_1.MulterConfigLoader],
        exports: [multer_config_loader_1.MulterConfigLoader],
    })
], MulterExtendedModule);
exports.MulterExtendedModule = MulterExtendedModule;
