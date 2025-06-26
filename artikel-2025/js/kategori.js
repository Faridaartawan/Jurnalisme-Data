fetch("/artikel-2025/list-kategori.json")
  .then((res) => res.json())
  .then((data) => {
    const wrapper = document.getElementById("artikel-wrapper");
    const kategoriSet = new Set();

    data.forEach((item) => {
      const kategori = item.kategori.toLowerCase().replace(/\s+/g, "-");
      kategoriSet.add(kategori);

      const penulisGabung = item.penulis.join(", ");
      const slide = document.createElement("div");
      slide.className = `swiper-slide mix ${kategori}`;
      slide.innerHTML = `
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p><i class="bi bi-quote quote-icon"></i> ${item.content}</p>
            </div>
            <div class="testimonial-profile">
              <div class="rating"></div>
              <div class="profile-info">
                <div>
                  <h3><a href="${item.url}">${penulisGabung}</a></h3>
                  <h4>Penulis</h4>
                </div>
              </div>
            </div>
          </div>
        `;
      wrapper.appendChild(slide);
    });

    // Buat tombol filter kategori
    const tombolContainer = document.getElementById("kategori-buttons");
    tombolContainer.innerHTML = `<button class="btn btn-outline-secondary mx-1" data-filter="all">Semua</button>`;
    [...kategoriSet].sort().forEach((k) => {
      const btn = document.createElement("button");
      btn.className = "btn btn-outline-secondary mx-1";
      btn.setAttribute("data-filter", "." + k);
      btn.textContent = k
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      tombolContainer.appendChild(btn);
    });

    // Inisialisasi MixItUp
    mixitup("#artikel-wrapper", {
      selectors: { target: ".swiper-slide" },
      animation: { duration: 300 },
    });

    // Inisialisasi Swiper
    new Swiper(
      ".testimonials-slider",
      JSON.parse(document.querySelector(".swiper-config").textContent)
    );
  });
