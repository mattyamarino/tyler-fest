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
  messages?: SnackbarMessage[];
}

export class PerformStunt {
  witnessId!: string;
  stuntId!: string;
  description!: string;
  timestamp!: number;
  points!: number;
  stuntName!: string;
  isDeleted?: boolean;
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
  messages?: SnackbarMessage[];
  secretRoleStunt?: boolean;
}


export class PreviousOrder {
  timestamp!: number;
  userList?: User[];
}


export class SnackbarMessage {
  message!: string;
  showOnlyIfSubmissionNumber?: number;
  showOnlyIfDeletedSubmissions?: boolean;
  showOnlyIfPointsMatch?: number;
}