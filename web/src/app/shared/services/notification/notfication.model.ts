export class Notification {
  public id: string;
  public user: string;
  public title: string;
  public description: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    user: string,
    title: string,
    description: string,
    created_date: string,
    modified_date: string,

  ) {
      this.id = id;
      this.user = user;
      this.title = title;
      this.description = description;
      this.created_date = created_date;
      this.modified_date = modified_date;
  }
}
