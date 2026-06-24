import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Copy CV from root to public folder
const sourceCv = path.join(process.cwd(), "Deni Trio Saputra-resume (10) (1).pdf");
const destCv = path.join(process.cwd(), "public", "Deni Trio Saputra - UI UX.pdf");
const destCvClean = path.join(process.cwd(), "public", "Deni-Trio-Saputra-UI-UX.pdf");
try {
  if (fs.existsSync(sourceCv)) {
    fs.copyFileSync(sourceCv, destCv);
    fs.copyFileSync(sourceCv, destCvClean);
    console.log("Successfully copied CV PDF to public directory!");
  } else {
    console.warn("Source CV PDF not found at:", sourceCv);
  }
} catch (err) {
  console.error("Failed to copy CV PDF:", err);
}

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
