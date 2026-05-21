type ArchitectureArtProps = {
  title: string;
  palette: [string, string, string];
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
      <div className="architecture-art__plane architecture-art__plane--sky" />
      <div className="architecture-art__plane architecture-art__plane--wall" />
      <div className="architecture-art__plane architecture-art__plane--tower" />
      <div className="architecture-art__plane architecture-art__plane--court" />
      <span className="architecture-art__label">{label ?? "IMAGE SLOT"}</span>
    </div>
  );
}
