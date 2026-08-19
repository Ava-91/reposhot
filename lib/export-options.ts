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
  const isWrappedExport = repository.endsWith("-wrapped");
  const prefix = isWrappedExport ? "reposhot-wrapped" : "reposhot";

  return {
    width,
    height,
    filename: `${prefix}-${owner}-${repository}.png`,
  };
}
