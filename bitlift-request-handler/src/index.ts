// import express from "express";
// import { S3 } from "aws-sdk";

// const s3 = new S3({
//   accessKeyId: "005c94727bace600000000001",
//   secretAccessKey: "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY",
//   endpoint: "https://s3.us-east-005.backblazeb2.com",
//   region: "us-east-005",
// });

// const app = express();

// app.get("/*", async (req, res) => {
//   const host = req.hostname;
//   console.log(host); // i think it'll give id.abc.com
//   const id = host.split(".")[0];
//   const filePath = req.path;

//   const contents = await s3.getObject({
//     Bucket: "Vercel-clone",
//     Key: `dist/${id}${filePath}`
//   }).promise();
// // console.log(Key);
//   const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
//   res.set("Content-Type", type);
//   res.send(contents.Body);

// });

// app.listen(3001);
// import express from "express";

// const app = express();

// app.get("/*", (req, res) => {
//   console.log("in");
//   const host = req.hostname;
//   console.log(host);
//   if(host){

//     console.log("host");
//   }
//   const id = host.split(".")[0];
//   console.log(id);
// });

// app.listen(3001);
import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: "005c94727bace600000000001",
  secretAccessKey: "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY",
  endpoint: "https://s3.us-east-005.backblazeb2.com",
  region: "us-east-005",
});

const app = express();

app.get("/*", async (req, res) => {
  const host = req.hostname;

  const id = host.split(".")[0];
  const filePath = req.path;

  const contents = await s3
    .getObject({
      Bucket: "Vercel-clone",
      Key: `dist/${id}${filePath}`,
      // Key: `${id}${filePath}`
    })
    .promise();

  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/css"
    : "application/javascript";
  res.set("Content-Type", type);

  res.send(contents.Body);
});

app.listen(3001);
