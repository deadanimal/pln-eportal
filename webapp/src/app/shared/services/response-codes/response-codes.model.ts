export class ResponseCode {
  public id: string;
  public response_code: string;
  public description: string;
  public status: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    response_code: string,
    description: string,
    status: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.response_code = response_code;
    this.description = description;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
