export interface ToastModel {
  content: string;
  show?: boolean;
  type: toastTypes;
}

export enum toastTypes {
  error,
  success,
  warn,
  question,
}
