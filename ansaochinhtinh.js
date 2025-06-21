const TEN_SAO_CHINH_THEO_TUVI = {
    tuVi: "Tử Vi",
    thienCo: "Thiên Cơ",
    thaiDuong: "Thái Dương",
    vuKhuc: "Vũ Khúc",
    thienDong: "Thiên Đồng",
    liemTrinh: "Liêm Trinh"
};
// hàm tính lùi cung
function luiCung(idx, soCung) {
    // idx: vị trí hiện tại (1-12), soCung: số cung lùi
    return ((idx - soCung - 1 + 12) % 12) + 1;
}

// Tính vị trí các sao chính tinh dựa vào vị trí Tử Vi
function getChinhTinhFromTuVi(idxTuVi) {
    // idxTuVi: 1-12
    // lùi cung (ngược kim đồng hồ): ((idxTuVi - soCung - 1 + 12) % 12) + 1
    function luiCung(idx, soCung) {
        return ((idx - soCung - 1 + 12) % 12) + 1;
    }
    return {
        tuVi: idxTuVi,
        thienCo: luiCung(idxTuVi, 1),
        thaiDuong: luiCung(idxTuVi, 3),
        vuKhuc: luiCung(idxTuVi, 4),
        thienDong: luiCung(idxTuVi, 5),
        liemTrinh: luiCung(idxTuVi, 8),
    };
}
function displayChinhTinhOnLaSo(idxTuVi) {
    // Lấy vị trí từng sao
    const pos = getChinhTinhFromTuVi(idxTuVi); // {tuVi:..., thienCo:..., ...}

    // Định nghĩa màu hành cho từng sao
    const SAO_HANH = {
        "Tử Vi": "hanh-tho",
        "Thiên Cơ": "hanh-moc",
        "Thái Dương": "hanh-hoa",
        "Vũ Khúc": "hanh-kim",
        "Thiên Đồng": "hanh-thuy",
        "Liêm Trinh": "hanh-hoa"
    };

    // Tạo map cung - danh sách sao
    const saoTrenCung = {};
    for (let i = 1; i <= 12; ++i) saoTrenCung[i] = [];
    for (const [k, v] of Object.entries(pos)) {
        saoTrenCung[v].push(TEN_SAO_CHINH_THEO_TUVI[k]);
    }

    // Hiển thị lên từng cell trong bàn lá số (theo CUNG_CELLS)
    for (let i = 0; i < 12; ++i) {
        const cellNum = CUNG_CELLS[i].cell;
        const cell = document.querySelector('.cell' + cellNum);
        if (cell) {
            // Xoá sao cũ nếu có
            let old = cell.querySelector('.chinh-tinh-label');
            if (old) old.remove();

            // Thêm tên các sao chính tinh (nếu có)
            if (saoTrenCung[i + 1].length > 0) {
                const chinhTinhDiv = document.createElement('div');
                chinhTinhDiv.className = 'chinh-tinh-label';
                chinhTinhDiv.classList.add('chinh-tinh');

                // Tạo span với class hành tương ứng cho từng sao
                const saoHTMLArr = saoTrenCung[i + 1].map(sao => {
                    return `<div class="${SAO_HANH[sao] || ''}">${sao}</div>`;
                });

                chinhTinhDiv.innerHTML = saoHTMLArr.join(', ');
                cell.appendChild(chinhTinhDiv);
            }
        }
    }
}
