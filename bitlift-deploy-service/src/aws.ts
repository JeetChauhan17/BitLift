import { S3 } from "aws-sdk";
import { dir } from "console";
import fs from "fs";
import path from "path";
import { off } from "process";

const s3 = new S3({
  accessKeyId: "005c94727bace600000000001",
  secretAccessKey: "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY",
  endpoint: 'https://s3.us-east-005.backblazeb2.com',
  region: 'us-east-005'
});

// promisified
export async function downloadS3Folder(prefix: string) {
  console.log(prefix);

  const allFiles = await s3
    .listObjectsV2({
      Bucket: "Vercel-clone",
      Prefix: prefix,
    })
    .promise();

  const allPromises =
    allFiles.Contents?.map(async ({ Key }) => {
      return new Promise(async (resolve) => {
        if (!Key) {
          resolve("");
          return;
        }

        const finalOutputPath = path.join(__dirname, Key);
        const outputFile = fs.createWriteStream(finalOutputPath);
        const dirName = path.dirname(finalOutputPath);

        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, { recursive: true });
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
      });
    }) || [];
    console.log("awaiting");

  await Promise.all(allPromises?.filter((x) => x !== undefined));
}

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

export function copyFinalDist(id: string){
    const folderPath = path.join(__dirname, `output/${id}/dist`); // fix dist not found bug
    const allFiles = getAllFiles(folderPath);
    allFiles.forEach(file => {
        uploadFile(`dist/${id}/` + file.slice(folderPath.length+1), file);
    })
    console.log("copied");
}

const getAllFiles = (folderPath:string) =>{
    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);allFilesAndFolders.forEach(file =>{
        const fullFilePath = path.join(folderPath, file).replace(/[\/\\]/g,'/');
        if(fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else{
            response.push(fullFilePath);
        }
    });
    return response;
}


const uploadFile = async (fileName: string, localFilePath: string) =>{
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "Vercel-clone",
        Key: fileName,
    }).promise();
    console.log(response);
}