export class VirtualLibraryArticle {
  public id: string;
  public name_en: string;
  public name_ms: string;
  public description_en: string;
  public description_ms: string;
  public date: string;
  public status: boolean;
  public download_pdf_counter: number;
  public pdf_link: string;
  public virtual_library_article_category_id: any;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name_en: string,
    name_ms: string,
    description_en: string,
    description_ms: string,
    date: string,
    status: boolean,
    download_pdf_counter: number,
    pdf_link: string,
    virtual_library_article_category_id: any,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name_en = name_en;
    this.name_ms = name_ms;
    this.description_en = description_en;
    this.description_ms = description_ms;
    this.date = date;
    this.status = status;
    this.download_pdf_counter = download_pdf_counter;
    this.pdf_link = pdf_link;
    this.virtual_library_article_category_id = virtual_library_article_category_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
