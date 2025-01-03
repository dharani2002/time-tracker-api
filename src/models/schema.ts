import { Generated } from "kysely";

interface Project{
    id:Generated<number>;
    name:string;
    description:string|null;
    created_at:Date;
}

interface Timelog{
    id:Generated<number>;
    project_id:number;
    hours:number;
    description:string|null;
    entry_date:Date;
    created_at:Generated<Date>;
}

export interface Database{
    project: Project;
    timelog:Timelog;
}