export class VirtualLibraryESourceCategory {
  public id: string;
  public name: string;
  public icon: string;
  public status: boolean;
  public virtual_library_collection_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    icon: string,
    status: boolean,
    virtual_library_collection_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.status = status;
    this.virtual_library_collection_id = virtual_library_collection_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
