export class DetailReport {
  public id: string;
  public detail: string;
  public description: string;
  public action: string;
  public daily_operating_report_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    detail: string,
    description: string,
    action: string,
    daily_operating_report_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.detail = detail;
    this.description = description;
    this.action = action;
    this.daily_operating_report_id = daily_operating_report_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
