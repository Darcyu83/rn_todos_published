export interface TTodo {
  category: 'vacation' | 'massage' | 'workout' | 'meeting' | 'etc';
  isInSingleDay: boolean;
  id: number;
  title: string;
  todo: string;
  startDt: string; // 'YYYY-MM-DD'
  endDt: string;
}

export interface TTodosInitialState {
  list: TTodo[];
}
