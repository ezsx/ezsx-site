export const PROJECT_JUMP_OFFSET_PX = 48;

type ProjectJumpClick = Readonly<{
  altKey: boolean;
  button: number;
  ctrlKey: boolean;
  defaultPrevented: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}>;

type ProjectJumpTarget = Readonly<{
  getBoundingClientRect: () => Readonly<{ top: number }>;
}>;

export type ProjectJumpScrollOptions = Readonly<{
  behavior: "instant";
  left: number;
  top: number;
}>;

type ProjectJumpEnvironment = Readonly<{
  findTarget: (id: string) => ProjectJumpTarget | null;
  getScrollY: () => number;
  preventDefault: () => void;
  scrollTo: (options: ProjectJumpScrollOptions) => void;
}>;

export function isPlainPrimaryClick(click: ProjectJumpClick) {
  return (
    click.button === 0 &&
    !click.defaultPrevented &&
    !click.altKey &&
    !click.ctrlKey &&
    !click.metaKey &&
    !click.shiftKey
  );
}

export function getProjectJumpTargetId(href: string) {
  if (!href.startsWith("#") || href.length === 1) {
    return null;
  }

  try {
    return decodeURIComponent(href.slice(1));
  } catch {
    return href.slice(1);
  }
}

export function performProjectJump(
  href: string,
  environment: ProjectJumpEnvironment,
  offsetPx = PROJECT_JUMP_OFFSET_PX,
) {
  const targetId = getProjectJumpTargetId(href);
  const target = targetId ? environment.findTarget(targetId) : null;

  if (!target) {
    return false;
  }

  environment.preventDefault();
  environment.scrollTo({
    behavior: "instant",
    left: 0,
    top: Math.max(
      0,
      environment.getScrollY() +
        target.getBoundingClientRect().top -
        offsetPx,
    ),
  });

  return true;
}
