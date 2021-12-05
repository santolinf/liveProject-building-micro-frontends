
export function dispatchEvent(eventType) {
  const event = new Event(eventType);

  window.document.dispatchEvent(event);
}

export default {
  MICRO_FRONTEND_DID_MOUNT: 'did_mount',
  MICRO_FRONTEND_WILL_MOUNT: 'will_mount',
  MICRO_FRONTEND_DID_UNMOUNT: 'did_unmount',
  MICRO_FRONTEND_WILL_UNMOUNT: 'will_unmount'
}
