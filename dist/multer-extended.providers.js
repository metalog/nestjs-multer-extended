"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const multer_config_loader_1 = require("./multer-config.loader");
exports.createMulterOptionsFactory = {
    provide: constants_1.MULTER_MODULE_OPTIONS,
    useFactory: (loader) => __awaiter(void 0, void 0, void 0, function* () { return loader.createMulterOptions(); }),
    inject: [multer_config_loader_1.MulterConfigLoader],
};
function createMulterExtendedProviders(options) {
    return [
        {
            provide: constants_1.MULTER_EXTENDED_S3_OPTIONS,
            useValue: options,
        },
        {
            provide: constants_1.MULTER_EXTENDED_S3_MODULE_ID,
            useValue: random_string_generator_util_1.randomStringGenerator(),
        },
        exports.createMulterOptionsFactory,
    ];
}
exports.createMulterExtendedProviders = createMulterExtendedProviders;
