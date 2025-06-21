const TEN_CUNG_FULL = [
    "Mệnh", "Phụ Mẫu", "Phúc Đức", "Điền Trạch",
    "Quan Lộc", "Nô Bộc", "Thiên Di", "Tật Ách",
    "Tài Bạch", "Tử Tức", "Phu Thê", "Huynh Đệ"
];
// ------ Định nghĩa mệnh 60 hoa giáp ------

// Mapping chuẩn 12 cung ngoài Bắc phái (theo cell HTML và chi)
const CUNG_CELLS = [
    { cell: 13, chi: "Dần" },
    { cell: 9, chi: "Mão" },
    { cell: 5, chi: "Thìn" },
    { cell: 1, chi: "Tỵ" },
    { cell: 2, chi: "Ngọ" },
    { cell: 3, chi: "Mùi" },
    { cell: 4, chi: "Thân" },
    { cell: 8, chi: "Dậu" },
    { cell: 12, chi: "Tuất" },
    { cell: 16, chi: "Hợi" },
    { cell: 15, chi: "Tý" },
    { cell: 14, chi: "Sửu" }
];
// Chi 12 con giáp thứ tự
const CHI12 = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// Hàm xác định cell cung mệnh (chuẩn Bắc phái)
function getMenhCell(thang_am, gio_chi) {
    let thangIdx = (thang_am - 1) % 12; // Tháng Giêng index 0 (Dần)
    let gioIdx = CHI12.indexOf(gio_chi); // Tỵ = 5
    let menhIdx = (thangIdx - gioIdx + 12) % 12;
    IDCungMenh = menhIdx;
    let obj = CUNG_CELLS[menhIdx];

    return obj; // {cell: xx, chi: "..."}
}
function hienThiTenCungLaso(menhIdx, idCungThan = null, highlightTuViIdx = null) {

    for (let i = 0; i < 12; ++i) {
        let cc = CUNG_CELLS[(menhIdx + i) % 12];
        tenCung = TEN_CUNG_FULL[i];
        // Nếu đúng cung Thân, thì thêm (Thân)
        if (cc.cell === idCungThan) {
            cungCu = tenCung;
            tenCung += " <span class='than-label'>(Thân)</span>";
        }
        let cell = document.querySelector('.cell' + cc.cell);
        let can = getCanThang12Cung(ThienCanNamSinh)[(menhIdx + i) % 12];
        let chi = cc.chi;
        let hanhClass = HANH_CHI[chi] || '';
        if (cell) {
            cell.innerHTML = `
                                                            <div class="ten-cung">
                                                                ${tenCung}
                                                            </div>
                                                            <div class="chi-cung ${hanhClass}">
                                                                ${can} ${chi}
                                                            </div>
                                                        `;
        }
    }
}