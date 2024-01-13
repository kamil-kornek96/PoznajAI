import { CourseModel } from "./course.model";

export interface UserCoursesModel {
    ownedCourses: CourseModel[]
    allCourses: CourseModel[]
  }