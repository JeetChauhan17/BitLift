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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFinalDist = exports.downloadS3Folder = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const s3 = new aws_sdk_1.S3({
    accessKeyId: "005c94727bace600000000001",
    secretAccessKey: "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY",
    endpoint: 'https://s3.us-east-005.backblazeb2.com',
    region: 'us-east-005'
});
// promisified
function downloadS3Folder(prefix) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log(prefix);
        const allFiles = yield s3
            .listObjectsV2({
            Bucket: "Vercel-clone",
            Prefix: prefix,
        })
            .promise();
        const allPromises = ((_a = allFiles.Contents) === null || _a === void 0 ? void 0 : _a.map(({ Key }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (!Key) {
                    resolve("");
                    return;
                }
                const finalOutputPath = path_1.default.join(__dirname, Key);
                const outputFile = fs_1.default.createWriteStream(finalOutputPath);
                const dirName = path_1.default.dirname(finalOutputPath);
                if (!fs_1.default.existsSync(dirName)) {
                    fs_1.default.mkdirSync(dirName, { recursive: true });
                }
                s3.getObject({
                    Bucket: "Vercel-clone",
                    Key,
                })
                    .createReadStream()
                    .pipe(outputFile)
                    .on("finish", () => {
                    resolve("");
                });
            }));
        }))) || [];
        console.log("awaiting");
        yield Promise.all(allPromises === null || allPromises === void 0 ? void 0 : allPromises.filter((x) => x !== undefined));
    });
}
exports.downloadS3Folder = downloadS3Folder;
// NON-promisified
// export async function downloadS3Folder(prefix:string) {
//     const allFiles = await s3.listObjectsV2({
//         Bucket: "Vercel-clone",
//         Prefix: prefix
//     }).promise();
//     const allPromises = allFiles.Contents?.forEach(async({Key}) =>{
//         const finalOutputPath = path.join(__dirname, Key);
//         const dirName = path.dirname(finalOutputPath);
//         if(!fs.existsSync(dirName)){
//             fs.mkdirSync(dirName, {recursive:true});
//         }
//         const outputFile = fs.createWriteStream(finalOutputPath);
//         s3.getObject({
//             Bucket: "Vercel-clone",
//             Key: Key || ""
//         }).createReadStream().pipe(outputFile)
//     }) || []
//     await Promise.all(allPromises?.filter(x => x !==undefined));
// }
function copyFinalDist(id) {
    const folderPath = path_1.default.join(__dirname, `output/${id}/dist`); // fix dist not found bug
    const allFiles = getAllFiles(folderPath);
    allFiles.forEach(file => {
        uploadFile(`dist/${id}/` + file.slice(folderPath.length + 1), file);
    });
    console.log("copied");
}
exports.copyFinalDist = copyFinalDist;
const getAllFiles = (folderPath) => {
    let response = [];
    const allFilesAndFolders = fs_1.default.readdirSync(folderPath);
    allFilesAndFolders.forEach(file => {
        const fullFilePath = path_1.default.join(folderPath, file).replace(/[\/\\]/g, '/');
        if (fs_1.default.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath));
        }
        else {
            response.push(fullFilePath);
        }
    });
    return response;
};
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const response = yield s3.upload({
        Body: fileContent,
        Bucket: "Vercel-clone",
        Key: fileName,
    }).promise();
    console.log(response);
});
