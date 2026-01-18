# ⚡ High-Performance Rendering Grid

> **문제:** 대규모 데이터(10,000건 이상)가 포함된 관리자 그리드에서 **초기 렌더링 지연(Blocking)** 및 스크롤 버벅임 발생  
> **해결:** Windowing(Virtual Scroll) 기법을 도입하여 **렌더링 비용 99% 절감** 및 사용자 경험(UX) 개선

**기술 스택:** Vue 3 (Composition API), TypeScript, TanStack Virtual, Tailwind CSS, Vite

---

## 📊 성능 개선 성과 (Benchmark)

크롬 개발자 도구(Performance Tab) 측정 결과, **순수 렌더링 비용**을 획기적으로 단축했습니다.

| 측정 지표 | AS-IS (일반 렌더링) | TO-BE (가상 스크롤) | 개선율 |
|:---:|:---:|:---:|:---:|
| **Rendering** (레이아웃 계산) | **1,645 ms** | **11 ms** | **🔻 99.3% 감소** |
| **Painting** (픽셀 그리기) | **684 ms** | **39 ms** | **🔻 94.2% 감소** |
| **DOM 노드 수** | 10,000개 + α | 약 20개 (ViewPort 내) | **🔻 99.8% 감소** |
| **User Experience** | 초기 로딩 4초 멈춤 (Freezing) | 즉시 반응 (Non-blocking) | **쾌적** |

> **📉 [핵심 성과]**  
> 데이터 생성(Scripting) 시간을 제외한 **브라우저 렌더링 부하(Rendering + Painting)**를 **2,329ms → 50ms** 수준으로 최적화하여, 메인 스레드 차단(Blocking) 문제를 해결했습니다.

---

### 1️⃣ AS-IS (성능 저하)
![Image](https://github.com/user-attachments/assets/4584dde9-853c-4dd0-b05c-4812e32c9bca)
> **Total Blocking Time 발생:** 1만 개의 컴포넌트를 한 번에 그리느라 브라우저가 약 4초간 멈추며, 스크롤 시 심한 끊김(Jank) 현상이 발생합니다.

### 2️⃣ TO-BE (최적화 적용)
![Image](https://github.com/user-attachments/assets/0a4fe8f8-93b3-4585-8623-4328c0791f65)
> **Virtual Scroll 적용:** 화면에 보이는 영역(약 20개)만 렌더링하고, 스크롤 시 재활용하는 방식으로 **60fps 부드러운 스크롤**을 구현했습니다.

---

## 🎯 핵심 기술 구현

### 1. TanStack Virtual 기반 Windowing 구현
전체 데이터를 모두 그리지 않고, 사용자의 스크롤 위치에 따라 **보이는 영역(Viewport)만 계산하여 렌더링**합니다.

```vue
<!-- GridToBe.vue -->
<script setup>
const rowVirtualizer = useVirtualizer({
  count: jobs.value.length, // 전체 10,000개
  getScrollElement: () => parentRef.value,
  estimateSize: () => 140, // 아이템 예상 높이
  overscan: 5, // 스크롤 시 흰 화면 방지를 위한 여유분 렌더링
});
</script>

<template>
  <!-- 전체 스크롤 영역 높이 확보 -->
  <div :style="{ height: `${rowVirtualizer.getTotalSize()}px` }">
    <!-- 현재 보이는 아이템만 v-for 렌더링 -->
    <div v-for="virtualRow in rowVirtualizer.getVirtualItems()" ... >
      <JobCard :job="jobs[virtualRow.index]" />
    </div>
  </div>
</template>
```

### 2. 동적 높이 측정
각 행(Row) 내부에 아코디언(Collapse) 기능이 있어 높이가 가변적입니다. measureElement를 사용하여 펼쳐진 높이를 실시간으로 재계산하고, 자연스러운 스크롤 위치를 유지합니다.

```vue
<div
  :ref="(el) => rowVirtualizer.measureElement(el)" 
  ...
>
  <JobCard :job="jobs[virtualRow.index]" />
</div>
```