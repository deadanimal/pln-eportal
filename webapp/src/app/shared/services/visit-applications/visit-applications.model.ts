export class VisitApplication {
    public id: string
    public title: string
    public description: string
    public organisation_name: string
    public organisation_category: string
    public start_datetime: string
    public end_datetime: string
    public total_participant: number
    public customer_id: string
    public pic_id: string
    public status: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        title: string,
        description: string,
        organisation_name: string,
        organisation_category: string,
        start_datetime: string,
        end_datetime: string,
        total_participant: number,
        customer_id: string,
        pic_id: string,
        status: string,
        created_date: string,
        modified_date: string,
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.organisation_name = organisation_name
        this.organisation_category = organisation_category
        this.start_datetime = start_datetime
        this.end_datetime = end_datetime
        this.total_participant = total_participant
        this.customer_id = customer_id
        this.pic_id = pic_id
        this.status = status
        this.created_date = created_date
        this.modified_date = modified_date
    }
}