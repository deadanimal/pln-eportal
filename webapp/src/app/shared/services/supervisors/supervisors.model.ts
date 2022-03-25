export class Supervisor {
  public id: string;
  public user: string;
  public date_on_duty: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    user: string,
    date_on_duty: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.user = user;
    this.date_on_duty = date_on_duty;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
