export class User {
  id?: string;
  firstName!:  string;
  abreviation!: string;
  score?: number = 0;
  position?: number;
  isTied?: boolean;
  loggedIn?: boolean;
  performances?: PerformStunt[];
  jsonPerforms?: string;
  previousOrder?: PreviousOrder;
  jsonPreviousOrder?: string;
  isSuspended?: boolean;
  showHidden?: boolean;
}

export class PerformStunt {
  witnessId!: string;
  stuntId!: string;
  description!: string;
  timestamp!: number;
  points!: number;
  isDeleted?: boolean;
  stuntName?: string;
}

export class Stunt {
  id?: string;
  name!: string;
  rules!: string;
  maxUses!: number;
  points!: number[];
  icon!: string;
  judgedEvent?: boolean;
  completions?: Set<string>
  deletedCompletions?: Set<string>
  isHidden?: boolean;
}


export class PreviousOrder {
  timestamp!: number;
  userList?: User[];
}
