export class CreditCard {
  public id: string;
  public order_amount: number;
  public order_creation_time: string;
  public order_currency: string;
  public order_id: string;
  public order_lastupdated_time: string;
  public order_totalauthorized_amount: number;
  public order_totalcaptured_amount: number;
  public order_totalrefunded_amount: number;
  public session_id: string;
  public sourceoffunds_type: string;
  public sourceoffunds_provided_card_number: string;
  public sourceoffunds_provided_card_expiry_month: string;
  public sourceoffunds_provided_card_expiry_year: string;
  public sourceoffunds_provided_card_securitycode: string;
  public transaction_amount: number;
  public transaction_currency: string;
  public transaction_id: string;
  public transaction_type: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    order_amount: number,
    order_creation_time: string,
    order_currency: string,
    order_id: string,
    order_lastupdated_time: string,
    order_totalauthorized_amount: number,
    order_totalcaptured_amount: number,
    order_totalrefunded_amount: number,
    session_id: string,
    sourceoffunds_type: string,
    sourceoffunds_provided_card_number: string,
    sourceoffunds_provided_card_expiry_month: string,
    sourceoffunds_provided_card_expiry_year: string,
    sourceoffunds_provided_card_securitycode: string,
    transaction_amount: number,
    transaction_currency: string,
    transaction_id: string,
    transaction_type: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.order_amount = order_amount;
    this.order_creation_time = order_creation_time;
    this.order_currency = order_currency;
    this.order_id = order_id;
    this.order_lastupdated_time = order_lastupdated_time;
    this.order_totalauthorized_amount = order_totalauthorized_amount;
    this.order_totalcaptured_amount = order_totalcaptured_amount;
    this.order_totalrefunded_amount = order_totalrefunded_amount;
    this.session_id = session_id;
    this.sourceoffunds_type = sourceoffunds_type;
    this.sourceoffunds_provided_card_number =
      sourceoffunds_provided_card_number;
    this.sourceoffunds_provided_card_expiry_month =
      sourceoffunds_provided_card_expiry_month;
    this.sourceoffunds_provided_card_expiry_year =
      sourceoffunds_provided_card_expiry_year;
    this.sourceoffunds_provided_card_securitycode =
      sourceoffunds_provided_card_securitycode;
    this.transaction_amount = transaction_amount;
    this.transaction_currency = transaction_currency;
    this.transaction_id = transaction_id;
    this.transaction_type = transaction_type;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
