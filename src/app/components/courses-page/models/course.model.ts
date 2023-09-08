import { LessonModel } from "./lesson.model";

export interface CourseModel {
    id: string;
    title: string;
    description: string;
    lessons: LessonModel[];
  }
