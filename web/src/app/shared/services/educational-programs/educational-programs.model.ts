export class EducationalProgram {
  public id: string;
  public title: string;
  public description: string;
  public program_type: string;
  public program_category: string;
  public program_opento: string;
  public min_participant: number;
  public max_participant: number;
  public price: number;
  public poster_link: string;
  public website_link: string;
  public video_link: string;
  public registration: boolean;
  public venue_id: string;
  public coordinator_id: string;
  public status: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title: string,
    description: string,
    program_type: string,
    program_category: string,
    program_opento: string,
    min_participant: number,
    max_participant: number,
    price: number,
    poster_link: string,
    website_link: string,
    video_link: string,
    registration: boolean,
    venue_id: string,
    coordinator_id: string,
    status: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.program_type = program_type;
    this.program_category = program_category;
    this.program_opento = program_opento;
    this.min_participant = min_participant;
    this.max_participant = max_participant;
    this.price = price;
    this.poster_link = poster_link;
    this.website_link = website_link;
    this.video_link = video_link;
    this.registration = registration;
    this.venue_id = venue_id;
    this.coordinator_id = coordinator_id;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
