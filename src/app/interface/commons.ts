export interface HttpResponse<T> {
  isError: boolean;
  message: string;
  data: T;
}

export interface Note {
  createdAt: string;
  title: string;
  content: string;
}
