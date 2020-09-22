export class SurveyAnswer {
    public id: string
    public answer: string
    public question_id: string
    public customer_id: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        answer: string,
        question_id: string,
        customer_id: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.answer = answer
        this.question_id = question_id
        this.customer_id = customer_id
        this.created_date = created_date
        this.modified_date = modified_date
    }
}