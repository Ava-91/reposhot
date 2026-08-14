import { toPng } from "html-to-image";

interface PngExportOptions {
  width: number;
  height: number;
  filename: string;
}

export async function downloadElementAsPng(
  element: HTMLElement,
  { width, height, filename }: PngExportOptions,
): Promise<void> {
  const dataUrl = await toPng(element, {
    width,
    height,
    pixelRatio: 1,
    cacheBust: true,
    style: {
      width: `${width}px`,
      height: `${height}px`,
    },
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;

  document.body.appendChild(link);
  link.click();
  link.remove();
}
