# Coding Test Platform

Next.js와 TypeScript로 구축된 코딩 테스트 플랫폼입니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Emotion (CSS-in-JS)
- **Package Manager**: Yarn

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   ├── problems/          # 문제 관련 페이지
│   │   ├── page.tsx       # 문제 목록
│   │   └── [id]/         # 문제 상세 페이지
│   └── globals.css        # 전역 스타일
├── components/            # 재사용 가능한 컴포넌트
│   ├── CodeEditor.tsx    # 코드 에디터
│   ├── ProblemCard.tsx   # 문제 카드
│   ├── Navbar.tsx        # 네비게이션 바
│   └── index.ts          # 컴포넌트 export
├── api/                   # API 함수
│   ├── problems.ts       # 문제 관련 API
│   └── submissions.ts    # 제출 관련 API
└── types/                 # TypeScript 타입 정의
    ├── problem.ts
    ├── user.ts
    └── index.ts
```

## 시작하기

### 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
yarn build
```

### 프로덕션 실행

```bash
yarn start
```

## 주요 기능

- ✅ 문제 목록 페이지
- ✅ 문제 상세 페이지
- ✅ 코드 에디터 (다중 언어 지원)
- ✅ 코드 실행 및 테스트
- ✅ 코드 제출
- ✅ 반응형 디자인
- ✅ Emotion을 사용한 스타일링

## 다음 단계

- [ ] 실제 코드 실행 엔진 통합
- [ ] 사용자 인증 시스템
- [ ] 제출 기록 페이지
- [ ] 랭킹 시스템
- [ ] 문제 검색 및 필터링
- [ ] 다크 모드 지원
