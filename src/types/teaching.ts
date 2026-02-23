export interface Course {
  code: string;
  title: string;
  semester: string;
  year: number;
  institution: string;
  role: "Instructor" | "Teaching Assistant" | "Guest Lecturer" | "Co-Instructor";
  description?: string;
  courseUrl?: string;
  materialsUrl?: string;
}

export interface Advisee {
  name: string;
  degree: "PhD" | "Masters" | "Undergraduate";
  thesisTitle?: string;
  year?: string;
  currentPosition?: string;
}
