import { fakerKO as faker } from "@faker-js/faker";

// types
export type JobStatus = "RECRUITING" | "FULL" | "IN_PROGRESS" | "DONE";
export type AttendanceStatus = "APPLIED" | "ON_DUTY" | "OFF_DUTY" | "NO_SHOW";

export interface Worker {
  id: string;
  name: string;
  skill: string;
  attendanceStatus: AttendanceStatus;
}

export interface Job {
  id: string;
  siteName: string;
  role: string;
  status: JobStatus;
  requiredCount: number;
  assignedCount: number;
  wage: number;
  workers: Worker[];
}

// data generator
const createWorkers = (count: number): Worker[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    skill: faker.helpers.arrayElement(["초급", "중급", "고급", "반장"]),
    attendanceStatus: faker.helpers.arrayElement([
      "APPLIED",
      "ON_DUTY",
      "OFF_DUTY",
      "NO_SHOW",
    ]),
  }));
};

export const generateJobs = (count: number): Job[] => {
  const roles = [
    "보통인부",
    "신호수",
    "할석공",
    "조적공",
    "미장공",
    "용접공",
    "배관공",
  ];
  const sitePrefixes = [
    "잠실",
    "반포",
    "둔촌",
    "한남",
    "압구정",
    "성수",
    "마곡",
  ];
  const siteSuffixes = [
    "재건축",
    "리모델링",
    "주상복합",
    "지식산업센터",
    "물류센터",
  ];

  return Array.from({ length: count }, () => {
    const required = faker.number.int({ min: 2, max: 20 });
    const assigned = faker.number.int({ min: 0, max: required });

    const siteName = `${faker.helpers.arrayElement(
      sitePrefixes
    )} ${faker.company.name().slice(0, 2)}건설 ${faker.helpers.arrayElement(
      siteSuffixes
    )}`;

    return {
      id: faker.string.uuid(),
      siteName,
      role: faker.helpers.arrayElement(roles),
      status: assigned >= required ? "FULL" : "RECRUITING",
      requiredCount: required,
      assignedCount: assigned,
      wage: faker.number.int({ min: 13, max: 25 }) * 10000,
      workers: createWorkers(assigned),
    };
  });
};
