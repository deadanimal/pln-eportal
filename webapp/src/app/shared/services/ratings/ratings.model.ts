export class Rating {
  public id: string;
  public rating: number;
  public comment: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    rating: number,
    comment: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.rating = rating;
    this.comment = comment;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
