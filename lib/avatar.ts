export function createAvatarFallback(login: string): string {
  const initials = login.trim().slice(0, 2).toUpperCase() || "?";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88"><rect width="88" height="88" rx="16" fill="#27272a"/><text x="44" y="49" text-anchor="middle" fill="#d4d4d8" font-family="Arial,sans-serif" font-size="28" font-weight="700">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export async function loadAvatarAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url, { mode: "cors", cache: "force-cache" });
  if (!response.ok) throw new Error("Avatar request failed");
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Avatar conversion failed"));
    reader.onerror = () => reject(reader.error ?? new Error("Avatar conversion failed"));
    reader.readAsDataURL(blob);
  });
}
