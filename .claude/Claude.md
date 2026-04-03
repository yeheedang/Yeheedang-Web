# CLAUDE.md - Yehidang

## 주제
예히당이라는 한국 전통 디저트 카페의 웹사이트 개설.
- 이미지, 데이터는 파일시스템을 활용해서 json 파일과 이미지파일을 서버 내부에 보관하는 형식.
- 메뉴 추가, 삭제, 글 편집등 관리자 페이지 필요

## 필요페이지
- 랜딩(메인)페이지
- 메뉴 페이지

## SKILLS 
@/.claude/Skill 폴더에 Skill 들을 적재 적소에 활용

## 디자인 시스템
@/Docs/Design.md 를 기준

## 코드 작성 규칙
- **절대 모킹하기 않기**: 실제 동작하는 코드만 작성
- - **네이밍 규칙**: 기능을 명확히 나타내는 이름 사용
- **라이브러리** : 라이브러리의 경우 최신 버전 지향
- **Feature Driven 지향**: Feature Driven Architecture 를 지향하여 코드를 작성
- **너무 긴 코드 금지**: 코드가 과도하게 길어질 경우 Component 단위로 나누어가며 코딩할것
- **Magic anything 금지**: Magic Number 등을 금지

## 요청사항
- CSS : @emotion 을 사용 
- HTTP : 필요시 axios 를 사용
- Store : 필요시 Zustand 사용