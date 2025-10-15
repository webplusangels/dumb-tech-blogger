# 3D Logo 트러블슈팅 가이드

## 현재 적용된 수정사항

### ✅ 완료된 작업

1. **ReaderMode 버튼 제거** - 왼쪽 사이드바에서 제거됨
2. **Graph View 제거** - 오른쪽 사이드바에서 제거됨
3. **GLTF 로더 개선** - 디버깅 로그 추가 및 로더 경로 수정
4. **Center 영역 확대** - 사이드바 320px → 260px, 컬럼 간격 5px → 15px
5. **Center 패딩 추가** - 좌우 2rem 패딩으로 읽기 편한 여백 확보

## 3D 로고가 안 보일 때 확인사항

### 1. 브라우저 콘솔 확인 (F12)

브라우저 개발자 도구(F12)를 열고 Console 탭에서 다음 메시지를 확인하세요:

**정상적인 경우**:

```
3D Logo: Loading model from static/logo.gltf
3D Logo: Loaded script https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js
3D Logo: Loaded script https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js
3D Logo: THREE.js loaded successfully
3D Logo: Starting to load model...
3D Logo: Loading progress 100.00%
3D Logo: Model loaded successfully
3D Logo: Model added to scene
3D Logo: Animation started
```

**문제가 있는 경우의 에러 메시지**:

#### A. 파일을 찾을 수 없음

```
3D Logo: Error loading 3D model
GET http://localhost:8080/static/logo.gltf 404 (Not Found)
```

**해결방법**:

1. 파일 위치 확인: `quartz/static/logo.gltf` 또는 `logo.glb`
2. 파일명 확인: 대소문자 구분 (logo.gltf ≠ logo.GLTF)
3. 설정 확인: `quartz.layout.ts`에서 `logo3d: "static/logo.gltf"` 확인

#### B. Three.js 로딩 실패

```
3D Logo: Failed to load script
```

**해결방법**:

- 인터넷 연결 확인
- 방화벽/광고 차단기가 CDN을 차단하는지 확인
- 다른 브라우저에서 테스트

#### C. GLTFLoader 로딩 실패

```
3D Logo: GLTFLoader not found
```

**해결방법**:

- 최신 Three.js 버전과 호환되지 않을 수 있음
- PageTitle.tsx의 스크립트가 올바르게 수정되었는지 확인

### 2. 파일 경로 확인

**올바른 파일 구조**:

```
quartz/
  static/
    logo.gltf  ← 여기에 파일이 있어야 함
    logo.glb   ← 또는 GLB 형식
    icon.png
content/
quartz.layout.ts
```

**설정 파일** (`quartz.layout.ts`):

```typescript
Component.PageTitle({
  logo3d: "static/logo.gltf", // 경로가 정확한지 확인
  rotationSpeed: 10,
})
```

### 3. 파일 형식 확인

#### GLTF vs GLB

- **GLTF** (.gltf): JSON 형식, 외부 파일 참조 가능
- **GLB** (.glb): 바이너리 형식, 모든 것이 하나의 파일에 포함됨 (권장)

#### GLB가 더 나은 이유:

- 단일 파일로 관리 용이
- 더 작은 파일 크기
- 로딩 속도 빠름
- 텍스처/재질이 포함됨

**GLB로 변환**:

1. Blender에서: File → Export → glTF 2.0 → Format: GLB 선택
2. 온라인 변환: https://products.aspose.app/3d/conversion/gltf-to-glb

### 4. 파일 크기 확인

**권장 크기**: 500KB 이하
**최대 크기**: 2MB 이하

파일이 너무 크면:

- 로딩 시간 증가
- 브라우저 성능 저하
- 모바일에서 문제 발생 가능

**최적화 방법**:

```bash
# glTF-Transform으로 최적화
npm install -g @gltf-transform/cli
gltf-transform optimize input.glb output.glb --compress
```

### 5. 모델 검증

#### 온라인 뷰어로 테스트:

1. https://gltf.report/ - 파일 업로드하여 확인
2. https://sandbox.babylonjs.com/ - 3D 뷰어
3. https://gltf-viewer.donmccurdy.com/ - GLTF 전용 뷰어

#### 확인사항:

- ✅ 파일이 제대로 열리는가?
- ✅ 모델이 보이는가?
- ✅ 텍스처/색상이 있는가?
- ✅ 파일 크기가 적절한가?

### 6. 일반적인 문제와 해결책

#### 문제: 캔버스가 보이지만 모델이 안 보임

**원인**: 모델이 너무 크거나, 카메라 위치 문제
**해결**:

- Blender에서 모델 크기 조정
- 카메라 거리 조정 (PageTitle.tsx의 `camera.position.z` 값 변경)

#### 문제: 모델이 검은색으로 보임

**원인**: 조명 부족 또는 재질 문제
**해결**:

- Blender에서 재질에 Base Color 설정
- 메탈릭/러프니스 값 조정
- 텍스처가 포함되어 있는지 확인

#### 문제: 모델이 회전하지 않음

**원인**: 로딩 실패 또는 애니메이션 루프 문제
**해결**:

- 콘솔에서 "Model added to scene" 메시지 확인
- 브라우저 새로고침 (Ctrl+F5)

#### 문제: 모바일에서 안 보임

**원인**: WebGL 지원 부족 또는 파일 크기
**해결**:

- 파일 크기 최소화 (< 500KB)
- 더 간단한 모델 사용
- WebGL 지원 확인 (https://get.webgl.org/)

### 7. 대체 방법

3D 로고가 계속 작동하지 않는다면:

#### A. 2D 이미지 로고 사용

```typescript
Component.PageTitle({
  logo: "static/logo.png",
})
```

#### B. 텍스트 타이틀 사용

```typescript
Component.PageTitle() // 옵션 없음
```

#### C. SVG 애니메이션 사용

- CSS 애니메이션으로 회전 효과
- 더 가벼운 파일 크기
- 더 나은 브라우저 호환성

### 8. 성공적인 예제

#### 간단한 회전 큐브 (테스트용)

1. Blender 열기
2. 기본 큐브 선택
3. File → Export → glTF 2.0
4. Format: GLB, Include: Selected Objects
5. `quartz/static/logo.glb`로 저장
6. 빌드 및 테스트

#### 로고 3D 변환

1. 2D 로고를 SVG로 준비
2. Blender에서 SVG 임포트
3. Curve를 Mesh로 변환
4. Solidify modifier로 두께 추가
5. 심플한 재질 적용
6. GLB로 내보내기

### 9. 디버깅 체크리스트

- [ ] 파일이 `quartz/static/` 폴더에 있는가?
- [ ] 파일명이 `quartz.layout.ts`의 설정과 일치하는가?
- [ ] 브라우저 콘솔에 에러가 있는가?
- [ ] 파일이 온라인 뷰어에서 열리는가?
- [ ] 파일 크기가 2MB 이하인가?
- [ ] WebGL이 브라우저에서 지원되는가?
- [ ] 캐시를 클리어하고 강력 새로고침 했는가? (Ctrl+Shift+R)
- [ ] 다른 브라우저에서도 테스트했는가?

### 10. 추가 도움

여전히 작동하지 않는다면:

1. **콘솔 로그 전체 복사**: F12 → Console → 모든 메시지 복사
2. **파일 정보 확인**:
   - 파일 크기
   - 파일 형식 (GLTF/GLB)
   - 어디서 얻었는지
3. **브라우저 정보**: 어떤 브라우저와 버전인지
4. **스크린샷**: 문제가 발생한 화면

## 현재 레이아웃 변경사항

### Center 영역 확대

- **이전**: 사이드바 320px + Center + 사이드바 320px
- **이후**: 사이드바 260px + Center (넓어짐) + 사이드바 260px
- **간격**: 5px → 15px
- **패딩**: Center에 좌우 2rem 추가

### 제거된 컴포넌트

- ❌ ReaderMode 버튼 (왼쪽 사이드바)
- ❌ Graph View (오른쪽 사이드바)

### 남은 컴포넌트

- ✅ Search (왼쪽 사이드바)
- ✅ Explorer (왼쪽 사이드바)
- ✅ Table of Contents (오른쪽 사이드바, 데스크톱만)
- ✅ Backlinks (오른쪽 사이드바)
