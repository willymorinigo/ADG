/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  /**
   * Whether to render the logo for a light background (original colors) or a dark background (solid white).
   * @default true
   */
  lightBg?: boolean;
  /**
   * Additional CSS classes to apply to the container.
   */
  className?: string;
  /**
   * Height of the logo in pixels. Width scales automatically.
   * @default 40
   */
  height?: number;
  /**
   * Whether to show only the icon or the full brand logo (icon + "adg" text).
   * @default false
   */
  iconOnly?: boolean;
}

export default function Logo({
  lightBg = true,
  className = '',
  height = 40,
  iconOnly = false,
}: LogoProps) {
  // Original colors:
  // - Leaves: Dark Forest Green (#044524)
  // - Base shield: Dark Charcoal (#1e1e1c)
  // - Text: Dark Charcoal (#1e1e1c)
  //
  // Dark background (white logo):
  // - Leaves: White (#ffffff)
  // - Base shield: White (#ffffff)
  // - Text: White (#ffffff)

  const leafColor = lightBg ? '#044524' : '#ffffff';
  const baseColor = lightBg ? '#1e1e1c' : '#ffffff';
  const textColor = lightBg ? '#1e1e1c' : '#ffffff';

  // Calculate width based on proportion (icon is 1:1, full logo is about 2.8:1)
  const width = iconOnly ? height : Math.round(height * 2.8);

  return (
    <div className={`inline-flex items-center select-none ${className}`} style={{ height }}>
      <svg
        viewBox={iconOnly ? "0 0 100 100" : "0 0 280 100"}
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-full"
      >
        {/* SYMBOL */}
        <g id="logo-symbol">
          {/* Left Leaf */}
          <path
            d="M 5 5 C 20 23, 44 32, 44 48.2 L 44 75.2 L 5 40.1 Z"
            fill={leafColor}
          />
          {/* Right Leaf */}
          <path
            d="M 95 5 C 80 23, 56 32, 56 48.2 L 56 75.2 L 95 40.1 Z"
            fill={leafColor}
          />
          {/* Bottom Cup/Shield (Left Half) */}
          <path
            d="M 5 57.2 L 44 92.3 L 50 95 C 25 95, 5 81.5, 5 57.2 Z"
            fill={baseColor}
          />
          {/* Bottom Cup/Shield (Right Half) */}
          <path
            d="M 95 57.2 L 56 92.3 L 50 95 C 75 95, 95 81.5, 95 57.2 Z"
            fill={baseColor}
          />
        </g>

        {/* TEXT: "adg" */}
        {!iconOnly && (
          <text
            x="115"
            y="76"
            fontFamily='system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
            fontWeight="900"
            fontSize="78px"
            letterSpacing="-0.07em"
            fill={textColor}
            className="select-none font-black"
          >
            adg
          </text>
        )}
      </svg>
    </div>
  );
}
