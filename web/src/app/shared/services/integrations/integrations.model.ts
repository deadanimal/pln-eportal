export class Integration {
  public id: string;
  public integration_type: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    integration_type: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.integration_type = integration_type;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
