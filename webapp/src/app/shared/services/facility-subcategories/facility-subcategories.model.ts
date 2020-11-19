export class FacilitySubcategory {
  public id: string;
  public code: string;
  public name: string;
  public image_link: string;
  public facility_category: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    code: string,
    name: string,
    image_link: string,
    facility_category: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.image_link = image_link;
    this.facility_category = facility_category;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
