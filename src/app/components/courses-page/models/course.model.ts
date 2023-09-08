import { LessonModel } from "./lesson.model";

export interface CourseModel {
    id: number;
    title: string;
    description: string;
    lessons: LessonModel[];
  }
