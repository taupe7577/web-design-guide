# 웹 디자인 가이드

최신 웹 디자인 트렌드 3가지를, 트렌드마다 실제 동작하는 웹사이트 하나로 보여주는 정적 가이드입니다.

| 트렌드 | 데모 |
| --- | --- |
| 벤토 그리드 | `demos/bento` |
| 글래스모피즘 | `demos/glass` |
| 네오브루탈리즘 | `demos/brutalism` |

## 로컬에서 보기

```bash
python3 -m http.server 8000
```

http://localhost:8000 에서 확인합니다.

## 트렌드 추가하기

1. `demos/<slug>/index.html` 을 만든다 (단독으로 열리는 한 장짜리 페이지).
2. `assets/guide.js` 의 `TRENDS` 배열에 항목을 추가한다.

## 배포 (GitHub Pages)

`main` 브랜치에 push 하면 `.github/workflows/pages.yml` 이 자동 배포합니다.
처음 한 번만 저장소 **Settings → Pages → Source** 를 **GitHub Actions** 로 바꿔 주세요.
