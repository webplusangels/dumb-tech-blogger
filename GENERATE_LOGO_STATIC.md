# 🎨 3D Logo Static Image 생성하기

## 현재 상태

현재 코드는 `/static/logo-static.png` 파일을 폴백 이미지로 사용하도록 설정되어 있습니다.

이 파일을 생성하려면 아래 단계를 따르세요.

---

## 📸 스냅샷 생성 방법

### 1단계: HTML 도구 열기

1. `scripts/generate-logo-snapshot.html` 파일을 브라우저에서 엽니다
2. 또는 파일을 브라우저 주소창에 드래그 앤 드롭

### 2단계: 3D 모델 확인

- 페이지가 자동으로 `quartz/static/logo.glb` 파일을 로드합니다
- 모델이 화면에 표시되는지 확인

### 3단계: 원하는 각도로 회전

버튼을 사용하여 원하는 각도를 찾으세요:

- **↻ Rotate Right**: 시계 방향 22.5° 회전
- **↺ Rotate Left**: 반시계 방향 22.5° 회전
- **🔄 Reset View**: 초기 각도로 리셋

💡 **추천**: 정면(기본 각도)이 가장 깔끔합니다

### 4단계: PNG 다운로드

1. **📷 Download PNG** 버튼 클릭
2. `logo-static.png` 파일이 다운로드됩니다

### 5단계: 파일 배치

다운로드한 파일을 다음 위치에 복사:

```
quartz/static/logo-static.png
```

### 6단계: 빌드 및 테스트

```bash
npx quartz build --serve
```

브라우저에서 http://localhost:8080 열기

---

## ✨ 작동 방식

### 로딩 시퀀스

1. **초기 로드**: `logo-static.png` 표시 (정지 이미지)
2. **Three.js 로딩**: 백그라운드에서 3D 모델 로드
3. **전환**: 3D 모델이 준비되면 0.5초 페이드 효과로 전환
4. **에러 시**: `logo-static.png` 계속 표시

### CSS 동작

```css
/* 초기 상태: 폴백 이미지만 보임 */
.page-title-3d-fallback {
  opacity: 1;
  z-index: 1;
}
.page-title-3d-canvas {
  opacity: 0;
  z-index: 2;
}

/* 로드 완료: 3D 캔버스가 페이드 인 */
.page-title-3d-canvas.loaded {
  opacity: 1;
}
.page-title-3d-fallback.hidden {
  opacity: 0;
}
```

---

## 🔧 고급 설정

### 이미지 품질 조정

`scripts/generate-logo-snapshot.html` 파일에서:

```javascript
// 더 높은 해상도 (현재: 2x)
renderer.setPixelRatio(window.devicePixelRatio * 3)

// 렌더링 크기 (현재: 100x100)
renderer.setSize(200, 200)
```

### 조명 조정

```javascript
// 전체 밝기
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2) // 0.8~1.5

// 주 조명
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8) // 0.5~1.0

// 보조 조명
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4) // 0.2~0.6
```

---

## ❓ 문제 해결

### 모델이 로드되지 않음

**증상**: "Error loading model" 메시지

**해결**:

- `quartz/static/logo.glb` 파일 존재 확인
- HTML 파일이 `scripts/` 폴더에 있는지 확인
- 브라우저 콘솔(F12)에서 에러 확인

### 이미지가 겹쳐 보임

**증상**: 정지 이미지와 3D 모델이 동시에 보임

**해결**:

- 브라우저 캐시 삭제 (Ctrl+Shift+R)
- `npx quartz build` 재실행
- `logo-static.png`가 투명 배경인지 확인

### PNG가 너무 작거나 흐림

**증상**: 고해상도 화면에서 이미지가 픽셀화됨

**해결**:

- `setPixelRatio` 값을 3 또는 4로 증가
- 원본 모델 크기 확인 (너무 작은 모델은 업스케일링 시 흐려짐)

---

## 📋 체크리스트

완료된 항목에 체크하세요:

- [ ] `scripts/generate-logo-snapshot.html` 브라우저에서 열기
- [ ] 3D 모델이 정상적으로 로드되는지 확인
- [ ] 원하는 각도로 회전 조정
- [ ] PNG 파일 다운로드
- [ ] `quartz/static/logo-static.png`에 저장
- [ ] `npx quartz build --serve` 실행
- [ ] 브라우저에서 로딩 → 3D 전환 확인
- [ ] 페이지 새로고침하여 겹침 없는지 확인

---

## 🎯 최종 결과

- ✅ **로딩 속도**: 즉시 로고 표시 (정지 이미지)
- ✅ **부드러운 전환**: 3D 로드 시 자연스러운 페이드
- ✅ **폴백 보장**: 3D 실패 시에도 로고 표시
- ✅ **겹침 방지**: z-index와 opacity로 완벽한 레이어 관리
