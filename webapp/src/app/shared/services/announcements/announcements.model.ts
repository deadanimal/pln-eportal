export class Announcement {
  public id: string;
  public title: string;
  public description: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title: string,
    description: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
