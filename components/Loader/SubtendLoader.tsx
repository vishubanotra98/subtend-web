"use client";

interface SubtendLoaderProps {
  size?: number;
  className?: string;
}

const LOGO_PATH = `
  M 40 50
  L 160 100
  L 40 150
  L 90 100
  Z
`;

export default function SubtendLoader({
  size = 80,
  className = "",
}: SubtendLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`subtend-loader ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="subtend-loader-crop">
            <rect x="30" y="0" width="170" height="200" />
          </clipPath>

          <filter
            id="subtend-loader-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g clipPath="url(#subtend-loader-crop)">
          {/* Static track */}
          <path
            d={LOGO_PATH}
            fill="none"
            stroke="var(--border)"
            strokeWidth="11"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            opacity="0.35"
          />

          {/* Animated Subtend logo */}
          <path
            d={LOGO_PATH}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="11"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            className="subtend-loader-path"
            filter="url(#subtend-loader-glow)"
          />
        </g>
      </svg>
    </div>
  );
}
