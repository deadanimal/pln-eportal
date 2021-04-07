export class DailyOperatingReport {
  public id: string;
  public report_date: string;
  public report_by: string;
  public report_by_position: string;
  public operations_manager: string;
  public technical_officer: string;
  public ticket_counter_clerk: string;
  public stage_officer: string;
  public info_counter_clerk: string;
  public librarian: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    report_date: string,
    report_by: string,
    report_by_position: string,
    operations_manager: string,
    technical_officer: string,
    ticket_counter_clerk: string,
    stage_officer: string,
    info_counter_clerk: string,
    librarian: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.report_date = report_date;
    this.report_by = report_by;
    this.report_by_position = report_by_position;
    this.operations_manager = operations_manager;
    this.technical_officer = technical_officer;
    this.ticket_counter_clerk = ticket_counter_clerk;
    this.stage_officer = stage_officer;
    this.info_counter_clerk = info_counter_clerk;
    this.librarian = librarian;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
