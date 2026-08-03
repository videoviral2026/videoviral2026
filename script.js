/* ============================================================
   SCRIPT.JS
   - Merender galeri video dari VIDEOS (lihat videos.js)
     TANPA mengubah urutan: video paling atas di array = paling
     baru = tampil pertama.
   - Mengubah link Google Drive biasa menjadi link embed player.
   - Memasang banner iklan format atOptions di dalam iframe
     terisolasi (agar beberapa banner tidak saling bentrok,
     karena semuanya memakai nama variabel global yang sama).
   ============================================================ */

function driveIdFromLink(link) {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/
  ];
  for (const p of patterns) {
    const m = link.match(p);
    if (m) return m[1];
  }
  return null;
}

function driveEmbedUrl(link) {
  const id = driveIdFromLink(link);
  if (!id) return null;
  return `https://drive.google.com/file/d/${id}/preview`;
}

function driveThumbUrl(link) {
  const id = driveIdFromLink(link);
  if (!id) return null;
  // Thumbnail publik bawaan Google Drive. w800 = lebar 800px.
  return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
}

function renderGallery() {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty-state');
  grid.innerHTML = '';

  if (!Array.isArray(VIDEOS) || VIDEOS.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  VIDEOS.forEach((v, index) => {
    const card = document.createElement('article');
    card.className = 'card' + (index === 0 ? ' badge-new' : '');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Putar ' + v.judul);

    const thumbUrl = driveThumbUrl(v.drive);
    const epNum = (index + 1).toString().padStart(2, '0');

    card.innerHTML = `
      <div class="thumb">
        ${thumbUrl
          ? `<img src="${thumbUrl}" alt="" loading="lazy"
               onerror="this.remove(); this.parentElement.querySelector('.ep').style.display='block';">`
          : ''}
        <span class="ep" style="${thumbUrl ? 'display:none;' : ''}">${epNum}</span>
        <div class="play"></div>
        ${v.durasi ? `<span class="duration mono">${v.durasi}</span>` : ''}
      </div>
      <div class="meta">
        <div class="eyebrow">${v.episode || 'EPISODE'}</div>
        <div class="title">${v.judul}</div>
      </div>
    `;

    const open = () => openModal(v);
    card.addEventListener('click', open);
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') open();
    });

    grid.appendChild(card);

    // Slot iklan disisipkan setelah tiap video — hanya tampil di
    // layar HP (lihat CSS .infeed-ad), supaya di mobile iklan
    // tersebar di antara video, bukan menumpuk di bawah halaman.
    const infeedAd = document.createElement('div');
    infeedAd.className = 'ad-slot infeed-ad';
    infeedAd.innerHTML = `<span class="ad-label">Iklan</span><div data-ad="ad-320x50"></div>`;
    grid.appendChild(infeedAd);

    // Setelah 1 baris penuh (4 video) selesai, sisipkan baris berisi
    // 2 iklan — khusus tampil di layar tablet/laptop (lihat CSS
    // .row-ad). Tidak dobel dengan mobile karena row-ad disembunyikan
    // di layar HP.
    if ((index + 1) % 4 === 0) {
      const rowAd = document.createElement('div');
      rowAd.className = 'row-ad';
      rowAd.innerHTML = `
        <div class="ad-slot ad-300">
          <span class="ad-label">Iklan</span>
          <div data-ad="ad-300x250"></div>
        </div>
        <div class="ad-slot ad-300">
          <span class="ad-label">Iklan</span>
          <div data-ad="ad-300x250"></div>
        </div>
      `;
      grid.appendChild(rowAd);
    }
  });
}

function openModal(video) {
  const overlay = document.getElementById('modal-overlay');
  const titleEl = document.getElementById('modal-title');
  const durEl = document.getElementById('modal-duration');
  const playerWrap = document.getElementById('player-wrap');

  titleEl.textContent = video.judul;
  durEl.textContent = video.durasi ? `Durasi ${video.durasi}` : '';

  const embed = driveEmbedUrl(video.drive);
  if (embed) {
    playerWrap.innerHTML = `<iframe src="${embed}" allow="autoplay" allowfullscreen></iframe>`;
  } else {
    playerWrap.innerHTML = `<div style="color:#a89f9a;padding:24px;font-size:0.85rem;">
      Link Google Drive belum valid. Periksa kembali link di videos.js.
    </div>`;
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('player-wrap').innerHTML = '';
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  mountBanners();
});

/* ------------------------------------------------------------
   Iklan banner (atOptions) — tiap banner dipasang di dalam
   iframe terisolasi supaya key/format tidak saling menimpa.
   ------------------------------------------------------------ */
const BANNER_ADS = {
  'ad-300x250': { key: '5b2832545c4b904c6907a8c98445a073', w: 300, h: 250 },
  'ad-320x50':  { key: '04c4d9d26a0cf977638d004491b9a422', w: 320, h: 50 },
  'ad-728x90':  { key: 'a95ca926dcf8854e275511fb2545a135', w: 728, h: 90 },
  'ad-160x300': { key: '89ebac334a8b1a19fb5b4f779442e3a9', w: 160, h: 300 },
  'ad-160x600': { key: 'ab801be7c59f2cf06b99cd5d573cf7c0', w: 160, h: 600 },
  'ad-468x60':  { key: 'c8f66a6c1817158fc44d495b4f013d46', w: 468, h: 60 }
};

function mountBanners() {
  Object.entries(BANNER_ADS).forEach(([slotId, cfg]) => {
    document.querySelectorAll(`[data-ad="${slotId}"]`).forEach((slot) => {
      const iframe = document.createElement('iframe');
      iframe.title = 'advertisement';
      iframe.style.border = '0';
      iframe.style.width = cfg.w + 'px';
      iframe.style.height = cfg.h + 'px';
      iframe.scrolling = 'no';
      iframe.srcdoc = `<!doctype html><html><body style="margin:0;">
        <script>
          atOptions = {
            'key' : '${cfg.key}',
            'format' : 'iframe',
            'height' : ${cfg.h},
            'width' : ${cfg.w},
            'params' : {}
          };
        <\/script>
        <script src="https://www.highperformanceformat.com/${cfg.key}/invoke.js"><\/script>
      </body></html>`;
      slot.appendChild(iframe);
    });
  });
}
