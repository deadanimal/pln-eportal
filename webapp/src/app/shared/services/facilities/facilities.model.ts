export class Facility {
  public id: string;
  public name: string;
  public description: string;
  public facility_type: string;
  public price: number;
  public size: number;
  public max_capacity: number;
  public image_link: string;
  public pdf_link: string;
  public promo_link: string;
  public pic_id: string;
  public asset_id: string;
  public venue_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    description: string,
    facility_type: string,
    price: number,
    size: number,
    max_capacity: number,
    image_link: string,
    pdf_link: string,
    promo_link: string,
    pic_id: string,
    asset_id: string,
    venue_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.facility_type = facility_type;
    this.price = price;
    this.size = size;
    this.max_capacity = max_capacity;
    this.image_link = image_link;
    this.pdf_link = pdf_link;
    this.promo_link = promo_link;
    this.pic_id = pic_id;
    this.asset_id = asset_id;
    this.venue_id = venue_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
