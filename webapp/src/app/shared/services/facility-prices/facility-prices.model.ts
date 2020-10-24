export class FacilityPrice {
  public id: string;
  public facility_description: string;
  public facility_price: number;
  public facility_days: string;
  public facility_id: string;
  public created_date: string;
  public modified_date: string;

  constuctor(
    id: string,
    facility_description: string,
    facility_price: number,
    facility_days: string,
    facility_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.facility_description = facility_description;
    this.facility_price = facility_price;
    this.facility_days = facility_days;
    this.facility_id = facility_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
