import fs from "fs";
import path from "path";

// Get the current file URL and derive the directory name
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Helper function to ensure a directory exists
const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Get the upload path, storing with or without userId
const getUploadPath = (userId, fileName, subDirectory = "") => {
  // Use Date.now() for unique timestamp
  const timestamp = Date.now().toString();

  let uploadDir;

  if (userId && typeof userId === "string" && userId.trim() !== "") {
    // Store inside user-specific directory
    const safeUserId = userId.trim();
    uploadDir = path.join(process.cwd(), "uploads", safeUserId, subDirectory, timestamp);
  } else {
    // Store in general uploads directory
    uploadDir = path.join(process.cwd(), "uploads", subDirectory, timestamp);
  }

  // Ensure the directory exists
  ensureDirectoryExists(uploadDir);

  // Full file path
  const filePath = path.join(uploadDir, fileName);

  // Return both absolute and relative paths
  return {
    fullPath: filePath,
    relativePath: path.posix.join("uploads", userId ? userId : "", subDirectory, timestamp, fileName),
  };
};

export default getUploadPath;
