export class Feedback {
  public id: string;
  public user_id: string;
  public comment_user: string;
  public comment_admin: string;
  public created_date: string;
  public modified_date: string;

  constuctor(
    id: string,
    user_id: string,
    comment_user: string,
    comment_admin: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.user_id = user_id;
    this.comment_user = comment_user;
    this.comment_admin = comment_admin;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
