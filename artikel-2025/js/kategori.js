fetch('/artikel-2025/list-kategori.json')
  .then(res => res.json())
  .then(data => {
    const wrapper = document.getElementById('mix-faq');
    const kategoriSet = new Set();

    data.forEach((item, index) => {
      const kategori = item.kategori.toLowerCase().replace(/\s+/g, '-');
      kategoriSet.add(kategori);

      const penulisGabung = item.penulis.join(', ');

      const div = document.createElement('div');
      div.className = `faq-item mix ${kategori}`;
      div.setAttribute('data-order', item.title.toLowerCase());     // untuk sort judul
      div.setAttribute('data-kategori', kategori);                  // untuk sort kategori

      div.innerHTML = `
        <h3>${String(index + 1).padStart(2, '0')} ${item.title}</h3>
        <div class="faq-content">
          <p>Penulis: ${penulisGabung}</p>
          <p>${item.content}</p>
          <a href="${item.url}" class="btn btn-sm btn-outline-success mt-2">Baca Selengkapnya</a>
        </div>
      `;

      wrapper.appendChild(div);
    });

    // Buat tombol filter kategori dinamis
    const tombolKategori = document.getElementById('kategori-buttons');
    tombolKategori.innerHTML = `<button class="btn btn-outline-secondary mx-1" data-filter="all">Semua</button>`;
    [...kategoriSet].sort().forEach(k => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-secondary mx-1';
      btn.setAttribute('data-filter', '.' + k);
      btn.textContent = k.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      tombolKategori.appendChild(btn);
    });

    // Inisialisasi MixItUp
    mixitup('#mix-faq', {
      selectors: { target: '.mix' },
      animation: { duration: 300 }
    });
  })
  .catch(err => {
    console.error("Gagal memuat data:", err);
  });