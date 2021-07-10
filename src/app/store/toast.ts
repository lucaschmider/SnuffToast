export interface ToastDocument {
  title: string,
  text: string
}

export interface Toast extends ToastDocument {
  toastId: string
}
