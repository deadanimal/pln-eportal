export class Contractor {
  public id: string;
  public service: string;
  public contractor_name: string;
  public officer_name: string;
  public attendance: string;
  public notes: string;
  public daily_operating_report_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    service: string,
    contractor_name: string,
    officer_name: string,
    attendance: string,
    notes: string,
    daily_operating_report_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.service = service;
    this.contractor_name = contractor_name;
    this.officer_name = officer_name;
    this.attendance = attendance;
    this.notes = notes;
    this.daily_operating_report_id = daily_operating_report_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
