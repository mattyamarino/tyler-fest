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
}

export class PerformStunt {
  witnessId!: string;
  stuntId!: string;
  description!: string;
  timestamp!: number;
  isDeleted?: boolean;
  stuntName?: string;
}

export class Stunt {
  id?: string;
  name!: string;
  rules!: string;
  maxUses!: number;
  points!: number;
  icon!: string;
  completions?: Set<string>
  deletedCompletions?: Set<string>
}


export class PreviousOrder {
  timestamp!: number;
  userOrder?: Map<string, User>;
  userList?: User[];
}
