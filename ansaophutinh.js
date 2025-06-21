function viTriLocTon(canNam) {

    const CAN_MAP = {
        "G.": 0, "K.": 0, // Giáp, Kỷ -> Dần
        "Ấ.": 1, "C.": 1, // Ất, Canh -> Mão
        "B.": 3, "T.": 3, // Bính, Tân -> Tỵ
        "Đ.": 4, "N.": 4, // Đinh, Nhâm -> Ngọ
        "M.": 6, "Q.": 6  // Mậu, Quý -> Thân
    };
    return CAN_MAP[canNam] ?? 0;
}


function viTriKinhDuongDaLa(locTonIdx) {
    // Kình Dương: từ Lộc Tồn tiến 1 cung thuận chiều (kim đồng hồ)
    // Đà La: từ Lộc Tồn tiến 1 cung ngược chiều (ngược kim đồng hồ)
    const kinhDuongIdx = (locTonIdx + 1) % 12;
    const daLaIdx = (locTonIdx + 11) % 12;
    return { kinhDuongIdx, daLaIdx };
}

function hienThiLocTonKinhDuongDaLa(menhIdx, canNam) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-loc-ton, .sao-kinh-duong, .sao-da-la').forEach(e => e.remove());
    });
    // An vị trí Lộc Tồn
    const locTonIdx = viTriLocTon(canNam);
    const { kinhDuongIdx, daLaIdx } = viTriKinhDuongDaLa(locTonIdx);

    // Hiển thị Lộc Tồn (sao tốt, hành thổ)
    const cellLocTon = document.querySelector('.cell' + CUNG_CELLS[locTonIdx].cell);
    if (cellLocTon) {
        cellLocTon.insertAdjacentHTML('beforeend',
            `<div class="sao-loc-ton sao-tot hanh-tho phu-tinh" >
                                                                                Lộc Tồn
                                                                            </div>`);
    }
    // Hiển thị Kình Dương (sao xấu, hành kim)
    const cellKinhDuong = document.querySelector('.cell' + CUNG_CELLS[kinhDuongIdx].cell);
    if (cellKinhDuong) {
        cellKinhDuong.insertAdjacentHTML('beforeend',
            `<div class="sao-kinh-duong sao-xau hanh-kim phu-tinh" >
                                                                                Kình Dương
                                                                            </div>`);
    }
    // Hiển thị Đà La (sao xấu, hành kim)
    const cellDaLa = document.querySelector('.cell' + CUNG_CELLS[daLaIdx].cell);
    if (cellDaLa) {
        cellDaLa.insertAdjacentHTML('beforeend',
            `<div class="sao-da-la sao-xau hanh-kim phu-tinh">
                                                                                Đà La
                                                                            </div>`);
    }
}
