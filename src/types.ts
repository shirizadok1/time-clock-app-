export type Hour = { start: string; end: string ,date:string};
export type Employee = { id: string; name: string; hours: Hour[] };

export interface Report {
    id: number;
    name: string;
    hours: Array<{
      date: Date;
      start?: string;
      end?: string;
    }>;
  }
