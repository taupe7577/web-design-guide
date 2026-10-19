// 트렌드 데이터. 데모를 추가하려면 여기에 항목을 넣고 demos/<slug>/index.html 을 만들면 된다.
const TRENDS = [
  {
    slug: 'bento',
    name: '벤토 그리드',
    summary: '크기가 다른 둥근 카드를 도시락 칸처럼 촘촘히 배치해 정보를 한눈에 보여준다.',
    tags: ['CSS Grid', 'Canvas 차트', '스포트라이트'],
    when: 'SaaS 소개, 기능 요약, 대시보드형 랜딩처럼 정보 종류가 여럿일 때. (데모: 생산성 앱 랜딩)',
    tech: ['grid-template-areas 로 칸 배치', 'Canvas 그라데이션 메시 + 실시간 차트', '마우스 따라 움직이는 스포트라이트와 3D 틸트', '타이머 링·궤도·타자기 등 카드별 마이크로 모션', '카드마다 하나의 메시지만'],
    caution: '칸이 많으면 시선이 흩어진다. 6~8칸 이내, 가장 중요한 칸을 가장 크게.'
  },
  {
    slug: 'glass',
    name: '글래스모피즘',
    summary: '반투명 유리판과 배경 블러로 깊이감을 만든다. 애플의 Liquid Glass가 대중화시켰다.',
    tags: ['backdrop-filter', 'Canvas 파티클', '시각화'],
    when: '음악·날씨·핀테크 앱처럼 배경에 색이 풍부하고 가벼운 인상을 줄 때. (데모: 날씨+음악 앱)',
    tech: ['backdrop-filter: blur() saturate()', 'Canvas 로 뒤에서 흐르는 색 덩어리 (마우스에 반응)', '비·눈·햇살 파티클, 오디오 비주얼라이저', '날씨 전환 시 색과 숫자가 부드럽게 보간', '마우스를 따라가는 빛 반사 하이라이트'],
    caution: '배경이 밝거나 복잡하면 글자가 안 읽힌다. 글자 대비를 꼭 확인하고, 필터 미지원 환경용 불투명 대체색을 둔다.'
  },
  {
    slug: 'brutalism',
    name: '네오브루탈리즘',
    summary: '굵은 검정 테두리, 원색, 딱딱한 그림자로 일부러 거칠고 솔직하게 보이게 한다.',
    tags: ['굵은 테두리', 'Canvas 하프톤', '드래그 인터랙션'],
    when: '크리에이터·스타트업·이벤트처럼 개성과 에너지를 강하게 드러내야 할 때. (데모: 음악 페스티벌)',
    tech: ['border: 3px solid #000 + 블러 없는 오프셋 그림자', 'Canvas 하프톤 점이 마우스 주변에서 커짐', '슬램 인 등장, 글자 튀기, 화면 흔들림', '드래그 스티커, 컨페티, 팔레트 룰렛, 낙서장'],
    caution: '모든 요소를 거칠게 하면 피곤하다. 대비가 큰 만큼 정보 위계는 더 엄격하게 잡는다.'
  }
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const url = t => `demos/${t.slug}/index.html`;

const cards = document.getElementById('cards');
cards.innerHTML = TRENDS.map((t, i) => `
  <article class="card">
    <button class="thumb" data-i="${i}" aria-label="${esc(t.name)} 데모 크게 보기">
      <iframe data-src="${url(t)}" title="${esc(t.name)} 미리보기" tabindex="-1" loading="lazy"></iframe>
    </button>
    <div class="meta">
      <span class="no">TREND ${String(i + 1).padStart(2, '0')}</span>
      <h2>${esc(t.name)}</h2>
      <p>${esc(t.summary)}</p>
      <div class="tags">${t.tags.map(x => `<span>${esc(x)}</span>`).join('')}</div>
    </div>
  </article>`).join('');

// 썸네일: 1440px 폭으로 렌더한 뒤 카드 폭에 맞춰 축소한다.
function fitThumbs() {
  document.querySelectorAll('.thumb').forEach(th => {
    th.querySelector('iframe').style.transform = `scale(${th.clientWidth / 1440})`;
  });
}
fitThumbs();
addEventListener('resize', fitThumbs);

// 화면에 들어올 때만 iframe 을 불러와 초기 로딩을 가볍게 한다.
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { const f = e.target.querySelector('iframe'); f.src = f.dataset.src; io.unobserve(e.target); }
}), { rootMargin: '200px' });
document.querySelectorAll('.thumb').forEach(t => io.observe(t));

// 뷰어
const $ = id => document.getElementById(id);
const viewer = $('viewer'), frame = $('v-frame');
function setWidth(w) {
  frame.style.width = w;
  document.querySelectorAll('.seg button').forEach(b => b.classList.toggle('on', b.dataset.w === w));
}
function openViewer(i) {
  const t = TRENDS[i];
  $('v-title').textContent = t.name;
  $('v-open').href = url(t);
  $('v-info').innerHTML = `
    <h3>한 줄 설명</h3><p>${esc(t.summary)}</p>
    <h3>언제 쓰나</h3><p>${esc(t.when)}</p>
    <h3>핵심 기법</h3><ul>${t.tech.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <h3>주의할 점</h3><p>${esc(t.caution)}</p>`;
  setWidth('100%');
  frame.src = url(t);
  viewer.showModal();
  history.replaceState(null, '', '#' + t.slug);
}
cards.addEventListener('click', e => { const b = e.target.closest('.thumb'); if (b) openViewer(+b.dataset.i); });
document.querySelector('.seg').addEventListener('click', e => { if (e.target.dataset.w) setWidth(e.target.dataset.w); });
$('v-close').onclick = () => viewer.close();
viewer.addEventListener('close', () => { frame.src = 'about:blank'; history.replaceState(null, '', location.pathname); });

// 공유 링크(#bento 등)로 들어오면 바로 열기
const first = TRENDS.findIndex(t => '#' + t.slug === location.hash);
if (first >= 0) openViewer(first);
