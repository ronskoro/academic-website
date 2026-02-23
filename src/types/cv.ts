export interface CVEntry {
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  details?: string[];
}

export interface CVSection {
  id: string;
  title: string;
  entries: CVEntry[];
}

export interface CVData {
  sections: CVSection[];
}
