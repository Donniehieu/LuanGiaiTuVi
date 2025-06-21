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
function anSaoTuVi(ngay_am, cucSo) {
    let quotient = Math.floor(ngay_am / cucSo);
    let remainder = ngay_am % cucSo;
    let startIdx = 1; // Dần = 1

    if (remainder === 0) {
        // Chia hết: từ Dần tiến thuận số bước = thương, Dần là 1
        let viTri = ((startIdx + quotient - 1) % 12);
        return viTri === 0 ? 12 : viTri;
    } else {
        let soMuon = cucSo - remainder;
        let ngayMuon = ngay_am + soMuon;
        let chiaHetIdx = ((startIdx + Math.floor(ngayMuon / cucSo) - 1) % 12);
        chiaHetIdx = chiaHetIdx === 0 ? 12 : chiaHetIdx;
        if (soMuon % 2 === 0) {
            // Số mượn chẵn: tiến thuận số bước = số mượn
            let viTri = ((chiaHetIdx + soMuon - 1) % 12) + 1;
            return viTri > 12 ? viTri - 12 : viTri;
        } else {
            // Số mượn lẻ: lùi nghịch số bước = số mượn
            let viTri = ((chiaHetIdx - soMuon - 1 + 12 * 2) % 12) + 1;
            return viTri > 12 ? viTri - 12 : viTri;
        }
    }
}
        // hàm xác định vị trí Thiên Phủ đối xứng Dần Thân với Tử Vi
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
const tuViThienPhuPairs = [
    ["Dần", "Dần"],
    ["Mão", "Sửu"],
    ["Thìn", "Tý"],
    ["Tỵ", "Hợi"],
    ["Ngọ", "Tuất"],
    ["Mùi", "Dậu"],
    ["Thân", "Thân"],
    ["Dậu", "Mùi"],
    ["Tuất", "Ngọ"],
    ["Hợi", "Tỵ"],
    ["Tý", "Thìn"],
    ["Sửu", "Mão"],
];

// cho idxTuVi là vị trí cung 1-12 (Dần=1,...,Sửu=12), tìm ra vị trí thiên phủ (1-12)
function viTriThienPhu(idxTuVi) {
    // CUNG_CELLS thứ tự Dần(1), Mão(2), ..., Sửu(12)
    const chiTuVi = CUNG_CELLS[idxTuVi - 1].chi;
    // Tìm cặp ứng chi
    for (const [chiTV, chiTP] of tuViThienPhuPairs) {
        if (chiTV === chiTuVi) {
            // Tìm idx Thiên Phủ
            return CUNG_CELLS.findIndex(c => c.chi === chiTP) + 1; // trả về 1-12
        }
    }
    // fallback
    return idxTuVi;
}

// hàm An các sao theo sao Thiên Phủ
function cacSaoTuThienPhu(idxThienPhu) {
    function tienCung(idx, soCung) {
        // idx: vị trí hiện tại (1-12)
        return ((idx + soCung - 1) % 12) + 1;
    }
    return {
        thienPhu: idxThienPhu,
        thaiAm: tienCung(idxThienPhu, 1),
        thamLang: tienCung(idxThienPhu, 2),
        cuMon: tienCung(idxThienPhu, 3),
        thienTuong: tienCung(idxThienPhu, 4),
        thienLuong: tienCung(idxThienPhu, 5),
        thatSat: tienCung(idxThienPhu, 6),
        phaQuan: tienCung(idxThienPhu, 10),
    };
}
function rendercacsaotheoThienPhu(saoTuThienPhu, CUNG_CELLS) {
    const tenSaoTP = {
        thienPhu: "Thiên Phủ",
        thaiAm: "Thái Âm",
        thamLang: "Tham Lang",
        cuMon: "Cự Môn",
        thienTuong: "Thiên Tướng",
        thienLuong: "Thiên Lương",
        thatSat: "Thất Sát",
        phaQuan: "Phá Quân"
    };

    // Map hành cho từng sao phụ tinh
    const HANH_SAO_PHU_TINH = {
        "Thiên Phủ": "hanh-tho", // Nếu không cần màu riêng thì để trống
        "Thái Âm": "hanh-thuy",
        "Tham Lang": "hanh-thuy",
        "Cự Môn": "hanh-thuy",
        "Thiên Tướng": "hanh-thuy",
        "Phá Quân": "hanh-thuy",
        "Thiên Lương": "hanh-moc",
        "Thất Sát": "hanh-kim"
    };

    const saoTrenCungTP = {};
    for (let i = 1; i <= 12; ++i) saoTrenCungTP[i] = [];
    for (const [k, v] of Object.entries(saoTuThienPhu)) {
        saoTrenCungTP[v].push(tenSaoTP[k]);
    }

    // Hiển thị lên từng cell
    for (let i = 0; i < 12; ++i) {
        const cellNum = CUNG_CELLS[i].cell;
        const cell = document.querySelector('.cell' + cellNum);
        if (cell) {
            // Xoá sao cũ nếu có
            let old = cell.querySelector('.phu-tinh-label');
            if (old) old.remove();

            // Thêm tên các sao phụ tinh (nếu có)
            if (saoTrenCungTP[i + 1].length > 0) {
                // Bọc từng sao trong <span class="...">
                const saoHTMLArr = saoTrenCungTP[i + 1].map(sao =>
                    `<div class="${HANH_SAO_PHU_TINH[sao] || ""}">${sao}</div>`
                );
                cell.insertAdjacentHTML('beforeend',
                    `<div class="phu-tinh-label chinh-tinh">
                                                                            ${saoHTMLArr.join(', ')}
                                                                        </div>`);
            }
        }
    }

}
