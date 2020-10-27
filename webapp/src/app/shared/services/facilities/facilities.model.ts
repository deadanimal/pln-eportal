export class Facility {
  public id: string;
  public name: string;
  public description: string;
  public facility_category: string;
  public facility_subcategory: string;
  public area_size: string;
  public max_capacity: number;
  public have_price: boolean;
  public pdf_link: string;
  public promo_link: string;
  public pic_id: string;
  public venue_id: string;
  public equipment_name: string;
  public equipment_description: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    description: string,
    facility_category: string,
    facility_subcategory: string,
    area_size: string,
    max_capacity: number,
    have_price: boolean,
    pdf_link: string,
    promo_link: string,
    pic_id: string,
    venue_id: string,
    equipment_name: string,
    equipment_description: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.facility_category = facility_category;
    this.facility_subcategory = facility_subcategory;
    this.area_size = area_size;
    this.max_capacity = max_capacity;
    this.have_price = have_price;
    this.pdf_link = pdf_link;
    this.promo_link = promo_link;
    this.pic_id = pic_id;
    this.venue_id = venue_id;
    this.equipment_name = equipment_name;
    this.equipment_description = equipment_description;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
