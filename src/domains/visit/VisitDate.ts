export enum VisitStatus {
  PENDING,
  APROVED,
  REJECTED,
}

export type VisitDateProperties = {
  date: string;
  hour: string;
  status: 0 | 1 | 2;
}

export class VisitDate {
  constructor(private readonly visitDate: VisitDateProperties) {
  }

  get date(): string {
    return this.visitDate.date;
  }

  get hour(): string {
    return this.visitDate.hour;
  }

  get status(): VisitStatus {
    return VisitStatus[this.visitDate.status?? 0];
  }
}