export class User {
  id?: string;
  firstName!:  string;
  abreviation!: string;
  score?: number = 0;
  position?: number;
  loggedIn?: boolean;
  performances?: PerformStunt[];
  jsonPerforms?: string;
}

export class PerformStunt {
  witnessId!: string;
  stuntId!: string;
  description!: string;
  timestamp!: number;
  isDeleted?: boolean;
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

export class Credentials {
  username!: string;
  password!: string;
}

