export class VirtualLibrarySerialpublication {
  public id: string;
  public title_en: string;
  public title_ms: string;
  public description_en: string;
  public description_ms: string;
  public call_number: string;
  public author: string;
  public author_added: string;
  public editor: string;
  public isbn: string;
  public issn: string;
  public year: string;
  public publisher_name: string;
  public published_date: string;
  public notes: string;
  public status: boolean;
  public download_pdf_counter: number;
  public image_link: string;
  public pdf_link: string;
  public virtual_library_collection_id: any;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title_en: string,
    title_ms: string,
    description_en: string,
    description_ms: string,
    call_number: string,
    author: string,
    author_added: string,
    editor: string,
    isbn: string,
    issn: string,
    year: string,
    publisher_name: string,
    published_date: string,
    notes: string,
    status: boolean,
    download_pdf_counter: number,
    image_link: string,
    pdf_link: string,
    virtual_library_collection_id: any,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title_en = title_en;
    this.title_ms = title_ms;
    this.description_en = description_en;
    this.description_ms = description_ms;
    this.call_number = call_number;
    this.author = author;
    this.author_added = author_added;
    this.editor = editor;
    this.isbn = isbn;
    this.issn = issn;
    this.year = year;
    this.publisher_name = publisher_name;
    this.published_date = published_date;
    this.notes = notes;
    this.status = status;
    this.download_pdf_counter = download_pdf_counter;
    this.image_link = image_link;
    this.pdf_link = pdf_link;
    this.virtual_library_collection_id = virtual_library_collection_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
