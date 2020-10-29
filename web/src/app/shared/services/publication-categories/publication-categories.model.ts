export class PublicationCategory {
  public id: string;
  public name: string;
  public icon: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    icon: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
