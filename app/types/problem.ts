// import { Timestamp } from '@firebase/firestore-types';

export interface Problem {
  num: null | number
  difficulty: null | number
  year: null | number
  month: null | number
  pid: null | number
  setted_by: null | string
  redpoint_users: null | Array<string>
}
