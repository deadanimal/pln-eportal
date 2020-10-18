export class Feedback {
  public id: string;
  public user_id: string;
  public comment: string;
  public created_date: string;
  public modified_date: string;

  constuctor(
    id: string,
    user_id: string,
    comment: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.user_id = user_id;
    this.comment = comment;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
