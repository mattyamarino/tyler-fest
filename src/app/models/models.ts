export class User {
  id?: string;
  firstName!:  string;
  abreviation!: string;
  score?: number = 0;
  position?: number;
}

export class PerformStunt {
  id?: string;
  userId!: string;
  witnessId!: string;
  stuntId!: string;
  description!: string;
  timestamp!: number;
}

export class Stunt {
  id?: string;
  name!: string;
  rules!: string;
  maxUses!: number;
  points!: number;
  icon!: string;
  completions?: number
}

