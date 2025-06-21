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
// ====== AN 12 SAO VÒNG LỘC TỒN & VĂN TINH, ĐƯỜNG PHÙ, QUỐC ẤN ======

// Danh sách 12 sao vòng Lộc Tồn, theo thứ tự an thuận/ nghịch
const SAO_LOC_TON_VONG = [
    { ten: "Bác Sĩ", loai: "tot", hanh: "thuy" },
    { ten: "Lực Sĩ", loai: "tot", hanh: "hoa" },
    { ten: "Thanh Long", loai: "tot", hanh: "thuy" },
    { ten: "Tiểu Hao", loai: "xau", hanh: "hoa" },
    { ten: "Tướng Quân", loai: "tot", hanh: "moc" },
    { ten: "Tấu Thư", loai: "tot", hanh: "kim" },
    { ten: "Phi Liêm", loai: "xau", hanh: "hoa" },
    { ten: "Hỷ Thần", loai: "tot", hanh: "hoa" },
    { ten: "Bệnh Phù", loai: "xau", hanh: "tho" },
    { ten: "Đại Hao", loai: "xau", hanh: "hoa" },
    { ten: "Phục Binh", loai: "xau", hanh: "hoa" },
    { ten: "Quan Phủ", loai: "xau", hanh: "hoa" }
];

// Map hành sang class màu


function anVongLocTon12Sao(locTonIdx, amduong, CUNG_CELLS) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-vong-locton').forEach(e => e.remove());
    });
    const HANH_MAU = {
        "kim": "hanh-kim",
        "moc": "hanh-moc",
        "thuy": "hanh-thuy",
        "hoa": "hanh-hoa",
        "tho": "hanh-tho"
    };

    // Chiều an sao: thuận (dương nam, âm nữ), nghịch (âm nam, dương nữ)
    const isThuan = (amduong === "Dương Nam" || amduong === "Âm Nữ");

    for (let i = 0; i < 12; ++i) {
        // Vị trí sao: locTonIdx + i (thuận), locTonIdx - i (nghịch)
        let idx = isThuan
            ? (locTonIdx + i) % 12
            : (locTonIdx - i + 12 * 2) % 12;
        let cellNum = CUNG_CELLS[idx].cell;
        let cell = document.querySelector('.cell' + cellNum);
        if (cell) {
            const sao = SAO_LOC_TON_VONG[i];
            let loaiClass = sao.loai === "xau" ? "sao-xau" : "sao-tot";
            let hanhClass = HANH_MAU[sao.hanh] || "";
            cell.insertAdjacentHTML('beforeend',
                `<div class="sao-vong-locton ${loaiClass} ${hanhClass} phu-tinh">
                                                                                    ${sao.ten}
                                                                                </div>`);
        }
    }
}
function anVanTinhDuongPhuQuocAn(locTonIdx, CUNG_CELLS) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-van-tinh, .sao-duong-phu, .sao-quoc-an').forEach(e => e.remove());
    });

    // Lưu Niên Văn Tinh (sao tốt, hành kim)
    let vanTinhIdx = (locTonIdx + 3) % 12;
    let cellVanTinh = document.querySelector('.cell' + CUNG_CELLS[vanTinhIdx].cell);
    if (cellVanTinh) {
        cellVanTinh.insertAdjacentHTML('beforeend',
            `<div class="sao-van-tinh sao-tot hanh-kim phu-tinh" >
                                                                                Văn Tinh
                                                                            </div>`);
    }

    // Đường Phù (sao tốt, hành mộc)
    let duongPhuIdx = (locTonIdx + 5) % 12;
    let cellDuongPhu = document.querySelector('.cell' + CUNG_CELLS[duongPhuIdx].cell);
    if (cellDuongPhu) {
        cellDuongPhu.insertAdjacentHTML('beforeend',
            `<div class="sao-duong-phu sao-tot hanh-moc phu-tinh" >
                                                                                Đường Phù
                                                                            </div>`);
    }

    // Quốc Ấn (sao tốt, hành thổ)
    let quocAnIdx = (locTonIdx + 8) % 12;
    let cellQuocAn = document.querySelector('.cell' + CUNG_CELLS[quocAnIdx].cell);
    if (cellQuocAn) {
        cellQuocAn.insertAdjacentHTML('beforeend',
            `<div class="sao-quoc-an sao-tot hanh-tho phu-tinh">
                                                                                Quốc Ấn
                                                                            </div>`);
    }
}