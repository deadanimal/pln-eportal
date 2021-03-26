export class ErrorLog {
  public id: string;
  public error: string;
  public message: string;
  public name: string;
  public status: string;
  public statustext: string;
  public url: string;
  public user: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    error: string,
    message: string,
    name: string,
    status: string,
    statustext: string,
    url: string,
    user: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.error = error;
    this.message = message;
    this.name = name;
    this.status = status;
    this.statustext = statustext;
    this.url = url;
    this.user = user;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
