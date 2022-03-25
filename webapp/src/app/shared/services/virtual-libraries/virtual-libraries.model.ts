export class Virtuallibrary {
  public id: string;
  public title: string;
  public abstract: string;
  public year: string;
  public poster_link: string;
  public document_link: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title: string,
    abstract: string,
    year: string,
    poster_link: string,
    document_link: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title = title;
    this.abstract = abstract;
    this.year = year;
    this.poster_link = poster_link;
    this.document_link = document_link;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
