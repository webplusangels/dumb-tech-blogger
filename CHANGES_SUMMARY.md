# 변경 사항 요약

## ✅ 완료된 작업

### 1. 3D 로고 지원 추가 🎮

**기능**: GLTF/GLB 형식의 3D 모델을 로고로 사용 가능

- 자동 회전 애니메이션
- 조정 가능한 회전 속도
- Three.js를 통한 WebGL 렌더링
- 자동 크기 조정 및 중앙 정렬

**사용 방법**:

```typescript
Component.PageTitle({
  logo3d: "static/logo.glb",
  rotationSpeed: 15, // 초당 회전 각도
})
```

**지원 형식**:

- GLB (권장) - 바이너리, 압축
- GLTF - JSON 형식
- STL (변환 필요 → GLB)

### 2. 검색 기능을 왼쪽 사이드바로 이동 🔍

**변경 전**: 헤더에 검색창 배치
**변경 후**: 왼쪽 사이드바에 배치

**장점**:

- 전체 사이드바 너비 활용
- 헤더가 더 깔끔해짐
- 더 나은 검색 경험
- 모바일에서도 접근성 향상

**레이아웃**:

```
Header: [Logo/Title (중앙)] [Darkmode (오른쪽)]
Left Sidebar: [Search] [ReaderMode] [Explorer]
```

### 3. Footer 구조 개선 📄

**변경 전**:

```html
<div class="page-footer">
  <!-- afterBody components -->
</div>
<footer>
  <!-- footer content -->
</footer>
```

**변경 후**:

```html
<div class="page-footer">
  <!-- afterBody components -->
  <footer>
    <p>Created with Quartz</p>
    <ul>
      <li><a href="...">GitHub</a></li>
    </ul>
  </footer>
</div>
```

**개선 사항**:

- 올바른 HTML 시맨틱 구조
- Footer가 page-footer 내부에 중첩
- p와 ul 태그 정리
- 중앙 정렬 및 스타일링 개선

## 📁 수정된 파일

1. **quartz/components/PageTitle.tsx**
   - 3D 모델 지원 추가
   - Three.js 로더 통합
   - 회전 애니메이션 구현

2. **quartz.layout.ts**
   - 헤더에서 검색 제거
   - 왼쪽 사이드바에 검색 추가
   - 레이아웃 구성 재정렬

3. **quartz/components/renderPage.tsx**
   - Footer를 page-footer 안으로 이동
   - HTML 구조 개선

4. **quartz/components/styles/footer.scss**
   - 중앙 정렬
   - 간격 조정
   - 호버 효과 개선

5. **quartz/styles/custom.scss**
   - 헤더 스타일 간소화
   - 검색 사이드바 스타일 추가
   - Footer 스타일 업데이트

## 🎨 현재 레이아웃

```
┌─────────────────────────────────────┐
│     [Logo/3D Model]  [Darkmode]      │  ← Header
├──────────┬────────────┬──────────────┤
│ [Search] │            │              │
│ [Reader] │  Content   │  TOC         │  ← Grid
│ [Explorer]            │  Graph       │
│          │            │  Backlinks   │
├──────────┴────────────┴──────────────┤
│           Footer Content             │  ← Footer
└─────────────────────────────────────┘
```

## 📚 새로운 문서

1. **LAYOUT_CUSTOMIZATION.md** (업데이트)
   - 3D 로고 사용법 추가
   - 새로운 레이아웃 설명
   - 예제 및 스펙

2. **3D_LOGO_GUIDE.md** (신규)
   - 3D 모델 준비 가이드
   - 변환 도구 안내
   - 최적화 팁
   - 트러블슈팅

## 🚀 테스트 방법

1. **빌드 및 실행**:

   ```bash
   npx quartz build --serve
   ```

2. **확인 사항**:
   - ✅ 헤더가 깔끔하게 로고/타이틀 중앙 배치
   - ✅ 다크모드 토글이 오른쪽에 위치
   - ✅ 검색이 왼쪽 사이드바에 위치
   - ✅ Footer가 올바른 구조로 표시
   - ✅ 3D 로고 (설정 시) 회전 애니메이션

3. **3D 로고 테스트**:
   - GLB 파일을 `quartz/static/`에 추가
   - `quartz.layout.ts`에서 설정
   - 브라우저에서 확인

## 🎯 다음 단계 (선택사항)

### 3D 로고 사용하기:

1. **간단한 예제부터**:
   - 온라인에서 무료 GLB 모델 다운로드
   - Sketchfab, Poly Haven 등

2. **커스텀 모델**:
   - Blender로 제작
   - STL을 GLB로 변환
   - 최적화 (< 500KB 목표)

3. **설정 조정**:
   - 회전 속도 실험
   - 카메라 위치 조정 (필요시)

### 추가 커스터마이징:

- 헤더/푸터 색상 변경
- 사이드바 너비 조정
- 검색 스타일 커스터마이징
- 3D 로고 조명 조정

## 📝 참고사항

- 3D 로고는 최신 브라우저에서만 작동 (WebGL 지원)
- 파일 크기가 큰 3D 모델은 로딩 시간 증가
- 모바일에서도 잘 작동하도록 테스트 필요
- Three.js는 CDN에서 로드됨 (번들 크기 최소화)

## 🔄 되돌리기

### 2D 로고만 사용:

```typescript
Component.PageTitle({ logo: "static/logo.png" })
```

### 텍스트 타이틀로 복귀:

```typescript
Component.PageTitle() // 옵션 없음
```

### 검색을 헤더로 복귀 (원하는 경우):

`quartz.layout.ts`에서 다시 헤더 배열에 추가
