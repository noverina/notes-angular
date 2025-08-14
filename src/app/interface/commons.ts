export interface HttpResponse<T> {
  isError: boolean;
  message: string;
  data: T;
}

export interface Note {
  id: string;
  createdAt: string;
  title: string;
  content: string;
}

export interface InsertNote {
  title: string;
  content: string;
}
