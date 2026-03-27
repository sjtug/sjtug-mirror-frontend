import type { JSX } from "solid-js";

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

export const CheckIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M5 12.5L10 17L19 8" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M7 7L17 17" />
    <path d="M17 7L7 17" />
  </svg>
);

export const SpinnerIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle class="status-spinner-track" cx="12" cy="12" r="8" />
    <path class="status-spinner-head" d="M20 12a8 8 0 0 0-8-8" />
  </svg>
);

export const HelpCircleIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.75 9.5a2.25 2.25 0 1 1 3.97 1.45c-.5.56-1.04.9-1.46 1.32-.4.4-.66.84-.66 1.73" />
    <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle cx="10.5" cy="10.5" r="7" />
    <path d="M21 21l-5.2-5.2" />
  </svg>
);

export const ExternalLinkIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M14 5h5v5" />
    <path d="M19 5L10 14" />
    <path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
  </svg>
);
