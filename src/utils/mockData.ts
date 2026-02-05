import { fakerKO as faker } from "@faker-js/faker";
import {
  JOB_ROLES,
  SITE_TYPES,
  SKILL_LEVELS,
  JOB_STATUSES,
  ATTENDANCE_STATUSES,
} from "./constants";

// types
export type JobStatus = "모집중" | "모집완료" | "작업중" | "작업완료";
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
  location: string;
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
    skill: faker.helpers.arrayElement([...SKILL_LEVELS]),
    attendanceStatus: faker.helpers.arrayElement([...ATTENDANCE_STATUSES]),
  }));
};

export const generateJobs = (count: number): Job[] => {
  return Array.from({ length: count }, () => {
    const required = faker.number.int({ min: 2, max: 20 });
    const assigned = faker.number.int({ min: 0, max: required });

    const siteName = `${faker.company
      .name()
      .slice(0, 2)}건설 ${faker.helpers.arrayElement([...SITE_TYPES])}`;

    return {
      id: faker.string.uuid(),
      siteName,
      role: faker.helpers.arrayElement([...JOB_ROLES]),
      location: `${faker.location.city()} ${faker.location.street()}`,
      status: faker.helpers.arrayElement([...JOB_STATUSES]),
      requiredCount: required,
      assignedCount: assigned,
      wage: faker.number.int({ min: 13, max: 25 }) * 10000,
      workers: createWorkers(assigned),
    };
  });
};
