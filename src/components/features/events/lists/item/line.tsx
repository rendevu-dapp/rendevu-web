const Line = () => {
  return (
    <div className="relative h-full">
      {/* Top Sparkle */}
      <div className="absolute -top-1 left-0 rounded-full transform -translate-x-1/2">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className="fill-neutral-600"
        >
          <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" />
        </svg>
      </div>

      {/* Vertical dashed line */}
      <div className="h-full border-l-1.5 border-dashed border-neutral-200" />

      {/* Bottom circle */}
      <div className="absolute -bottom-1 left-0 w-1.5 h-1.5 bg-neutral-600 rounded-full transform -translate-x-1/2" />
    </div>
  );
};

export default Line;
