# 메모 CRUD 기능 문서

## 목적

- 사용자가 아이디어를 빠르게 기록, 조회, 수정, 삭제할 수 있도록 지원

## 요구사항

- 메모 생성, 조회, 수정, 삭제 기능 제공
- 각 메모는 텍스트, 생성일, 수정일, 태그(선택)를 포함

## 동작 흐름

1. 메모 생성: 입력 폼에서 텍스트 작성 후 저장
2. 메모 조회: 메모 리스트에서 전체/개별 메모 확인
3. 메모 수정: 기존 메모 선택 후 내용 변경 및 저장
4. 메모 삭제: 메모 선택 후 삭제 버튼 클릭

## 예외 처리

- 빈 내용 저장 불가
- 삭제 시 확인 메시지 표시

## UI/UX 고려사항

- 최소 클릭/탭으로 동작
- 실시간 저장 또는 저장 버튼 제공
