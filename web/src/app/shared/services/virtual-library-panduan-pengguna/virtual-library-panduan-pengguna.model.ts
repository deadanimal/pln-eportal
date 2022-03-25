export class VirtualLibraryPanduanPengguna {
    public id: string;
    public status: boolean;
    public tajuk_dokumen: string;
    public pdf_link: string;
    public created_date: string;
  
    constructor(
      id: string,
      status: boolean,
      tajuk_dokumen: string,
      pdf_link: string,
      created_date: string,
    ) {
      this.id = id;
      this.status = status;
      this.tajuk_dokumen = tajuk_dokumen;
      this.pdf_link = pdf_link;
      this.created_date = created_date;
    }
  }
  