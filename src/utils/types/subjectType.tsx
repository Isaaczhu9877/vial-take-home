export type Subject = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  diagnosisDate: string;
  status: "Active" | "Inactive";
};

export interface TableCols {
  id: string;
  name: string;
  age: string;
  gender: string;
  diagnosisDate: string;
  status: string;
}
