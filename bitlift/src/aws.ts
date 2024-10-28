// fileName => output/123123/App.jsx
// filePath => C:/ssd/output/123123/App.jsx
// import {CloudFormation, S3} from "aws-sdk";

// const s3 = new S3({
//     accessKeyId: "c94727bace60",
//     secretAccessKey: "005ae585179970e731ebcad49899b351f3a00bf02d",
//     endpoint: "s3.us-east-005.backblazeb2.com"
// })

// export const uploadFile = async(fileName: string, localFilePath: string) => {
//     console.log("called");
//     const fileContent= fs.readFileSync(localFilePath);
//     const response = await s3.upload({
//         Body: fileContent,
//         Bucket: "Vercel-clone",
//         Key: fileName,
//     }).promise();
//     console.log(response);
// }

// import { createReadStream } from 'fs';
// import fetch from 'node-fetch';

// const B2_ACCOUNT_ID = 'c94727bace60';
// const B2_APPLICATION_KEY = '005ae585179970e731ebcad49899b351f3a00bf02d';
// const B2_BUCKET_NAME = 'Vercel-clone';

// export const uploadFile = async (fileName: string, localFilePath: string) => {
//     console.log('called');

//     const fileStream = createReadStream(localFilePath);
//     const fileSize = fs.statSync(localFilePath).size;

//     const response = await fetch(`https://api.backblazeb2.com/b2api/v2/b2_get_upload_url`, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Basic ${Buffer.from(`${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`).toString('base64')}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             bucketId: B2_BUCKET_ID,
//         }),
//     });

//     if (!response.ok) {
//         throw new Error(`Failed to get upload URL: ${response.status} ${response.statusText}`);
//     }

//     const { uploadUrl, authorizationToken } = await response.json();

//     const uploadResponse = await fetch(uploadUrl, {
//         method: 'POST',
//         headers: {
//             'Authorization': authorizationToken,
//             'X-Bz-File-Name': fileName,
//             'Content-Type': 'b2/auto',
//             'Content-Length': fileSize.toString(),
//         },
//         body: fileStream,
//     });

//     if (!uploadResponse.ok) {
//         throw new Error(`Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`);
//     }

//     console.log('File uploaded successfully:', fileName);
// };

// import fs from "fs";
// import { createReadStream } from 'fs';
// const fetch = require('cross-fetch');

// const B2_ACCOUNT_ID = 'c94727bace60';
// const B2_APPLICATION_KEY = '005ae585179970e731ebcad49899b351f3a00bf02d';
// const B2_BUCKET_NAME = 'Vercel-clone';

// export const uploadFile = async (fileName: string, localFilePath: string) => {
//     console.log('called');

//     const fileStream = createReadStream(localFilePath);
//     const fileSize = fs.statSync(localFilePath).size;

//     const listBucketsResponse = await fetch(`https://s3.us-east-005.backblazeb2.com/b2api/v2/b2_list_buckets`, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Basic ${Buffer.from(`${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`).toString('base64')}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ accountId: B2_ACCOUNT_ID }),
//     });

//     if (!listBucketsResponse.ok) {
//         throw new Error(`Failed to list buckets: ${listBucketsResponse.status} ${listBucketsResponse.statusText}`);
//     }

//     const listBucketsData = await listBucketsResponse.json();
//     const bucketInfo = listBucketsData.buckets.find((bucket: { bucketName: string }) => bucket.bucketName === B2_BUCKET_NAME);

//     if (!bucketInfo) {
//         throw new Error(`Bucket with name "${B2_BUCKET_NAME}" not found`);
//     }

//     const response = await fetch(`https://s3.us-east-005.backblazeb2.com/b2api/v2/b2_get_upload_url`, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Basic ${Buffer.from(`${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`).toString('base64')}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             bucketId: bucketInfo.bucketId,
//         }),
//     });
//     const jsonResponse = await response.json() as { uploadUrl: string, authorizationToken: string };
// const { uploadUrl, authorizationToken } = jsonResponse;

// const uploadResponse = await fetch(uploadUrl, {
//         method: 'POST',
//         headers: {
//             'Authorization': authorizationToken,
//             'X-Bz-File-Name': fileName,
//             'Content-Type': 'b2/auto',
//             'Content-Length': fileSize.toString(),
//         },
//         body: fileStream,
//     });

//     if (!uploadResponse.ok) {
//         throw new Error(`Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`);
//     }

//     console.log('File uploaded successfully:', fileName);
// };
// extra
// const response = await fetch(`https://api.backblazeb2.com/b2api/v2/b2_get_upload_url`, {
//     method: 'POST',
//     headers: {
//         'Authorization': `Basic ${Buffer.from(`${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`).toString('base64')}`,
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         bucketName: B2_BUCKET_NAME,
//     }),
// });
// extra end
// import fs from "fs";
// import { createReadStream } from "fs";
// import fetch from "node-fetch";

// const B2_ACCOUNT_ID = "c94727bace60";
// const B2_APPLICATION_KEY = "005ae585179970e731ebcad49899b351f3a00bf02d";
// const B2_BUCKET_NAME = "Vercel-clone";

// export const uploadFile = async (fileName: string, localFilePath: string) => {
//   console.log("called");

//   const fileStream = createReadStream(localFilePath);
//   const fileSize = fs.statSync(localFilePath).size;

//   const listBucketsResponse = await fetch(
//     `https://s3.us-east-005.backblazeb2.com/${B2_BUCKET_NAME}`,
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           `${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`
//         ).toString("base64")}`,
//       },
//     }
//   );

//   if (!listBucketsResponse.ok) {
//     throw new Error(
//       `Failed to list buckets: ${listBucketsResponse.status} ${listBucketsResponse.statusText}`
//     );
//   }

//   const listBucketsData = await listBucketsResponse.json();
//   const bucketInfo = listBucketsData.buckets.find(
//     (bucket: { bucketName: string }) => bucket.bucketName === B2_BUCKET_NAME
//   );

//   if (!bucketInfo) {
//     throw new Error(`Bucket with name "${B2_BUCKET_NAME}" not found`);
//   }

//   const response = await fetch(
//     `https://s3.us-east-005.backblazeb2.com/b2api/v2/b2_get_upload_url`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           `${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`
//         ).toString("base64")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         bucketId: bucketInfo.bucketId,
//       }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(
//       `Failed to get upload URL: ${response.status} ${response.statusText}`
//     );
//   }

//   const jsonResponse = (await response.json()) as {
//     uploadUrl: string;
//     authorizationToken: string;
//   };
//   const { uploadUrl, authorizationToken } = jsonResponse;

//   const uploadResponse = await fetch(uploadUrl, {
//     method: "POST",
//     headers: {
//       Authorization: authorizationToken,
//       "X-Bz-File-Name": fileName,
//       "Content-Type": "b2/auto",
//       "Content-Length": fileSize.toString(),
//     },
//     body: fileStream,
//   });

//   if (!uploadResponse.ok) {
//     throw new Error(
//       `Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`
//     );
//   }

//   console.log("File uploaded successfully:", fileName);
// };
// import fs from "fs";
// import { createReadStream } from "fs";
// import fetch from "node-fetch";

// const B2_ACCOUNT_ID = "c94727bace60";
// const B2_APPLICATION_KEY = "005ae585179970e731ebcad49899b351f3a00bf02d";
// const B2_BUCKET_NAME = "Vercel-clone";

// export const uploadFile = async (fileName: string, localFilePath: string) => {
//   console.log("called");

//   const fileStream = createReadStream(localFilePath);
//   const fileSize = fs.statSync(localFilePath).size;

// //   const listBucketsResponse = await fetch(
// //     `https://s3.us-east-005.backblazeb2.com/${B2_BUCKET_NAME}`,
// //     {
// //       method: "GET",
// //       headers: {
// //         Authorization: `Basic ${Buffer.from(
// //           `${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`
// //         ).toString("base64")}`,
// //       },
// //     }
// //   );

// //   if (!listBucketsResponse.ok) {
// //     throw new Error(
// //       `Failed to list buckets: ${listBucketsResponse.status} ${listBucketsResponse.statusText}`
// //     );
// //   }

// //   const listBucketsData = await listBucketsResponse.json();
// const listBucketsResponse = await fetch(`https://s3.us-east-005.backblazeb2.com/b2api/v2/b2_list_buckets`, {
//     method: 'POST',
//     headers: {
//         'Authorization': `Basic ${Buffer.from(`${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`).toString('base64')}`,
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ accountId: B2_ACCOUNT_ID }),
// });

// if (!listBucketsResponse.ok) {
//     throw new Error(`Failed to list buckets: ${listBucketsResponse.status} ${listBucketsResponse.statusText}`);
// }

// const listBucketsData = await listBucketsResponse.json();

//   console.log("List Buckets Response:", listBucketsData); // Log the response data

//   // const bucketInfo = listBucketsData.buckets.find((bucket: any) => bucket.bucketName === B2_BUCKET_NAME);

//   const bucketInfo = listBucketsData.buckets.find(
//     (bucket: any) => bucket.bucketName === B2_BUCKET_NAME
//   );

//   if (!bucketInfo) {
//     throw new Error(`Bucket with name "${B2_BUCKET_NAME}" not found`);
//   }

//   const response = await fetch(
//     `https://s3.us-east-005.backblazeb2.com/b2api/v2/b2_get_upload_url`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           `${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`
//         ).toString("base64")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         bucketId: bucketInfo.bucketId,
//       }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(
//       `Failed to get upload URL: ${response.status} ${response.statusText}`
//     );
//   }

//   const jsonResponse = (await response.json()) as {
//     uploadUrl: string;
//     authorizationToken: string;
//   };
//   const { uploadUrl, authorizationToken } = jsonResponse;

//   const uploadResponse = await fetch(uploadUrl, {
//     method: "POST",
//     headers: {
//       Authorization: authorizationToken,
//       "X-Bz-File-Name": fileName,
//       "Content-Type": "b2/auto",
//       "Content-Length": fileSize.toString(),
//     },
//     body: fileStream,
//   });

//   if (!uploadResponse.ok) {
//     throw new Error(
//       `Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`
//     );
//   }

//   console.log("File uploaded successfully:", fileName);
// };

// const B2_ACCOUNT_ID = "c94727bace60";
// const B2_APPLICATION_KEY = "005ae585179970e731ebcad49899b351f3a00bf02d";
// const B2_BUCKET_NAME = "Vercel-clone";

// export const uploadFile = async (fileName: string, localFilePath: string) => {
//   console.log("called");

//   const fileStream = createReadStream(localFilePath);
//   const fileSize = fs.statSync(localFilePath).size;

//   const listBucketsResponse = await fetch(
//     `https://s3.us-east-005.backblazeb2.com/b2api/v2/b2_list_buckets`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           `${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`
//         ).toString("base64")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ accountId: B2_ACCOUNT_ID }),
//     }
//   );

//   if (!listBucketsResponse.ok) {
//     throw new Error(
//       `Failed to list buckets: ${listBucketsResponse.status} ${listBucketsResponse.statusText}`
//     );
//   }

//   //   }
//   const listBucketsData = await listBucketsResponse.json();

//   console.log("List Buckets Response:", listBucketsData); // Log the response data

//   const bucketInfo = listBucketsData.buckets.find(
//     (bucket: any) => bucket.bucketName === B2_BUCKET_NAME
//   );

//   if (!bucketInfo) {
//     throw new Error(`Bucket with name "${B2_BUCKET_NAME}" not found`);
//   }

//   const response = await fetch(
//     `https://s3.us-east-005.backblazeb2.com/b2api/v2/b2_get_upload_url`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           `${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`
//         ).toString("base64")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         bucketId: bucketInfo.bucketId,
//       }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(
//       `Failed to get upload URL: ${response.status} ${response.statusText}`
//     );
//   }

//   const jsonResponse = (await response.json()) as {
//     uploadUrl: string;
//     authorizationToken: string;
//   };
//   const { uploadUrl, authorizationToken } = jsonResponse;

//   const uploadResponse = await fetch(uploadUrl, {
//     method: "POST",
//     headers: {
//       Authorization: authorizationToken,
//       "X-Bz-File-Name": fileName,
//       "Content-Type": "b2/auto",
//       "Content-Length": fileSize.toString(),
//     },
//     body: fileStream,
//   });

//   if (!uploadResponse.ok) {
//     throw new Error(
//       `Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`
//     );
//   }

//   console.log("File uploaded successfully:", fileName);
// };






// MAIN CODE



// import { createReadStream } from "fs";
// import fetch from "node-fetch";
// import { isAwaitKeyword } from "typescript";
// import fs from "fs";
// import { S3 } from "aws-sdk";

// const s3 = new S3({
//   accessKeyId: "005c94727bace600000000001",
//   secretAccessKey: "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY",
//   endpoint: "https://s3.us-east-005.backblazeb2.com",
// });

// // fileName = output/123123/src/App.jsx
// // filePath = /Users/Abc/vercek//dist/output/123123/src/App.jsx

// export const uploadFile = async (fileName: string, localFilePath: string) => {
//   console.log("called");
//   const fileContent = fs.readFileSync(localFilePath);
//   const response = await s3
//     .upload({
//       Body: fileContent,
//       Bucket: "Vercel-clone",
//       Key: fileName,
//     })
//     .promise();
//   console.log(response);
// };





// BACKBLAZE CODE:
// import { B2 } from "b2";
// import fs from "fs";
// import { AxiosResponse } from "axios";

// NON AUTH

// const b2 = new B2({
//   applicationKeyId: "005c94727bace600000000001",
//   applicationKey: "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY",
// });


// const bucketName = "Vercel-clone";

// export const uploadFile = async (fileName: string, localFilePath: string) => {
//   console.log("called");

// // authorize
// await b2.authorize();

//   // Get upload URL for the bucket
//   const { uploadUrl, authorizationToken } = await b2.getUploadUrl({
//     bucketId: (await b2.getBucket({ bucketName })).data.buckets[0].bucketId,
//   });

//   // Read file content
//   const fileContent = fs.readFileSync(localFilePath);

//   // Upload file
//   const response = await b2.uploadFile({
//     uploadUrl,
//     uploadAuthToken: authorizationToken,
//     fileName,
//     data: fileContent,
//   });

//   console.log(response);
// };

// with AUTH:
// const accountId = "005c94727bace600000000001";
// const applicationKey = "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY";

// Create a new instance of the B2 class

// Authenticate with Backblaze B2
// async function authenticateB2(): Promise<string> {
//   try {
//     const response: AxiosResponse = await b2.authorize();
//     return response.data.authorizationToken;
//   } catch (error) {
//     console.error("Error authenticating with Backblaze B2:", error);
//     throw error;
//   }
// }

// const b2 = new B2({
//   applicationKeyId: accountId,
//   applicationKey: applicationKey
// });
// // Usage example
// export async function uploadFile(fileName: string, localFilePath: string): Promise<void> {
//   try {
//     // Authenticate with Backblaze B2
//     const authToken: string = await authenticateB2();

//     // Now that we're authenticated, create an upload URL
//     const { uploadUrl, authorizationToken } = await b2.getUploadUrl({
//       bucketId: "bc79b41742a71bfa8cee0610" // Replace with your bucket ID
//     });

//     // Read file content
//     const fileContent = fs.readFileSync(localFilePath);

//     // Upload file
//     const response = await b2.uploadFile({
//       uploadUrl,
//       uploadAuthToken: authorizationToken,
//       fileName,
//       data: fileContent
//     });

//     console.log("File uploaded successfully:", response);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// }

// import { B2 } from "b2";
// import fs from "fs";

// const accountId = "005c94727bace600000000001";
// const applicationKey = "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY";

// // Create a new instance of the B2 class
// const b2 = new B2({
//   applicationKeyId: accountId,
//   applicationKey: applicationKey
// });

// // Authenticate with Backblaze B2
// async function authenticateB2(): Promise<string> {
//   try {
//     const response = await b2.authorize();
//     return response.data.authorizationToken;
//   } catch (error) {
//     console.error("Error authenticating with Backblaze B2:", error);
//     throw error;
//   }
// }

// // Usage example
// export async function uploadFile(fileName: string, localFilePath: string): Promise<void> {
//   try {
//     // Authenticate with Backblaze B2
//     const authToken: string = await authenticateB2();

//     // Now that we're authenticated, create an upload URL
//     const { uploadUrl, authorizationToken } = await b2.getUploadUrl({
//       bucketId: "bc79b41742a71bfa8cee0610" // Replace with your bucket ID
//     });

//     // Read file content
//     const fileContent = fs.readFileSync(localFilePath);

//     // Upload file
//     const response = await b2.uploadFile({
//       uploadUrl,
//       uploadAuthToken: authorizationToken,
//       fileName,
//       data: fileContent
//     });

//     console.log("File uploaded successfully:", response);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// }
// import axios, { AxiosResponse } from "axios";
// import { B2 } from "b2";
// import fs from "fs";

// const accountId = "005c94727bace600000000001";
// const applicationKey = "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY";

// // Authenticate with Backblaze B2
// async function authenticateB2(): Promise<string> {
//   try {
//     const response: AxiosResponse = await axios.get("https://api.backblazeb2.com/b2api/v3/b2_authorize_account", {
//       headers: {
//         Authorization: `Basic ${Buffer.from(`${accountId}:${applicationKey}`).toString("base64")}`
//       }
//     });

//     return response.data.authorizationToken;
//   } catch (error) {
//     console.error("Error authenticating with Backblaze B2:", error);
//     throw error;
//   }
// }

// // Usage example
// export async function uploadFile(fileName: string, localFilePath: string): Promise<void> {
//   try {
//     // Authenticate with Backblaze B2
//     const authToken: string = await authenticateB2();

//     // Now that we're authenticated, create an upload URL
//     const b2 = new B2({
//       // Set the API URL to the one provided in the authorization response
//       apiUrl: response.data.apiUrl,
//       // Set the authorization token obtained during authentication
//       authToken: authToken
//     });

//     const { uploadUrl, authorizationToken } = await b2.getUploadUrl({
//       bucketId: "bc79b41742a71bfa8cee0610" // Replace with your bucket ID
//     });

//     // Read file content
//     const fileContent = fs.readFileSync(localFilePath);

//     // Upload file
//     const response = await b2.uploadFile({
//       uploadUrl,
//       uploadAuthToken: authorizationToken,
//       fileName,
//       data: fileContent
//     });

//     console.log("File uploaded successfully:", response);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// }
// import { B2 } from "b2";
// import fs from "fs";

// const accountId = "005c94727bace600000000001";
// const applicationKey = "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY";

// // Create a new instance of the B2 class
// const b2 = new B2({
//   applicationKeyId: accountId,
//   applicationKey: applicationKey
// });

// // Authenticate with Backblaze B2 and get upload URL
// async function authenticateAndUpload(fileName: string, localFilePath: string): Promise<void> {
//   try {
//     // Authorize
//     await b2.authorize();

//     // Get upload URL for the bucket
//     const bucketName = "Vercel-clone";
//     const { uploadUrl, authorizationToken } = await b2.getUploadUrl({
//       bucketId: (await b2.getBucket({ bucketName })).data.buckets[0].bucketId,
//     });

//     // Read file content
//     const fileContent = fs.readFileSync(localFilePath);

//     // Upload file
//     const response = await b2.uploadFile({
//       uploadUrl,
//       uploadAuthToken: authorizationToken,
//       fileName,
//       data: fileContent,
//     });

//     console.log("File uploaded successfully:", response);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// }

// // Usage example
// export const uploadFile = async (fileName: string, localFilePath: string): Promise<void> => {
//   console.log("called");
//   await authenticateAndUpload(fileName, localFilePath);
// };




// WOEKS
// import { createB2 } from "b2";
// import fs from "fs";

// const accountId = "005c94727bace600000000001";
// const applicationKey = "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY";

// // Authenticate with Backblaze B2 and get upload URL
// async function authenticateAndUpload(fileName: string, localFilePath: string): Promise<void> {
//   try {
//     // Create an instance of the B2 class
//     const b2 = createB2({
//       applicationKeyId: accountId,
//       applicationKey: applicationKey
//     });

//     // Authorize
//     await b2.authorize();

//     // Get upload URL for the bucket
//     const bucketName = "Vercel-clone";
//     const { uploadUrl, authorizationToken } = await b2.getUploadUrl({
//       bucketId: (await b2.getBucket({ bucketName })).data.buckets[0].bucketId,
//     });

//     // Read file content
//     const fileContent = fs.readFileSync(localFilePath);

//     // Upload file
//     const response = await b2.uploadFile({
//       uploadUrl,
//       uploadAuthToken: authorizationToken,
//       fileName,
//       data: fileContent,
//     });

//     console.log("File uploaded successfully:", response);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// }

// // Usage example
// export const uploadFile = async (fileName: string, localFilePath: string): Promise<void> => {
//   console.log("called");
//   await authenticateAndUpload(fileName, localFilePath);
// };
// eorks end

// import { createB2 } from "b2";
// import fs from "fs";

// const accountId = "005c94727bace600000000001";
// const applicationKey = "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY";

// async function authenticateAndUpload(fileName: string, localFilePath: string): Promise<void> {
//   try {
//     const b2 = createB2({
//       applicationKeyId: accountId,
//       applicationKey: applicationKey
//     });

//     // Authenticate
//     console.log("Authenticating with Backblaze B2...");
//     await b2.authorize();
//     console.log("Authentication successful.");

//     // Get bucket ID
//     const bucketName = "Vercel-clone";
//     console.log("Fetching bucket information...");
//     const bucketsResponse = await b2.getBucket({ bucketName });
//     const bucketId = bucketsResponse.data.buckets[0].bucketId;
//     console.log("Bucket ID:", bucketId);

//     // Get upload URL
//     console.log("Fetching upload URL...");
//     const { uploadUrl, authorizationToken } = await b2.getUploadUrl({ bucketId });
//     console.log("Upload URL obtained.");

//     // Read file content
//     console.log("Reading file content...");
//     const fileContent = fs.readFileSync(localFilePath);

//     // Upload file
//     console.log("Uploading file...");
//     const response = await b2.uploadFile({
//       uploadUrl,
//       uploadAuthToken: authorizationToken,
//       fileName,
//       data: fileContent,
//     });

//     console.log("File uploaded successfully:", response);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// }

// export const uploadFile = async (fileName: string, localFilePath: string): Promise<void> => {
//   console.log("Initiating file upload...");
//   await authenticateAndUpload(fileName, localFilePath);
// };


// start
// import fs from "fs";
// import { B2 } from "b2";

// const b2 = new B2({
//   applicationKeyId: "005c94727bace600000000001",
//   applicationKey: "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY",
// });

// const bucketName = "Vercel-clone";

// export const uploadFile = async (fileName: string, localFilePath: string) => {
//   console.log("called");

//   // Authorize with Backblaze B2
//   await b2.authorize();

//   // Get upload URL for the bucket
//   const { uploadUrl, authorizationToken } = await b2.getUploadUrl({
//     bucketId: (await b2.getBucket({ bucketName })).data.buckets[0].bucketId,
//   });

//   // Read file content
//   const fileContent = fs.readFileSync(localFilePath);

//   // Upload file
//   const response = await b2.uploadFile({
//     uploadUrl,
//     uploadAuthToken: authorizationToken,
//     fileName,
//     data: fileContent,
//   });

//   console.log(response);
// };

// // Usage
// const fileName = "output/123123/src/App.jsx";
// const localFilePath = "/Users/Abc/vercek/dist/output/123123/src/App.jsx";

// uploadFile(fileName, localFilePath).catch(console.error);


// AWS s3 approach:
import { S3Client, CreateBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3';
// import { v4 as uuid } from 'uuid';
import fs from 'fs';

// Create an S3 client
const s3 = new S3Client({
  endpoint: 'https://s3.us-east-005.backblazeb2.com',
  region: 'us-east-005',
  credentials: {
    accessKeyId: "005c94727bace600000000001",
    secretAccessKey: "K005zzwiGt2/+JkCYM/QVEnGRtgFHjY"
  }
});

export const uploadFile = async (fileName: string, localFilePath: string) => {
  console.log("Uploading file:", fileName);

  const fileContent = fs.readFileSync(localFilePath);

  try {
    await s3.send(new PutObjectCommand({
      Bucket: 'Vercel-clone',
      Key: fileName,
      Body: fileContent
    }));

    console.log("Successfully uploaded data to " + 'Vercel-clone' + "/" + fileName);
  } catch (err) {
    // console.log("Error: ", err);
    console.log("Error uploading file " + fileName + ": ", err);
  }
};

// (async () => {
//   await uploadFile("output/123123/src/App.jsx", "/Users/Abc/vercek/dist/output/123123/src/App.jsx");
// })();
