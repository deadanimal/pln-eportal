export class OperatingSchedule {
  public id: string;
  public time: string;
  public show_name: string;
  public show_audience: string;
  public space_pod_participant: string;
  public notes: string;
  public daily_operating_report_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    time: string,
    show_name: string,
    show_audience: string,
    space_pod_participant: string,
    notes: string,
    daily_operating_report_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.time = time;
    this.show_name = show_name;
    this.show_audience = show_audience;
    this.space_pod_participant = space_pod_participant;
    this.notes = notes;
    this.daily_operating_report_id = daily_operating_report_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
