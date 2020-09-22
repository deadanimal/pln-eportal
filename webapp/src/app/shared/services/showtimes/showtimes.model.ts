export class Showtime {
    public id: string
    public start_datetime: string
    public end_datetime: string
    public showing_id: string
    public venue_id: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        start_datetime: string,
        end_datetime: string,
        showing_id: string,
        venue_id: string,
        created_date: string,
        modified_date: string,
    ) {
        this.id = id
        this.start_datetime = start_datetime
        this.end_datetime = end_datetime
        this.showing_id = showing_id
        this.venue_id = venue_id
        this.created_date = created_date
        this.modified_date = modified_date
    }
}