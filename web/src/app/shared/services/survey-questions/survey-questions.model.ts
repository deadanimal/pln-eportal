export class SurveyQuestion {
    public id: string
    public question: string
    public survey_type: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        question: string,
        survey_type: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.question = question
        this.survey_type = survey_type
        this.created_date = created_date
        this.modified_date = modified_date
    }
}