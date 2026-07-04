type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

export function AnimatedCounter({ value, suffix = "", label }: AnimatedCounterProps) {
  return (
    <div className="glass-panel gold-ring rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="text-3xl font-semibold text-white md:text-4xl">
        {value}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-[#9fb0d1]">{label}</p>
    </div>
  );
}
