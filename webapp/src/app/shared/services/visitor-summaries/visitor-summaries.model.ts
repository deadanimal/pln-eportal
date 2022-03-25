export class VisitorSummary {
  public id: string;
  public visitor_summary_show: number;
  public visitor_summary_space_pod: number;
  public visitor_summary_exhibition: number;
  public visitor_summary_kutubkhanah: number;
  public visitor_summary_all: number;
  public daily_operating_report_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    visitor_summary_show: number,
    visitor_summary_space_pod: number,
    visitor_summary_exhibition: number,
    visitor_summary_kutubkhanah: number,
    visitor_summary_all: number,
    daily_operating_report_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.visitor_summary_show = visitor_summary_show;
    this.visitor_summary_space_pod = visitor_summary_space_pod;
    this.visitor_summary_exhibition = visitor_summary_exhibition;
    this.visitor_summary_kutubkhanah = visitor_summary_kutubkhanah;
    this.visitor_summary_all = visitor_summary_all;
    this.daily_operating_report_id = daily_operating_report_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
