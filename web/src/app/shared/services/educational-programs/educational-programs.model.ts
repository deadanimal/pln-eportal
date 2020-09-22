export class EducationalProgram {
    public id: string
    public title: string
    public description: string
    public program_type: string
    public min_participant: number
    public max_participant: number
    public price: number
    public start_datetime: string
    public end_datetime: string
    public poster_link: string
    public venue_id: string
    public coordinator_id: string
    public status: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        title: string,
        description: string,
        program_type: string,
        min_participant: number,
        max_participant: number,
        price: number,
        start_datetime: string,
        end_datetime: string,
        poster_link: string,
        venue_id: string,
        coordinator_id: string,
        status: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.program_type = program_type
        this.min_participant = min_participant
        this.max_participant = max_participant
        this.price = price
        this.start_datetime = start_datetime
        this.end_datetime = end_datetime
        this.poster_link = poster_link
        this.venue_id = venue_id
        this.coordinator_id = coordinator_id
        this.status = status
        this.created_date = created_date
        this.modified_date = modified_date
    }
}