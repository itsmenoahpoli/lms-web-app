export const getPopupContainer = (triggerNode: HTMLElement | null) => {
  return triggerNode ? (triggerNode.parentNode as HTMLElement) : document.body;
};
