# 배포 가이드 (초안)

## 환경

- AWS(EC2, S3) 또는 Vercel(프론트엔드)
- Node.js, MongoDB 환경

## 배포 절차

1. 코드 최신화(git pull)
2. 환경변수(.env) 설정
3. 의존성 설치(npm install)
4. 빌드 및 실행(npm run build, npm start)
5. 도메인 연결 및 SSL 적용(필요시)

## 주의사항

- 환경변수 노출 주의
- DB 백업 및 롤백 전략 마련
- 배포 후 주요 기능 정상 동작 확인
