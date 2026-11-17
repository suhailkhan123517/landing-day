import type { Project } from "../types/project";

interface ExportOptions {
  fileName?: string;
  project: Project;
  svgElement: SVGSVGElement;
}

/**
 * Generates the standardized export file name.
 * e.g. landing-day-2026-12-01-midnight.png
 */
export function getExportFileName(project: Project): string {
  const dateStr = project.moveDate || "target";
  const themeStr = project.theme || "midnight";
  return `landing-day-${dateStr}-${themeStr}.png`;
}

/**
 * Exports the wallpaper SVG as a full-resolution PNG image directly in the browser.
 */
export async function exportWallpaperPng(options: ExportOptions): Promise<void> {
  const { fileName, project, svgElement } = options;
  const targetFileName = fileName || getExportFileName(project);

  // 1. Ensure fonts in document are loaded
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Font loading error handling
    }
  }

  // 2. Clone the SVG element to avoid modifying the active DOM tree
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  clonedSvg.setAttribute("width", String(project.width));
  clonedSvg.setAttribute("height", String(project.height));

  // Serialize the SVG to an XML string
  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(clonedSvg);

  // Ensure proper XML namespace if not present
  if (!svgString.includes("xmlns=\"http://www.w3.org/2000/svg\"")) {
    svgString = svgString.replace(
      "<svg",
      '<svg xmlns="http://www.w3.org/2000/svg"'
    );
  }

  // 3. Create SVG Blob & Object URL
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = project.width;
        canvas.height = project.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error("Unable to obtain 2D canvas context for wallpaper export"));
          return;
        }

        // Draw the vector SVG at crisp native resolution
        ctx.drawImage(img, 0, 0, project.width, project.height);
        URL.revokeObjectURL(url);

        canvas.toBlob(
          (pngBlob) => {
            if (!pngBlob) {
              reject(new Error("Canvas toBlob failed"));
              return;
            }

            const downloadUrl = URL.createObjectURL(pngBlob);
            const anchor = document.createElement("a");
            anchor.href = downloadUrl;
            anchor.download = targetFileName;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            URL.revokeObjectURL(downloadUrl);
            resolve();
          },
          "image/png",
          1.0
        );
      } catch (error) {
        URL.revokeObjectURL(url);
        reject(error);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load SVG into image for rasterization"));
    };

    img.src = url;
  });
}
