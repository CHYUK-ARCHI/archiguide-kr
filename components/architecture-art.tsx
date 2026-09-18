type ArchitectureArtProps = {
  title: string;
  palette?: [string, string, string]; // reserved for future use — currently unused
  label?: string;
  mode?: "wide" | "compact";
};

export function ArchitectureArt({
  title,
  label,
  mode = "wide"
}: ArchitectureArtProps) {
  return (
    <div
      className={`architecture-art architecture-art--${mode}`}
      aria-label={title}
    >
      <span className="architecture-art__label">
        {label ?? "이미지 준비 중"}
      </span>
    </div>
  );
}
