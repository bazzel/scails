function startViewTransition(fn) {
  if (!document.startViewTransition) {
    fn();
    return;
  }

  document.startViewTransition(() => fn());
}

export { startViewTransition };
