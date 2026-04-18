import Image from "next/image";

export default function Logo({
  size = 36,
  showWordmark = true,
  inverse = false,
}: {
  size?: number;
  showWordmark?: boolean;
  inverse?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/icono.svg"
        alt="El Cuentas"
        width={size}
        height={size}
        priority
      />
      {showWordmark && (
        <span
          className={`font-display text-[22px] font-extrabold leading-none tracking-[-0.02em] ${inverse ? "text-paper" : "text-ink"}`}
        >
          El Cuentas
        </span>
      )}
    </span>
  );
}
