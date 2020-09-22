export class FacilityBooking {
    public id: string
    public title: string
    public start_datetime: string
    public end_datetime: string
    public customer_id: string
    public pic_id: string
    public facility_id: string
    public status: string
    public created_date: string
    public modified_date: string

    constuctor(
        id: string,
        title: string,
        start_datetime: string,
        end_datetime: string,
        customer_id: string,
        pic_id: string,
        facility_id: string,
        status: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.title = title
        this.start_datetime = start_datetime
        this.end_datetime = end_datetime
        this.customer_id = customer_id
        this.pic_id = pic_id
        this.facility_id = facility_id
        this.status = status
        this.created_date = created_date
        this.modified_date = modified_date
    }
}
