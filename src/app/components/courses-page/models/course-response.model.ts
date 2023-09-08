import { CourseModel } from "./course.model";

export interface CourseResponseModel {
    ownedCourses: CourseModel[]
    allCourses: CourseModel[]
  }