export class MenuRole {
  public id: string;
  public menu: any;
  public role: any;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    menu: any,
    role: any,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.menu = menu;
    this.role = role;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
