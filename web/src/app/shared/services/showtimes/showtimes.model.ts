export class Showtime {
    public id: string
    public show_date: string
    public show_time: string
    public showing_id: string
    public venue_id: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        show_date: string,
        show_time: string,
        showing_id: string,
        venue_id: string,
        created_date: string,
        modified_date: string,
    ) {
        this.id = id
        this.show_date = show_date
        this.show_time = show_time
        this.showing_id = showing_id
        this.venue_id = venue_id
        this.created_date = created_date
        this.modified_date = modified_date
    }
}