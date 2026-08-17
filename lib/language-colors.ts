const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-400",
  Python: "bg-green-400",
  Java: "bg-orange-400",
  "C++": "bg-pink-400",
  C: "bg-sky-400",
  "C#": "bg-purple-400",
  CSharp: "bg-purple-400",
  Go: "bg-cyan-400",
  Rust: "bg-orange-500",
  PHP: "bg-indigo-400",
  Ruby: "bg-red-400",
  Swift: "bg-orange-300",
  Kotlin: "bg-violet-400",
};

export function getLanguageColor(language: string): string {
  return languageColors[language] ?? "bg-zinc-400";
}