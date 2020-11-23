export class VirtualLibraryBook {
  public id: string;
  public title: string;
  public description: string;
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
  public status: string;
  public image_link: string;
  public pdf_link: string;
  public virtual_library_collection_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title: string,
    description: string,
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
    status: string,
    image_link: string,
    pdf_link: string,
    virtual_library_collection_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
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
    this.image_link = image_link;
    this.pdf_link = pdf_link;
    this.virtual_library_collection_id = virtual_library_collection_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
