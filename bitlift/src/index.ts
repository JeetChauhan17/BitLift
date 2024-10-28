// keyID: c94727bace60
// keyName: Master Application Key
// applicationKey: 005ae585179970e731ebcad49899b351f3a00bf02d
// endpoint: s3.us-east-005.backblazeb2.com
import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";
import { getAllFiles } from "./file";
import path from "path";
import { uploadFile } from "./aws";
import {createClient} from "redis";

// uploadFile(
  //   "vercel/test3.html",
  //   "/Users/lenovo/Desktop/Jeet/HK/vercel/test3.html"
  // );
  
  //  MAIN:]
  
  const publisher = createClient();
  publisher.connect();
  const subscriber = createClient();
  subscriber.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generate();
  await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));

  const files = getAllFiles(path.join(__dirname, `output/${id}`));
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

  files.forEach(async file =>{
    await uploadFile(file.slice(__dirname.length + 1).replace(/\\/g,'/'), file);
  })

  await new Promise ((resolve) => setTimeout(resolve, 5000))
  publisher.lPush("build-queue", id);
  publisher.hSet("status", id, "uploaded");
  const value = await publisher.hGet("status",id);
  // put this to S3
  res.json({
    id: id,
  })
});

app.get("/status", async (req, res) => {
  const id = req.query.id;
  const response = await subscriber.hGet("status", id as string);
  res.json({
      status: response
  })
})


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