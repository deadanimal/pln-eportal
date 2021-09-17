export class Role {
  public id: string;
  public code: string;
  public name: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    code: string,
    name: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
