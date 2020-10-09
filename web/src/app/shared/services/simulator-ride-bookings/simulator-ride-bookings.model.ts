export class SimulatorRideBooking {
  public id: string;
  public simulator_ride_time_id: string;
  public ticket_type: string;
  public ticket_category: string;
  public ticket_quantity: number;
  public price: number;
  public total_price: number;
  public user_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    simulator_ride_time_id: string,
    ticket_type: string,
    ticket_category: string,
    ticket_quantity: number,
    price: number,
    total_price: number,
    user_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.simulator_ride_time_id = simulator_ride_time_id;
    this.ticket_type = ticket_type;
    this.ticket_category = ticket_category;
    this.ticket_quantity = ticket_quantity;
    this.price = price;
    this.total_price = total_price;
    this.user_id = user_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
