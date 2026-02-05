import type { AttendanceStatus, JobStatus } from "./mockData";

// 근무 상태 레이블
export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  APPLIED: "지원완료",
  ON_DUTY: "출근완료",
  OFF_DUTY: "퇴근완료",
  NO_SHOW: "무단결근",
};

// 직종
export const JOB_ROLES = [
  "보통인부",
  "신호수",
  "할석공",
  "조적공",
  "미장공",
  "용접공",
  "배관공",
] as const;

// 현장 타입
export const SITE_TYPES = [
  "재건축",
  "리모델링",
  "주상복합",
  "지식산업센터",
  "물류센터",
] as const;

// 근로자 스킬 레벨
export const SKILL_LEVELS = ["초급", "중급", "고급", "반장"] as const;

// 작업 상태
export const JOB_STATUSES: JobStatus[] = [
  "모집중",
  "모집완료",
  "작업중",
  "작업완료",
];

// 근무 상태 목록
export const ATTENDANCE_STATUSES: AttendanceStatus[] = [
  "APPLIED",
  "ON_DUTY",
  "OFF_DUTY",
  "NO_SHOW",
];
