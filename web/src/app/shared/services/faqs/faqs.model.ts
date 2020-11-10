export class Faq {
  public id: string;
  public question: string;
  public answer: string;
  public order: number;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    question: string,
    answer: string,
    order: number,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.order = order;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
