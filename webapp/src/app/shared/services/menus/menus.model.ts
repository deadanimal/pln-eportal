export class Menu {
  public id: string;
  public path: string;
  public title: string;
  public type: string;
  public icontype: string;
  public ordering: number;
  public active: boolean;
  public mainmenu: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    path: string,
    title: string,
    type: string,
    icontype: string,
    ordering: number,
    active: boolean,
    mainmenu: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.path = path;
    this.title = title;
    this.type = type;
    this.icontype = icontype;
    this.ordering = ordering;
    this.active = active;
    this.mainmenu = mainmenu;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
