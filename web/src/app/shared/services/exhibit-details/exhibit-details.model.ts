export class ExhibitDetail {
  public id: string;
  public name: string;
  public description: string;
  public video_link: string;
  public qrcode: string;
  public status: string;
  public venue_id: string;
  public exhibit_list_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    description: string,
    video_link: string,
    qrcode: string,
    status: string,
    venue_id: string,
    exhibit_list_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.video_link = video_link;
    this.qrcode = qrcode;
    this.status = status;
    this.venue_id = venue_id;
    this.exhibit_list_id = exhibit_list_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
