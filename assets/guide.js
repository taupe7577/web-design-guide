// 트렌드 데이터. 데모를 추가하려면 여기에 항목을 넣고 demos/<slug>/index.html 을 만들면 된다.
const TRENDS = [
  {
    slug: 'bento',
    name: '벤토 그리드',
    summary: '크기가 다른 둥근 카드를 격자로 촘촘히 배치해 여러 정보를 한 화면에 보여줍니다.',
    tags: ['CSS Grid', 'Canvas 차트', '스포트라이트'],
    when: 'SaaS 소개, 기능 요약, 대시보드형 랜딩처럼 전달할 정보의 종류가 많은 화면에 적합합니다. 데모는 생산성 앱 랜딩 페이지입니다.',
    tech: ['grid-template-areas로 칸 배치', 'Canvas 그라데이션 메시와 실시간 차트', '마우스를 따라 움직이는 스포트라이트와 3D 틸트', '타이머 링, 궤도, 타자기 효과 등 카드별 마이크로 모션', '카드 하나에 메시지 하나만 담는 구성'],
    caution: '칸이 많으면 시선이 분산되므로 6~8칸 이내로 구성하고, 가장 중요한 정보를 가장 큰 칸에 배치합니다.'
  },
  {
    slug: 'glass',
    name: '글래스모피즘',
    summary: '반투명 유리판과 배경 블러로 깊이감을 표현합니다. 애플의 Liquid Glass 이후 널리 쓰이게 되었습니다.',
    tags: ['backdrop-filter', 'Canvas 파티클', '시각화'],
    when: '음악, 날씨, 핀테크 앱처럼 배경 색이 풍부하고 가벼운 인상이 필요한 화면에 적합합니다. 데모는 날씨와 음악 앱입니다.',
    tech: ['backdrop-filter: blur() saturate()', 'Canvas로 배경에 흐르는 색 덩어리 구현 (마우스에 반응)', '비, 눈, 햇살 파티클과 오디오 비주얼라이저', '날씨 전환 시 색상과 숫자를 부드럽게 보간', '마우스를 따라 움직이는 빛 반사 하이라이트'],
    caution: '배경이 밝거나 복잡하면 글자를 읽기 어렵습니다. 글자 대비를 반드시 확인하고, 필터를 지원하지 않는 환경을 위해 불투명한 대체색을 지정합니다.'
  },
  {
    slug: 'brutalism',
    name: '네오브루탈리즘',
    summary: '굵은 검정 테두리, 원색, 블러 없는 그림자로 의도적으로 거칠고 직설적인 인상을 만듭니다.',
    tags: ['굵은 테두리', 'Canvas 하프톤', '드래그 인터랙션'],
    when: '크리에이터, 스타트업, 이벤트처럼 개성과 에너지를 강하게 드러내야 하는 경우에 적합합니다. 데모는 음악 페스티벌 사이트입니다.',
    tech: ['border: 3px solid #000과 블러 없는 오프셋 그림자', 'Canvas 하프톤 점이 마우스 주변에서 커지는 효과', '슬램 인 등장, 글자 튀어오름, 화면 흔들림', '드래그 스티커, 컨페티, 팔레트 룰렛, 낙서장'],
    caution: '모든 요소를 거칠게 처리하면 사용자가 쉽게 피로해집니다. 대비가 강한 만큼 정보 위계는 더 엄격하게 설계합니다.'
  }
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const url = t => `demos/${t.slug}/index.html`;
// 미리보기는 경량 모드(30fps, 해상도 1)로 불러온다. still 은 첫 장면에서 멈춰 있다가 마우스를 올릴 때만 움직인다.
const still = t => url(t) + '?thumb=still';

const cards = document.getElementById('cards');
cards.innerHTML = TRENDS.map((t, i) => `
  <article class="card">
    <button class="thumb" data-fit data-i="${i}" aria-label="${esc(t.name)} 상세 보기">
      <iframe data-src="${still(t)}" title="${esc(t.name)} 미리보기" tabindex="-1" loading="lazy"></iframe>
    </button>
    <div class="meta">
      <span class="no">TREND ${String(i + 1).padStart(2, '0')}</span>
      <h2>${esc(t.name)}</h2>
      <p>${esc(t.summary)}</p>
      <div class="tags">${t.tags.map(x => `<span>${esc(x)}</span>`).join('')}</div>
    </div>
  </article>`).join('');

// 미리보기: 1440px 폭으로 렌더한 뒤 [data-fit] 요소 폭에 맞춰 축소한다. (카드 썸네일, 상세 시트 상단, 추천 카드 공용)
function fitAll() {
  document.querySelectorAll('[data-fit]').forEach(el => {
    const w = el.clientWidth;
    if (w) el.querySelector('iframe').style.transform = `scale(${w / 1440})`;
  });
}
fitAll();
addEventListener('resize', fitAll);

// 화면에 들어올 때만 iframe 을 불러와 초기 로딩을 가볍게 한다.
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { const f = e.target.querySelector('iframe'); f.src = f.dataset.src; io.unobserve(e.target); }
}), { rootMargin: '200px' });
document.querySelectorAll('.thumb').forEach(t => io.observe(t));

// 미리보기 재생 제어: 마우스를 올린(또는 포커스된) 하나만 움직인다
const send = (el, demo) => { const f = el.querySelector('iframe'); if (f && f.contentWindow) f.contentWindow.postMessage({ demo }, '*'); };
const preview = e => e.target.closest('.thumb, .mini');
document.addEventListener('pointerover', e => { const el = preview(e); if (el && !el.contains(e.relatedTarget)) send(el, 'play'); });
document.addEventListener('pointerout', e => { const el = preview(e); if (el && !el.contains(e.relatedTarget)) send(el, 'pause'); });
document.addEventListener('focusin', e => { const el = preview(e); if (el) send(el, 'play'); });
document.addEventListener('focusout', e => { const el = preview(e); if (el) send(el, 'pause'); });

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
    <h3>개요</h3><p>${esc(t.summary)}</p>
    <h3>적합한 상황</h3><p>${esc(t.when)}</p>
    <h3>핵심 기법</h3><ul>${t.tech.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <h3>유의 사항</h3><p>${esc(t.caution)}</p>`;
  setWidth('100%');
  frame.src = url(t);
  viewer.showModal();
  syncHero();   // 뷰어가 열려 있는 동안 뒤쪽 히어로는 멈춘다
}
document.querySelector('.seg').addEventListener('click', e => { if (e.target.dataset.w) setWidth(e.target.dataset.w); });
// 닫는 코드에서 직접 정리하고, Esc 로 닫힌 경우는 close 이벤트로도 정리한다 (두 번 불려도 안전)
function cleanupViewer() { frame.src = 'about:blank'; syncHero(); }
$('v-close').onclick = () => { viewer.close(); cleanupViewer(); };
viewer.addEventListener('close', cleanupViewer);

// 상세 시트 (OTT 스타일): 위에는 살아 있는 페이지 미리보기, 아래에는 디자인 설명
const detail = $('detail'), dFrame = $('d-frame');
let cur = 0;
function openDetail(i) {
  const t = TRENDS[cur = i];
  $('d-cap').innerHTML = `
    <span class="no">TREND ${String(i + 1).padStart(2, '0')}</span>
    <h2>${esc(t.name)}</h2>
    <div class="acts">
      <button class="go" data-act="play">▶ 데모 체험하기</button>
      <a class="ghost" href="${url(t)}" target="_blank" rel="noopener">새 탭으로 열기 ↗</a>
    </div>`;
  $('d-body').innerHTML = `
    <div class="d-grid">
      <div>
        <p class="d-sum">${esc(t.summary)}</p>
        <h3>적합한 상황</h3><p>${esc(t.when)}</p>
      </div>
      <dl>
        <dt>키워드</dt><dd>${t.tags.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</dd>
        <dt>핵심 기법</dt><dd>${t.tech.length}가지</dd>
      </dl>
    </div>
    <h3>핵심 기법</h3>
    <ol class="tech">${t.tech.map((x, n) => `<li><b>${n + 1}</b><span>${esc(x)}</span></li>`).join('')}</ol>
    <div class="warn"><strong>유의 사항</strong><p>${esc(t.caution)}</p></div>
    <h3>다른 트렌드</h3>
    <div class="more">${TRENDS.map((o, j) => j === i ? '' : `
      <button class="mini" data-go="${j}">
        <span class="mini-prev" data-fit><iframe src="${still(o)}" title="${esc(o.name)} 미리보기" tabindex="-1"></iframe></span>
        <span class="mini-name">${esc(o.name)}</span>
      </button>`).join('')}</div>`;
  dFrame.src = url(t) + '?thumb';   // 시트의 히어로는 계속 재생하되 경량 모드로 돌린다
  document.querySelectorAll('.thumb').forEach(th => send(th, 'pause'));   // 뒤쪽 카드는 확실히 멈춘다
  if (!detail.open) { detail.showModal(); document.body.style.overflow = 'hidden'; }
  detail.scrollTop = 0;
  history.replaceState(null, '', '#' + t.slug);
  fitAll();
}
cards.addEventListener('click', e => { const c = e.target.closest('.card'); if (c) openDetail([...cards.children].indexOf(c)); });
detail.addEventListener('click', e => {
  if (e.target === detail || e.target.closest('#d-close')) return closeDetail();   // 바깥 어두운 영역을 눌러도 닫힌다
  if (e.target.closest('[data-act="play"]')) return openViewer(cur);
  const m = e.target.closest('[data-go]'); if (m) openDetail(+m.dataset.go);
});
// 닫으면 히어로와 '다른 트렌드' 미리보기 iframe 을 모두 제거해 메모리와 타이머를 돌려준다
function cleanupDetail() {
  dFrame.src = 'about:blank'; $('d-body').innerHTML = ''; document.body.style.overflow = '';
  history.replaceState(null, '', location.pathname);
}
function closeDetail() { detail.close(); cleanupDetail(); }
detail.addEventListener('close', cleanupDetail);

// 히어로는 시트가 열려 있고, 뷰어가 닫혀 있고, 화면에 보일 때만 재생한다
const heroEl = document.querySelector('.hero-prev');
let heroVisible = true;
function syncHero() { send(heroEl, detail.open && !viewer.open && heroVisible ? 'play' : 'pause'); }
new IntersectionObserver(es => { heroVisible = es[0].isIntersecting; syncHero(); }, { root: detail, threshold: .12 }).observe(heroEl);
dFrame.addEventListener('load', syncHero);

// 공유 링크(#bento 등)로 들어오면 상세 시트를 바로 연다
const first = TRENDS.findIndex(t => '#' + t.slug === location.hash);
if (first >= 0) openDetail(first);
