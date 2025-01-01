import { Generated } from "kysely";

interface Project{
    id:Generated<number>;
    name:string;
    description:string|null;
    created_at:Date;
}

export interface Database{
    project: Project;
}