export interface ExportOptions {
  width: number;
  height: number;
  filename: string;
}

export function createExportOptions(
  width: number,
  height: number,
  owner: string,
  repository: string,
): ExportOptions {
  return {
    width,
    height,
    filename: `reposhot-${owner}-${repository}.png`,
  };
}
