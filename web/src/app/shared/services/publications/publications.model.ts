export class Publication {
  public id: string;
  public title: string;
  public abstract: string;
  public author_name: string;
  public publisher_name: string;
  public published_date: string;
  public poster_link: string;
  public pdf_link: string;
  public year: string;
  public edition: string;
  public publication_category_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title: string,
    abstract: string,
    author_name: string,
    publisher_name: string,
    published_date: string,
    poster_link: string,
    pdf_link: string,
    year: string,
    edition: string,
    publication_category_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title = title;
    this.abstract = abstract;
    this.author_name = author_name;
    this.publisher_name = publisher_name;
    this.published_date = published_date;
    this.poster_link = poster_link;
    this.pdf_link = pdf_link;
    this.year = year;
    this.edition = edition;
    this.publication_category_id = publication_category_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
