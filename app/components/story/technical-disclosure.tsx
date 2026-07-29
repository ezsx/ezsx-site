"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type { TechnicalDisclosureLabels } from "./story-types";

type TechnicalDisclosureProps = Readonly<{
  bodyClassName?: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  eyebrow: string;
  labels: TechnicalDisclosureLabels;
  meta: string;
  title: string;
}>;

export default function TechnicalDisclosure({
  bodyClassName,
  children,
  className = "",
  defaultOpen = false,
  eyebrow,
  labels,
  meta,
  title,
}: TechnicalDisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details
      className={`technical-disclosure ${className}`.trim()}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      open={open}
    >
      <summary>
        <span>
          <small>{eyebrow}</small>
          <strong>{title}</strong>
        </span>
        <span className="technical-summary-actions">
          <span className="technical-disclosure-meta">
            {meta}
          </span>
          <span className="disclosure-cue">
            <span className="disclosure-closed-label">{labels.expand}</span>
            <span className="disclosure-open-label">{labels.collapse}</span>
            <i
              aria-hidden="true"
              className="disclosure-mark technical-disclosure-mark"
            />
          </span>
        </span>
      </summary>
      {bodyClassName ? <div className={bodyClassName}>{children}</div> : children}
    </details>
  );
}
