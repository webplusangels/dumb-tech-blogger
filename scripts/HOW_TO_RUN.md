# 3D Logo Snapshot Generator 실행 방법

## CORS 에러 해결

로컬 파일을 브라우저에서 직접 열면 CORS 정책으로 인해 GLB 파일을 로드할 수 없습니다.
로컬 HTTP 서버를 실행해야 합니다.

## 방법 1: Python 서버 (권장)

### 터미널에서 실행:

```bash
python -m http.server 8888
```

### 브라우저에서 열기:

```
http://localhost:8888/scripts/generate-logo-snapshot.html
```

## 방법 2: Node.js serve 패키지

### 터미널에서 실행:

```bash
npx serve -p 8888
```

### 브라우저에서 열기:

```
http://localhost:8888/scripts/generate-logo-snapshot.html
```

## 방법 3: VS Code Live Server 확장

1. VS Code에서 "Live Server" 확장 설치
2. `generate-logo-snapshot.html` 파일을 우클릭
3. "Open with Live Server" 선택

## 사용 방법

1. 위 방법 중 하나로 서버 시작
2. 브라우저에서 해당 주소 열기
3. 3D 모델이 자동으로 로드됩니다
4. 원하는 각도로 회전
5. "📷 Download PNG" 클릭
6. 다운로드된 `logo-static.png`를 `quartz/static/` 폴더에 저장

## 문제 해결

### Port 8888이 이미 사용 중인 경우

다른 포트 사용:

```bash
python -m http.server 9999
# 브라우저: http://localhost:9999/scripts/generate-logo-snapshot.html
```

### Python이 없는 경우

Node.js serve 사용:

```bash
npx serve -p 8888
```

### 여전히 에러가 발생하는 경우

브라우저 콘솔(F12)에서 정확한 에러 메시지를 확인하고,
파일 경로가 올바른지 확인하세요:

- `quartz/static/logo.glb` 파일이 존재하는지 확인
- 서버가 프로젝트 루트에서 실행되고 있는지 확인
