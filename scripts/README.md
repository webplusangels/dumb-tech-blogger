# 3D 로고 정적 이미지 생성 방법

## 단계별 가이드

### 1. 스냅샷 생성 도구 열기

브라우저에서 다음 파일을 엽니다:

```
scripts/generate-logo-snapshot.html
```

또는 파일 경로를 브라우저 주소창에 드래그 앤 드롭하세요.

### 2. 로고 조정

- **Rotate Right/Left**: 로고를 좌우로 22.5도씩 회전
- **Reset View**: 초기 각도로 리셋

원하는 각도를 찾으세요 (정면이 좋습니다).

### 3. PNG 다운로드

"📷 Download PNG" 버튼을 클릭하면 `logo-static.png` 파일이 다운로드됩니다.

### 4. 파일 저장

다운로드한 `logo-static.png` 파일을 다음 위치에 저장:

```
quartz/static/logo-static.png
```

### 5. 빌드 및 확인

```bash
npx quartz build --serve
```

브라우저에서 페이지를 열면:

- **로딩 중**: `logo-static.png` (정지 이미지)가 표시됩니다
- **로드 완료**: 3D 애니메이션으로 부드럽게 전환됩니다
- **에러 발생**: `logo-static.png`가 유지됩니다

## 주의사항

- PNG는 투명 배경으로 저장됩니다
- 100x100 픽셀 크기로 렌더링됩니다
- 고해상도 디스플레이를 위해 2배 픽셀 밀도로 렌더링됩니다

## 문제 해결

### 모델이 로드되지 않음

- `logo.glb` 파일이 `quartz/static/` 폴더에 있는지 확인
- HTML 파일이 프로젝트 루트의 `scripts/` 폴더에 있는지 확인

### 이미지가 너무 어둡거나 밝음

- HTML 파일의 조명 설정을 수정:
  - `ambientLight` 밝기: 현재 1.2
  - `directionalLight1` 밝기: 현재 0.8
  - `directionalLight2` 밝기: 현재 0.4
