# 웹 디자인 가이드

최신 웹 디자인 트렌드 3가지를, 트렌드마다 목적이 분명한 실제 사이트 하나로 보여주는 정적 가이드입니다.

| 트렌드 | 데모 사이트 | 목적 | 경로 |
| --- | --- | --- | --- |
| 벤토 그리드 | Fold, 업무 관리 서비스 소개 사이트 | 무료 체험 가입 유도 | `demos/bento` |
| 글래스모피즘 | Aura, 날씨와 음악을 함께 쓰는 웹앱 | 매일 열어 보는 개인 대시보드 | `demos/glass` |
| 네오브루탈리즘 | PUNCH FEST, 음악 페스티벌 공식 사이트 | 티켓 판매 | `demos/brutalism` |

## 로컬에서 보기

```bash
python3 -m http.server 8000
```

http://localhost:8000 에서 확인합니다.

## 트렌드 추가하기

1. `demos/<slug>/index.html`을 만듭니다. 단독으로 열리는 한 장짜리 페이지여야 합니다.
2. `assets/guide.js`의 `TRENDS` 배열에 항목을 추가합니다.

## 배포 (GitHub Pages)

`main` 브랜치에 push 하면 `.github/workflows/pages.yml` 이 자동 배포합니다.
처음 한 번만 저장소의 **Settings → Pages → Source**를 **GitHub Actions**로 변경합니다.
