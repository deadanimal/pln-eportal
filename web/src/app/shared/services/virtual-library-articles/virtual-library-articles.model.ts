export class VirtualLibraryArticle {
  public id: string;
  public name: string;
  public description: string;
  public date: string;
  public status: boolean;
  public pdf_link: string;
  public virtual_library_article_category_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    description: string,
    date: string,
    status: boolean,
    pdf_link: string,
    virtual_library_article_category_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.status = status;
    this.pdf_link = pdf_link;
    this.virtual_library_article_category_id = virtual_library_article_category_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
