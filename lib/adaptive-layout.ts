import type { MetadataVisibility } from "@/components/MetadataControls";
import type { RepositoryData } from "@/lib/repository-mapper";
import type { LayoutName } from "@/lib/layouts";

export function getEffectiveLayout(
  selected: LayoutName,
  metadata: MetadataVisibility,
  repository: RepositoryData,
): LayoutName {
  if (!metadata.adaptiveLayout) return selected;

  const visibleStats = Number(metadata.language && Boolean(repository.language))
    + Number(metadata.stars)
    + Number(metadata.forks)
    + Number(metadata.openIssues);
  const textDensity = (repository.description?.length ?? 0)
    + repository.topics.length * 18
    + visibleStats * 24
    + metadata.subtitle.length;

  if (textDensity > 300 || repository.topics.length > 5 || (visibleStats >= 4 && textDensity > 180)) return "square";
  return selected;
}
