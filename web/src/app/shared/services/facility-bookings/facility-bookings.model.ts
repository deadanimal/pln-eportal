export class FacilityBooking {
  public id: string;
  public title: string;
  public organisation_name: string;
  public organisation_category: string;
  public booking_date: string;
  public booking_time: string;
  public number_of_people: string;
  public total_price: string;
  public user_id: string;
  public pic_id: string;
  public facility_id: string;
  public status: string;
  public created_date: string;
  public modified_date: string;

  constuctor(
    id: string,
    title: string,
    organisation_name: string,
    organisation_category: string,
    booking_date: string,
    booking_time: string,
    number_of_people: string,
    total_price: string,
    user_id: string,
    pic_id: string,
    facility_id: string,
    status: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title = title;
    this.organisation_name = organisation_name;
    this.organisation_category = organisation_category;
    this.booking_date = booking_date;
    this.booking_time = booking_time;
    this.number_of_people = number_of_people;
    this.total_price = total_price;
    this.user_id = user_id;
    this.pic_id = pic_id;
    this.facility_id = facility_id;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
