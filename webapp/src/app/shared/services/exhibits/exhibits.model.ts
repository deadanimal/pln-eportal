export class Exhibit {
  public id: string;
  public name: string;
  public description: string;
  public image_link: string;
  public pic_id: string;
  public zone: string;
  public asset_id: string;
  public equipment: string;
  public qrcode: string;
  public status: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    description: string,
    image_link: string,
    pic_id: string,
    zone: string,
    asset_id: string,
    equipment: string,
    qrcode: string,
    status: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image_link = image_link;
    this.pic_id = pic_id;
    this.zone = zone;
    this.asset_id = asset_id;
    this.equipment = equipment;
    this.qrcode = qrcode;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
