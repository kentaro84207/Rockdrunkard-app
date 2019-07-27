// import { Timestamp } from '@firebase/firestore-types';

export interface Problem {
  difficulty: number;
  month: number;
  pid: any;
  setted_by: string;
  redpoint_users: Array<string>;
}
