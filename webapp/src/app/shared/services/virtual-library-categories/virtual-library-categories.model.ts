export class VirtualLibraryCategory {
  public id: string;
  public name: string;
  public icon: string;
  public link: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    icon: string,
    link: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.link = link;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
