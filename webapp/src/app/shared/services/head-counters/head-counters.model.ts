export class HeadCounter {
  public id: string;
  public total_in: number;
  public total_out: number;
  public total_stay: number;
  public date: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    total_in: number,
    total_out: number,
    total_stay: number,
    date: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.total_in = total_in;
    this.total_out = total_out;
    this.total_stay = total_stay;
    this.date = date;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
