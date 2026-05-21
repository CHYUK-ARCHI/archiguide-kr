import type { CSSProperties } from "react";

type ArchitectureArtProps = {
  title: string;
  palette: [string, string, string];
  label?: string;
  mode?: "wide" | "compact";
};

export function ArchitectureArt({
  title,
  palette,
  label,
  mode = "wide"
}: ArchitectureArtProps) {
  const style = {
    "--art-a": palette[0],
    "--art-b": palette[1],
    "--art-c": palette[2]
  } as CSSProperties;

  return (
    <div className={`architecture-art architecture-art--${mode}`} style={style} aria-label={title}>
      <div className="architecture-art__plane architecture-art__plane--sky" />
      <div className="architecture-art__plane architecture-art__plane--wall" />
      <div className="architecture-art__plane architecture-art__plane--tower" />
      <div className="architecture-art__plane architecture-art__plane--court" />
      <span className="architecture-art__label">{label ?? title}</span>
    </div>
  );
}
