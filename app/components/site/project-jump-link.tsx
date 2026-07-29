"use client";

import type { MouseEvent, ReactNode } from "react";
import {
  isPlainPrimaryClick,
  performProjectJump,
} from "./project-jump";

type ProjectJumpLinkProps = Readonly<{
  children: ReactNode;
  href: `#${string}`;
}>;

export default function ProjectJumpLink({
  children,
  href,
}: ProjectJumpLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isPlainPrimaryClick(event)) {
      return;
    }

    performProjectJump(href, {
      findTarget: (id) => document.getElementById(id),
      getScrollY: () => window.scrollY,
      preventDefault: () => event.preventDefault(),
      scrollTo: (options) => window.scrollTo(options as ScrollToOptions),
    });
  }

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
