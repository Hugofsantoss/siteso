export function IllustrativeBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm bg-black/55 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-sm ${className}`}
    >
      Imagem ilustrativa
    </span>
  );
}
