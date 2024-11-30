import { BlobServiceClient } from "@azure/storage-blob";

// Use the SAS URL copied directly from the Azure Portal
const sasUrl = process.env.AZURE_SAS_URL || "";
const containerName = process.env.AZURE_CONTAINER_NAME || ""; // Replace with your container name

/**
 * Upload a file to Azure Blob Storage and set its Content-Type.
 *
 * @param file The file to upload.
 * @param fileName The name to save the file as in Azure Blob Storage.
 * @returns The URL of the uploaded file.
 */
// Function to upload a file
export async function uploadFileToBlob(file: File, fileName: string) {
  try {
    const blobServiceClient = new BlobServiceClient(sasUrl);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    console.log("Uploading to URL:", blockBlobClient.url);

    // Set the Content-Type based on the file type
    const options = {
      blobHTTPHeaders: {
        blobContentType: file.type, // This sets the correct Content-Type for the file
      },
    };

    await blockBlobClient.uploadData(file, options);

    console.log("File uploaded successfully.");
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Function to fetch non-expired files
export async function fetchNonExpiredFiles() {
  try {
    const blobServiceClient = new BlobServiceClient(sasUrl);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const files = [];
    const currentTime = Date.now();

    for await (const blob of containerClient.listBlobsFlat()) {
      const blobName = blob.name;

      // Calculate expiration time (24 hours after upload)
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000;

      if (expirationTime > currentTime) {
        // Use containerClient URL + blobName, no redundant SAS token
        const fileUrl = `${containerClient.getBlockBlobClient(blobName).url}`;
        files.push({
          name: blobName,
          url: fileUrl,
        });
      }
    }

    return files;
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
}