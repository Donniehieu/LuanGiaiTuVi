const START_CAN_THANG_TU_DAN = {
    "G.": 2, "K.": 2,   // Bính Dần
    "Ấ.": 4, "C.": 4,   // Mậu Dần
    "B.": 6, "T.": 6,  // Canh Dần
    "Đ.": 8, "N.": 8, // Nhâm Dần
    "M.": 0, "Q.": 0    // Giáp Dần
};
// Hàm lấy 12 thiên can cho 12 cung bắt đầu từ Dần (cung 13) theo can năm sinh âm lịch
function getCanThang12Cung(canNam) {
    const startCan = START_CAN_THANG_TU_DAN[canNam];
    let canArr = [];
    for (let i = 0; i < 12; ++i) {
        canArr.push(CAN[(startCan + i) % 10]);
    }

    return canArr;
}

// Khi hiển thị lên bàn lá số và bảng, dùng như sau:
function render12CungCanChi(menhChi, canNam) {
    // CUNG_CELLS: [{cell, chi}] bắt đầu từ Dần thuận kim đồng hồ
    let menhIdx = CUNG_CELLS.findIndex(c => c.chi === menhChi);
    let can12 = getCanThang12Cung(canNam);
    let html = "<table class='table table-sm table-bordered mt-2'><thead><tr><th>#</th><th>Cung</th><th>Can Chi</th></tr></thead><tbody>";
    for (let i = 0; i < 12; ++i) {
        let cc = CUNG_CELLS[(menhIdx + i) % 12];
        let tenCung = TEN_CUNG_FULL[i];
        let can = can12[i];
        html += `<tr${i === 0 ? ' style="font-weight:bold;background:#ffe"' : ''}><td>${i + 1}</td><td>${tenCung}</td><td>${can} ${cc.chi}</td></tr>`;
    }
    html += "</tbody></table>";

    return html;
}