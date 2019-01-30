export class BKEvent {
  constructor(
    public type: string,
    public amount: number,
    public category: number,
    public description: string,
    public date: string,
    public id?: number,
    public catName?: string
  ) {}
}
