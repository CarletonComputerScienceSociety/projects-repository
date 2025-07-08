import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file URL and convert it to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const srcDir = path.join(__dirname, "..", "content", "projects");
const destDir = path.join(__dirname, "..", "public", "project-images");

function copyImages(srcPath) {
  fs.readdir(srcPath, (err, projects) => {
    if (err) throw err;

    projects.forEach((project) => {
      const projectPath = path.join(srcPath, project);

        const srcImagePath = path.join(projectPath, "index.md");
        const destImagePath = path.join(
        destDir,
        project,
        "index.md",
        );

        // Check if image.png exists
        if (fs.existsSync(srcImagePath)) {
        // Create destination directory if it doesn't exist
        fs.mkdirSync(path.dirname(destImagePath), { recursive: true });

        // Copy the image
        fs.copyFile(srcImagePath, destImagePath, (err) => {
            if (err) throw err;
            console.log(`Copied: ${srcImagePath} to ${destImagePath}`);
        });
        }
    });
    });
}

copyImages(srcDir);