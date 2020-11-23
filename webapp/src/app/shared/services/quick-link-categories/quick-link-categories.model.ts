export class QuickLinkCategory {
  public id: string;
  public name: string;
  public order: number;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    order: number,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.order = order;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
