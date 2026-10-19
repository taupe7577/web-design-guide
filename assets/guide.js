// 트렌드 데이터. 데모를 추가하려면 여기에 항목을 넣고 demos/<slug>/index.html 을 만들면 된다.
const TRENDS = [
  {
    slug: 'bento',
    name: '벤토 그리드',
    summary: '크기가 다른 둥근 카드를 격자로 촘촘히 배치해 여러 정보를 한 화면에 보여줍니다.',
    tags: ['CSS Grid', 'Canvas 차트', '스포트라이트'],
    when: 'SaaS 소개, 기능 요약, 대시보드형 랜딩처럼 전달할 정보의 종류가 많은 화면에 적합합니다.',
    site: { name: 'Fold', kind: '업무 관리 서비스 소개 사이트', goal: '무료 체험 가입 유도', parts: ['벤토 그리드 히어로', '체험용 칸반 보드', '월간·연간 요금제 전환', '고객 후기와 FAQ', '이메일 가입 폼'] },
    tech: ['grid-template-areas로 칸 배치', 'Canvas 그라데이션 메시와 실시간 차트', '마우스를 따라 움직이는 스포트라이트와 3D 틸트', '타이머 링, 궤도, 타자기 효과 등 카드별 마이크로 모션', '스크롤하면 나타나는 섹션과 올라가는 지표 숫자'],
    caution: '칸이 많으면 시선이 분산되므로 6~8칸 이내로 구성하고, 가장 중요한 정보를 가장 큰 칸에 배치합니다.'
  },
  {
    slug: 'glass',
    name: '글래스모피즘',
    summary: '반투명 유리판과 배경 블러로 깊이감을 표현합니다. 애플의 Liquid Glass 이후 널리 쓰이게 되었습니다.',
    tags: ['backdrop-filter', 'Canvas 파티클', '시각화'],
    when: '음악, 날씨, 핀테크 앱처럼 배경 색이 풍부하고 가벼운 인상이 필요한 화면에 적합합니다.',
    site: { name: 'Aura', kind: '날씨와 음악을 함께 쓰는 웹앱', goal: '매일 열어 보는 개인 대시보드', parts: ['오늘 날씨와 시간별 예보', '주간 예보', '도시 검색과 즐겨찾기', '날씨별 플레이리스트', '°C/°F 전환'] },
    tech: ['backdrop-filter: blur() saturate()', 'Canvas로 배경에 흐르는 색 덩어리 구현 (마우스에 반응)', '비, 눈, 햇살 파티클과 오디오 비주얼라이저', '도시를 바꾸면 배경 색, 숫자, 플레이리스트가 함께 바뀜', '마우스를 따라 움직이는 빛 반사 하이라이트'],
    caution: '배경이 밝거나 복잡하면 글자를 읽기 어렵습니다. 글자 대비를 반드시 확인하고, 필터를 지원하지 않는 환경을 위해 불투명한 대체색을 지정합니다.'
  },
  {
    slug: 'brutalism',
    name: '네오브루탈리즘',
    summary: '굵은 검정 테두리, 원색, 블러 없는 그림자로 의도적으로 거칠고 직설적인 인상을 만듭니다.',
    tags: ['굵은 테두리', 'Canvas 하프톤', '드래그 인터랙션'],
    when: '크리에이터, 스타트업, 이벤트처럼 개성과 에너지를 강하게 드러내야 하는 경우에 적합합니다.',
    site: { name: 'PUNCH FEST', kind: '음악 페스티벌 공식 사이트', goal: '티켓 판매', parts: ['요일별 라인업과 타임테이블', '티켓 수량 선택과 합계', '예매 정보 입력과 입장권 발급', '행사장 지도와 오시는 길', 'FAQ와 소식 구독'] },
    tech: ['border: 3px solid #000과 블러 없는 오프셋 그림자', 'Canvas 하프톤 점이 마우스 주변에서 커지는 효과', '슬램 인 등장, 글자 튀어오름, 화면 흔들림', '드래그 스티커, 컨페티, 팔레트 룰렛', '예매 창과 입장권 QR 모양까지 이어지는 구매 흐름'],
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
let px = 0, py = 0, hoverGate = null, quietUntil = 0;
document.addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; }, { passive: true });
// 시트·뷰어가 열려 있거나 막 닫힌 직후에는 재생하지 않는다 (포커스 복원, 레이아웃 변화로 생기는 가짜 이벤트 차단)
const quiet = () => detail.open || viewer.open || performance.now() < quietUntil;
const pauseThumbs = () => document.querySelectorAll('.thumb, .mini').forEach(t => send(t, 'pause'));
function settleThumbs() {
  quietUntil = performance.now() + 400; hoverGate = { x: px, y: py };   // 닫은 자리에서 마우스가 실제로 움직여야 호버로 인정한다
  pauseThumbs(); requestAnimationFrame(pauseThumbs);
}
document.addEventListener('pointerover', e => {
  const el = preview(e); if (!el || el.contains(e.relatedTarget) || quiet()) return;
  if (hoverGate) { if (Math.hypot(e.clientX - hoverGate.x, e.clientY - hoverGate.y) < 6) return; hoverGate = null; }
  send(el, 'play');
});
document.addEventListener('pointerout', e => { const el = preview(e); if (el && !el.contains(e.relatedTarget)) send(el, 'pause'); });
// 키보드로 포커스한 경우에만 재생한다. 마우스로 누른 버튼에 포커스가 복원되는 것은 호버가 아니다.
document.addEventListener('focusin', e => { const el = preview(e); if (el && !quiet() && e.target.matches(':focus-visible')) send(el, 'play'); });
document.addEventListener('focusout', e => { const el = preview(e); if (el) send(el, 'pause'); });

// iframe 은 location.replace 로 이동한다. src 를 바꾸면 뒤로가기 기록이 쌓여, 뒤로가기가 페이지 대신 iframe 만 되돌린다.
function navFrame(f, src) {
  const abs = new URL(src, location.href).href;
  try { f.contentWindow.location.replace(abs); } catch { f.src = abs; }
}
// 모달은 열 때 기록을 한 칸 쌓는다. 뒤로가기가 모달을 닫게 하려고 현재 상태를 기록에서 읽는다.
const mode = () => (history.state && history.state.m) || null;

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
  navFrame(frame, url(t));
  viewer.showModal();
  history.pushState({ m: 'viewer' }, '', '#' + t.slug);
  syncHero();   // 뷰어가 열려 있는 동안 뒤쪽 히어로는 멈춘다
}
document.querySelector('.seg').addEventListener('click', e => { if (e.target.dataset.w) setWidth(e.target.dataset.w); });
// 닫는 코드에서 직접 정리하고, Esc 로 닫힌 경우는 close 이벤트로도 정리한다 (두 번 불려도 안전)
function cleanupViewer() { navFrame(frame, 'about:blank'); syncHero(); }
// 기록에 쌓인 항목이 있으면 뒤로가기로 닫아서 기록과 화면을 맞춘다 (실제 닫기는 popstate 에서 처리)
function closeViewer() { if (mode() === 'viewer') history.back(); else { viewer.close(); cleanupViewer(); } }
$('v-close').onclick = closeViewer;
viewer.addEventListener('cancel', e => { e.preventDefault(); closeViewer(); });   // Esc
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
        <dt>데모 사이트</dt><dd>${esc(t.site.name)} · ${esc(t.site.kind)}</dd>
        <dt>사이트 목적</dt><dd>${esc(t.site.goal)}</dd>
      </dl>
    </div>
    <h3>데모 사이트 구성</h3>
    <div>${t.site.parts.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div>
    <h3>핵심 기법</h3>
    <ol class="tech">${t.tech.map((x, n) => `<li><b>${n + 1}</b><span>${esc(x)}</span></li>`).join('')}</ol>
    <div class="warn"><strong>유의 사항</strong><p>${esc(t.caution)}</p></div>
    <h3>다른 트렌드</h3>
    <div class="more">${TRENDS.map((o, j) => j === i ? '' : `
      <button class="mini" data-go="${j}">
        <span class="mini-prev" data-fit><iframe src="${still(o)}" title="${esc(o.name)} 미리보기" tabindex="-1"></iframe></span>
        <span class="mini-name">${esc(o.name)}</span>
      </button>`).join('')}</div>`;
  navFrame(dFrame, url(t) + '?thumb');   // 시트의 히어로는 계속 재생하되 경량 모드로 돌린다
  document.querySelectorAll('.thumb').forEach(th => send(th, 'pause'));   // 뒤쪽 카드는 확실히 멈춘다
  const wasOpen = detail.open;
  if (!wasOpen) { detail.showModal(); document.body.style.overflow = 'hidden'; }
  detail.scrollTop = 0;
  // 처음 열 때만 기록을 쌓고, 다른 트렌드로 넘어갈 때는 같은 항목을 바꾼다 (뒤로가기 한 번이면 닫힌다)
  if (wasOpen) history.replaceState({ m: 'detail' }, '', '#' + t.slug); else history.pushState({ m: 'detail' }, '', '#' + t.slug);
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
  navFrame(dFrame, 'about:blank'); $('d-body').innerHTML = ''; document.body.style.overflow = '';
  if (mode()) history.replaceState(null, '', location.pathname);   // 기록이 어긋난 채 닫힌 경우만 정리한다
  settleThumbs();   // 닫힌 뒤 카드가 재생 상태로 남지 않게 한다
}
function closeDetail() { settleThumbs(); if (mode()) history.back(); else { detail.close(); cleanupDetail(); } }
detail.addEventListener('cancel', e => { if (viewer.open) return; e.preventDefault(); closeDetail(); });   // Esc
detail.addEventListener('close', cleanupDetail);
// 뒤로가기/앞으로가기: 기록 상태에 맞춰 뷰어와 시트를 닫는다
addEventListener('popstate', () => {
  const m = mode();
  if (m !== 'viewer' && viewer.open) { viewer.close(); cleanupViewer(); }
  if (!m && detail.open) { detail.close(); cleanupDetail(); }
  else if (m && !detail.open) history.replaceState(null, '', location.pathname);   // 닫힌 상태에서 앞으로가기 한 경우
});

// 히어로는 시트가 열려 있고, 뷰어가 닫혀 있고, 화면에 보일 때만 재생한다
const heroEl = document.querySelector('.hero-prev');
let heroVisible = true;
function syncHero() { send(heroEl, detail.open && !viewer.open && heroVisible ? 'play' : 'pause'); }
new IntersectionObserver(es => { heroVisible = es[0].isIntersecting; syncHero(); }, { root: detail, threshold: .12 }).observe(heroEl);
dFrame.addEventListener('load', syncHero);

// 공유 링크(#bento 등)로 들어오면 상세 시트를 바로 연다
const first = TRENDS.findIndex(t => '#' + t.slug === location.hash);
if (first >= 0) { history.replaceState(null, '', location.pathname); openDetail(first); }   // 해시를 정리해 둬야 뒤로가기가 깔끔하게 닫는다
