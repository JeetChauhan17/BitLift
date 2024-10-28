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
// keyID: c94727bace60
// keyName: Master Application Key
// applicationKey: 005ae585179970e731ebcad49899b351f3a00bf02d
// endpoint: s3.us-east-005.backblazeb2.com
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const simple_git_1 = __importDefault(require("simple-git"));
const utils_1 = require("./utils");
const file_1 = require("./file");
const path_1 = __importDefault(require("path"));
const aws_1 = require("./aws");
const redis_1 = require("redis");
// uploadFile(
//   "vercel/test3.html",
//   "/Users/lenovo/Desktop/Jeet/HK/vercel/test3.html"
// );
//  MAIN:]
const publisher = (0, redis_1.createClient)();
publisher.connect();
const subscriber = (0, redis_1.createClient)();
subscriber.connect();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    const id = (0, utils_1.generate)();
    yield (0, simple_git_1.default)().clone(repoUrl, path_1.default.join(__dirname, `output/${id}`));
    const files = (0, file_1.getAllFiles)(path_1.default.join(__dirname, `output/${id}`));
    // console.log(files);
    // console.log(files);
    // files.forEach(async file => {
    //   await uploadFile(file.slice(__dirname.length + 1), file);
    //   console.log("uploading...");
    // })
    // for (const file of files) {
    //   const fileName = file.slice(__dirname.length + 1);
    //   await uploadFile(fileName, file);
    // }
    // for (const file of files) {
    //   // Construct the desired directory structure for the file
    //   const relativePath = path.relative(path.join(__dirname, `output/${id}`), file);
    //   const fileName = `output/${id}/${relativePath.replace(/\\/g,'/')}`;
    //   // Upload the file with the modified fileName
    //   await uploadFile(fileName, file);
    // }
    files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, aws_1.uploadFile)(file.slice(__dirname.length + 1).replace(/\\/g, '/'), file);
    }));
    yield new Promise((resolve) => setTimeout(resolve, 5000));
    publisher.lPush("build-queue", id);
    publisher.hSet("status", id, "uploaded");
    const value = yield publisher.hGet("status", id);
    // put this to S3
    res.json({
        id: id,
    });
}));
app.get("/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const response = yield subscriber.hGet("status", id);
    res.json({
        status: response
    });
}));
app.listen(3000);
// MAIN END:
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.post("/deploy", async (req, res) => {
//   console.log("called");
//   const repoUrl = req.body.repoUrl;
//   const id = generate();
//   await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
//   const files = getAllFiles(path.join(__dirname, `output/${id}`));
//   try {
//     // Map each file to an upload promise
//     const uploadPromises = files.map(async (file) => {
//       const fileName = file.slice(__dirname.length + 1);
//       await uploadFile(fileName, file);
//       console.log("uploading...");
//     });
//     // Wait for all upload promises to resolve
//     await Promise.all(uploadPromises);
//     console.log("All files uploaded successfully.");
//     res.json({
//       id: id,
//     });
//   } catch (error) {
//     console.error("Error uploading files:", error);
//     res.status(500).json({ error: "Error uploading files" });
//   }
// });
// app.listen(3000);
// app.post("/deploy", async (req, res) => {
//   console.log("Deployment request received");
//   const repoUrl = req.body.repoUrl;
//   const id = generate();
//   try {
//     console.log("Cloning repository:", repoUrl);
//     await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
//     console.log("Repository cloned successfully");
//     const files = getAllFiles(path.join(__dirname, `output/${id}`));
//     // Map each file to an upload promise
//     const uploadPromises = files.map(async (file) => {
//       const fileName = file.slice(__dirname.length + 1);
//       console.log("Uploading file:", fileName);
//       await uploadFile(fileName, file);
//       console.log("File uploaded successfully:", fileName);
//     });
//     // Wait for all upload promises to resolve
//     await Promise.all(uploadPromises);
//     console.log("All files uploaded successfully.");
//     res.json({
//       id: id,
//       message: "Deployment successful",
//     });
//   } catch (error) {
//     console.error("Error deploying:", error);
//     res.status(500).json({ error: "Error deploying" });
//   }
// });
// app.listen(3000);
