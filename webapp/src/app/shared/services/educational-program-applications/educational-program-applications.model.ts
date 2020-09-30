export class EducationalProgramApplication {
  public id: string;
  public organisation_name: string;
  public organisation_category: string;
  public customer_id: string;
  public educational_program_id: string;
  public educational_program_date_id: string;
  public participant: number;
  public status: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    organisation_name: string,
    organisation_category: string,
    customer_id: string,
    educational_program_id: string,
    educational_program_date_id: string,
    participant: number,
    status: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.organisation_name = organisation_name;
    this.organisation_category = organisation_category;
    this.customer_id = customer_id;
    this.educational_program_id = educational_program_id;
    this.educational_program_date_id = educational_program_date_id;
    this.participant = participant;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
