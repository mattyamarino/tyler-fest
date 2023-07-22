export class User {
  id!: string;
  firstName!:  string;
  abreviation!: string;
  score?: number;
}

export class PerformStunt {
  id!: string;
  userId!: string;
  witnessId!: string;
  stuntId!: string;
  description!: string;
  timestamp!: number;
}

export class Stunt {
  id!: string;
  name!: string;
  description!: string;
  maxUses!: number;
  points!: number;
}

