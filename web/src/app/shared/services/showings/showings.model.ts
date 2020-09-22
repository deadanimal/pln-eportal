export class Showing {
    public id: string
    public title: string
    public description: string
    public genre: string
    public language: string
    public duration_hours: number
    public duration_minutes: number
    public poster_link: string
    public trailer_link: string
    public status: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        title: string,
        description: string,
        genre: string,
        language: string,
        duration_hours: number,
        duration_minutes: number,
        poster_link: string,
        trailer_link: string,
        status: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.genre = genre
        this.language = language
        this.duration_hours = duration_hours
        this.duration_minutes = duration_minutes
        this.poster_link = poster_link
        this.trailer_link = trailer_link
        this.status = status
        this.created_date = created_date
        this.modified_date = modified_date
    }
}