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
function anSaoThienKhoiVietLuuHa(canNam) {
    // Xóa nhãn cũ nếu có
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-thien-khoi, .sao-thien-viet, .sao-luu-ha, .sao-thien-tru, .sao-thien-quan, .sao-thien-phuc').forEach(e => e.remove());
    });

    // Bản đồ an sao theo thiên can
    const MAP = {
        "G.": { khoi: "Sửu", viet: "Mùi", luuha: "Dậu", thientru: "Tỵ", thienquan: "Mùi", thienphuc: "Dậu" },    // Giáp
        "Ấ.": { khoi: "Tý", viet: "Thân", luuha: "Tuất", thientru: "Ngọ", thienquan: "Thìn", thienphuc: "Thân" },   // Ất
        "B.": { khoi: "Hợi", viet: "Dậu", luuha: "Mùi", thientru: "Tý", thienquan: "Tỵ", thienphuc: "Tý" },    // Bính
        "Đ.": { khoi: "Hợi", viet: "Dậu", luuha: "Thân", thientru: "Tỵ", thienquan: "Dần", thienphuc: "Hợi" },   // Đinh
        "M.": { khoi: "Sửu", viet: "Mùi", luuha: "Tỵ", thientru: "Ngọ", thienquan: "Mão", thienphuc: "Mão" },     // Mậu
        "K.": { khoi: "Tý", viet: "Thân", luuha: "Ngọ", thientru: "Thân", thienquan: "Dậu", thienphuc: "Dần" },    // Kỷ
        "C.": { khoi: "Ngọ", viet: "Dần", luuha: "Mão", thientru: "Dần", thienquan: "Hợi", thienphuc: "Ngọ" },    // Canh
        "T.": { khoi: "Ngọ", viet: "Dần", luuha: "Thìn", thientru: "Ngọ", thienquan: "Dậu", thienphuc: "Tỵ" },   // Tân
        "N.": { khoi: "Mão", viet: "Tỵ", luuha: "Hợi", thientru: "Dậu", thienquan: "Tuất", thienphuc: "Ngọ" },     // Nhâm
        "Q.": { khoi: "Mão", viet: "Tỵ", luuha: "Dần", thientru: "Tuất", thienquan: "Ngọ", thienphuc: "Tỵ" },     // Quý
    };

    const data = MAP[canNam];
    if (!data) return;

    // Danh sách thông tin sao, loại, hành, class, top
    const SAO = [
        { ten: "Thiên Khôi", chi: data.khoi, className: "sao-thien-khoi", loai: "tot", hanh: "hoa" },
        { ten: "Thiên Việt", chi: data.viet, className: "sao-thien-viet", loai: "tot", hanh: "hoa" },
        { ten: "Lưu Hà", chi: data.luuha, className: "sao-luu-ha", loai: "xau", hanh: "thuy" },
        { ten: "Thiên Trù", chi: data.thientru, className: "sao-thien-tru", loai: "tot", hanh: "tho" },
        { ten: "Thiên Quan", chi: data.thienquan, className: "sao-thien-quan", loai: "tot", hanh: "hoa" },
        { ten: "Thiên Phúc", chi: data.thienphuc, className: "sao-thien-phuc", loai: "tot", hanh: "tho" }
    ];

    // Map hành sang class
    const HANH_MAU = {
        "kim": "hanh-kim",
        "moc": "hanh-moc",
        "thuy": "hanh-thuy",
        "hoa": "hanh-hoa",
        "tho": "hanh-tho"
    };

    for (const sao of SAO) {
        const idx = CUNG_CELLS.findIndex(c => c.chi === sao.chi);
        if (idx !== -1) {
            const cell = document.querySelector('.cell' + CUNG_CELLS[idx].cell);
            if (cell) {
                let loaiClass = sao.loai === "xau" ? "sao-xau" : "sao-tot";
                let hanhClass = HANH_MAU[sao.hanh] || "";
                cell.insertAdjacentHTML('beforeend',
                    `<div class="${sao.className} ${loaiClass} ${hanhClass} phu-tinh">
                                                                                        ${sao.ten}
                                                                                    </div>`);
            }
        }
    }
}
const SAO_VONG_THAI_TUE = [
    // tên, class, loại (tot/xau), hành (nếu có thể xác định ở đây)
    { ten: "Thái Tuế", className: "sao-thai-tue", loai: "xau", hanh: "hoa" },    // hành theo năm xem hạn
    { ten: "Thiếu Dương", className: "sao-thieu-duong", loai: "tot", hanh: "hoa" },
    { ten: "Tang Môn", className: "sao-tang-mon", loai: "xau", hanh: "moc" },
    { ten: "Thiếu Âm", className: "sao-thieu-am", loai: "tot", hanh: "thuy" },
    { ten: "Quan Phù", className: "sao-quan-phu", loai: "xau", hanh: "hoa" },    // hành theo năm xem hạn
    { ten: "Tử Phù", className: "sao-tu-phu", loai: "xau", hanh: "hoa" },        // hành theo năm xem hạn
    { ten: "Tuế Phá", className: "sao-tue-pha", loai: "xau", hanh: "hoa" },     // hành theo năm xem hạn
    { ten: "Long Đức", className: "sao-long-duc", loai: "tot", hanh: "thuy" },
    { ten: "Bạch Hổ", className: "sao-bach-ho", loai: "xau", hanh: "kim" },
    { ten: "Phúc Đức", className: "sao-phuc-duc", loai: "tot", hanh: "tho" },
    { ten: "Điếu Khách", className: "sao-dieu-khach", loai: "xau", hanh: "hoa" },
    { ten: "Trực Phù", className: "sao-truc-phu", loai: "xau", hanh: "hoa" }
];

// Các sao đi kèm vòng Thái Tuế (tên, class, tốt/xấu, hành)
const KEM_VONG_THAI_TUE = {
    "Thiếu Dương": { ten: "Thiên Không", loai: "xau", hanh: "hoa" },
    "Quan Phù": { ten: "Long Trì", loai: "tot", hanh: "thuy" },
    "Tử Phù": { ten: "Nguyệt Đức", loai: "tot", hanh: "hoa" },
    "Tuế Phá": { ten: "Thiên Hư", loai: "xau", hanh: "thuy" },
    "Phúc Đức": { ten: "Thiên Đức", loai: "tot", hanh: "hoa" }
};

// Các sao xấu không trong mảng chính, cần xác định vị trí khi an
// (Nếu có vị trí hiển thị đặc biệt, bạn bổ sung xử lý riêng)



function anVongThaiTueVaKem(chiNam) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-thai-tue, .sao-tang-mon, .sao-thieu-duong, .sao-thieu-am, .sao-quan-phu, .sao-tu-phu, .sao-tue-pha, .sao-long-duc, .sao-bach-ho, .sao-phuc-duc, .sao-dieu-khach, .sao-truc-phu, .sao-thien-khong, .sao-long-tri, .sao-nguyet-duc, .sao-thien-hu, .sao-thien-duc, .sao-thien-khoc').forEach(e => e.remove());
    });
    const HANH_MAU = {
        "kim": "hanh-kim",
        "moc": "hanh-moc",
        "thuy": "hanh-thuy",
        "hoa": "hanh-hoa",
        "tho": "hanh-tho"
        // "nam": "" // hành của năm, cần xử lý riêng nếu muốn màu động
    };
    // Vị trí chi năm sinh trong CUNG_CELLS
    const idxStart = CUNG_CELLS.findIndex(c => c.chi === chiNam);
    for (let i = 0; i < 12; ++i) {
        const idx = (idxStart + i) % 12;
        const cell = document.querySelector('.cell' + CUNG_CELLS[idx].cell);
        if (!cell) continue;
        const sao = SAO_VONG_THAI_TUE[i];
        let loaiClass = sao.loai === "xau" ? "sao-xau" : "sao-tot";
        let hanhClass = HANH_MAU[sao.hanh] || (sao.hanh === "nam" ? "" : "");

        cell.insertAdjacentHTML('beforeend',
            `<div class="${sao.className} ${loaiClass} ${hanhClass} phu-tinh">
                                                                                ${sao.ten}
                                                                            </div>`);
        // Sao đi kèm
        if (KEM_VONG_THAI_TUE[sao.ten]) {
            const kem = KEM_VONG_THAI_TUE[sao.ten];
            let kemLoaiClass = kem.loai === "xau" ? "sao-xau" : "sao-tot";
            let kemHanhClass = HANH_MAU[kem.hanh] || "";
            cell.insertAdjacentHTML('beforeend',
                `<div class="sao-${kem.ten.toLowerCase().replace(/\s/g, "-")} ${kemLoaiClass} ${kemHanhClass} phu-tinh" >
                                                                                    ${kem.ten}
                                                                                </div>`);
        }
    }
    // Gợi ý: nếu muốn an thêm "Thiên Khốc" (xấu, hành kim) ở vị trí đặc biệt, xử lý ở đây.
}

function anSaoThienKhoc(chiNam) {
    // Xóa nhãn cũ nếu có
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-thien-khoc').forEach(e => e.remove());
    });

    const CHI12 = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    const idxNgo = CUNG_CELLS.findIndex(c => c.chi === "Ngọ"); // Vị trí xuất phát cung Ngọ
    const idxChiNamTrongCHI12 = CHI12.indexOf(chiNam); // 0~11


    if (idxNgo === -1 || idxChiNamTrongCHI12 === -1) return;
    // Lùi nghịch idxNgo - steps (modulo 12)
    let idxKhoc = (idxNgo - idxChiNamTrongCHI12 + 12) % 12;
    const cell = document.querySelector('.cell' + CUNG_CELLS[idxKhoc].cell);

    if (cell) {
        cell.insertAdjacentHTML('beforeend',
            `<div class="sao-thien-khoc hanh-thuy sao-xau">
                                                                                Thiên Khốc
                                                                            </div>`);
    }
}

function anHoaCaiDaoHoaThienMaKiepSat(chiNam) {
    // Xoá nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-hoa-cai, .sao-dao-hoa, .sao-thien-ma, .sao-kiep-sat').forEach(e => e.remove());
    });

    // Quy tắc nhóm chi
    const nhom = [
        { list: ["Dần", "Ngọ", "Tuất"], hoacai: "Tuất", daohoa: "Mão", thienma: "Thân", kiepsat: "Hợi" },
        { list: ["Thân", "Tý", "Thìn"], hoacai: "Thìn", daohoa: "Dậu", thienma: "Dần", kiepsat: "Tỵ" },
        { list: ["Tỵ", "Dậu", "Sửu"], hoacai: "Sửu", daohoa: "Ngọ", thienma: "Hợi", kiepsat: "Dần" },
        { list: ["Hợi", "Mão", "Mùi"], hoacai: "Mùi", daohoa: "Tý", thienma: "Tỵ", kiepsat: "Thân" }
    ];
    let found = nhom.find(g => g.list.includes(chiNam));
    if (!found) return;


    // Map hành sang class màu
    const HANH_MAU = {
        "kim": "hanh-kim",
        "moc": "hanh-moc",
        "thuy": "hanh-thuy",
        "hoa": "hanh-hoa",
        "tho": "hanh-tho"
    };

    // Danh sách sao, bổ sung loại, hành (trừ Thiên Mã xử lý riêng)
    const saoList = [
        { ten: "Hoa Cái", chi: found.hoacai, className: "sao-hoa-cai", loai: "tot", hanh: "kim" },
        { ten: "Đào Hoa", chi: found.daohoa, className: "sao-dao-hoa", loai: "tot", hanh: "moc" },
        // Thiên Mã sẽ xử lý hành riêng bên dưới
        { ten: "Kiếp Sát", chi: found.kiepsat, className: "sao-kiep-sat", loai: "xau", hanh: "hoa" },
        { ten: "Thiên Mã", chi: found.thienma, className: "sao-thien-ma", loai: "tot", hanh: "hoa" }
    ];

    saoList.forEach(sao => {
        const idx = CUNG_CELLS.findIndex(c => c.chi === sao.chi);
        if (idx !== -1) {
            const cell = document.querySelector('.cell' + CUNG_CELLS[idx].cell);
            if (cell) {
                let loaiClass = sao.loai === "xau" ? "sao-xau" : "sao-tot";
                let hanhClass = HANH_MAU[sao.hanh] || "";
                cell.insertAdjacentHTML('beforeend',
                    `<div class="${sao.className} ${loaiClass} ${hanhClass} phu-tinh " >
                                                                                        ${sao.ten}
                                                                                    </div>`);
            }
        }
    });



}








function anHongLoanThienHyPhuongCacGiaiThan(chiNam) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-hong-loan, .sao-thien-hy, .sao-phuong-cac, .sao-giai-than').forEach(e => e.remove());
    });

    const CHI12 = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

    function idxFrom(startChi) {
        const idxStart = CUNG_CELLS.findIndex(c => c.chi === startChi);
        const idxNam = CHI12.indexOf(chiNam);
        return (idxStart - idxNam + 12) % 12;
    }

    // Hồng Loan: hành Thủy, Thiên Hỷ: hành Thủy, Phượng Các/Giải Thần: hành Mộc
    const saoList = [
        { ten: "Hồng Loan", className: "sao-hong-loan", hanh: "hanh-thuy", chi: CUNG_CELLS[idxFrom("Mão")].chi, cell: CUNG_CELLS[idxFrom("Mão")].cell },
        { ten: "Thiên Hỷ", className: "sao-thien-hy", hanh: "hanh-thuy", chi: CUNG_CELLS[idxFrom("Dậu")].chi, cell: CUNG_CELLS[idxFrom("Dậu")].cell },
        { ten: "Phượng Các", className: "sao-phuong-cac", hanh: "hanh-moc", chi: CUNG_CELLS[idxFrom("Tuất")].chi, cell: CUNG_CELLS[idxFrom("Tuất")].cell },
        { ten: "Giải Thần", className: "sao-giai-than", hanh: "hanh-moc", chi: CUNG_CELLS[idxFrom("Tuất")].chi, cell: CUNG_CELLS[idxFrom("Tuất")].cell }
    ];
    saoList.forEach(sao => {
        const cell = document.querySelector('.cell' + sao.cell);
        if (cell) {
            cell.insertAdjacentHTML('beforeend',
                `<div class="${sao.className} sao-tot ${sao.hanh} phu-tinh">
                                                                                    ${sao.ten}
                                                                                </div>`);
        }
    });
}
/**
* An Sao Cô Thần – Quả Tú theo Tam Hội tuổi.
* @param {string} chiNam - Chi năm sinh ("Tý", "Sửu", ..., "Hợi")
*/
function anCoThanQuaTu(chiNam) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-co-than, .sao-qua-tu').forEach(e => e.remove());
    });

    // Quy tắc nhóm chi
    const nhom = [
        { list: ["Hợi", "Tý", "Sửu"], cothan: "Dần", quatu: "Tuất" },
        { list: ["Mão", "Dần", "Thìn"], cothan: "Tỵ", quatu: "Sửu" },
        { list: ["Tỵ", "Ngọ", "Mùi"], cothan: "Thân", quatu: "Thìn" },
        { list: ["Thân", "Dậu", "Tuất"], cothan: "Hợi", quatu: "Mùi" }
    ];
    let found = nhom.find(g => g.list.includes(chiNam));
    if (!found) return;

    // Cô Thần, Quả Tú đều là sao xấu, hành Thổ
    const saoList = [
        { ten: "Cô Thần", chi: found.cothan, className: "sao-co-than", hanh: "hanh-tho" },
        { ten: "Quả Tú", chi: found.quatu, className: "sao-qua-tu", hanh: "hanh-tho" }
    ];
    saoList.forEach(sao => {
        const idx = CUNG_CELLS.findIndex(c => c.chi === sao.chi);
        if (idx !== -1) {
            const cell = document.querySelector('.cell' + CUNG_CELLS[idx].cell);
            if (cell) {
                cell.insertAdjacentHTML('beforeend',
                    `<div class="${sao.className} sao-xau ${sao.hanh} phu-tinh">
                                                                                        ${sao.ten}
                                                                                    </div>`);
            }
        }
    });
}

                                                                        /**
* An sao Phá Toái theo quy tắc Tam Hợp tuổi
* @param {string} chiNam - Chi năm sinh ("Tý", "Sửu", ..., "Hợi")
*/function anPhaToai(chiNam) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-pha-toai').forEach(e => e.remove());
    });

    // Quy tắc nhóm chi
    const nhom = [
        { list: ["Dần", "Thân", "Tỵ", "Hợi"], phatoai: "Dậu" },
        { list: ["Tý", "Ngọ", "Mão", "Dậu"], phatoai: "Tỵ" },
        { list: ["Thìn", "Tuất", "Sửu", "Mùi"], phatoai: "Sửu" }
    ];
    let found = nhom.find(g => g.list.includes(chiNam));
    if (!found) return;

    const idx = CUNG_CELLS.findIndex(c => c.chi === found.phatoai);
    if (idx !== -1) {
        const cell = document.querySelector('.cell' + CUNG_CELLS[idx].cell);
        if (cell) {
            cell.insertAdjacentHTML('beforeend',
                `<div class="sao-pha-toai sao-xau hanh-hoa phu-tinh">
                                                                                    Phá Toái
                                                                                </div>`);
        }
    }
}
/**
* An sao Thiên Tài, Thiên Thọ theo quy tắc:
* - Thiên Tài: từ cung Mệnh (coi đó là năm Tý) đi thuận chiều kim đồng hồ tới chi năm sinh
* - Thiên Thọ: từ cung an Thân (vị trí cung an thân, không phải chi Thân) coi là năm Tý, đi thuận chiều kim đồng hồ tới chi năm sinh
* @param {string} chiNam - Chi năm sinh ("Tý", "Sửu", ..., "Hợi")
* @param {string} menhChi - Chi tại cung Mệnh ("Tý",..., "Hợi")
* @param {string} thanChi - Chi tại cung an Thân ("Tý",..., "Hợi")
*/
function anThienTaiThienTho(chiNam, menhChi, thanChi) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-thien-tai, .sao-thien-tho').forEach(e => e.remove());
    });

    const CHI12 = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

    // Tìm vị trí cung Mệnh và cung an Thân trong bàn
    const idxMenh = CUNG_CELLS.findIndex(c => c.chi === menhChi);
    const idxThan = CUNG_CELLS.findIndex(c => c.chi === thanChi);
    const idxNam = CHI12.indexOf(chiNam);

    // Thiên Tài: từ cung Mệnh là năm Tý, tính thuận tới chi năm sinh
    let idxThienTai = (idxMenh + idxNam) % 12;
    // Thiên Thọ: từ cung an Thân là năm Tý, tính thuận tới chi năm sinh
    let idxThienTho = (idxThan + idxNam) % 12;

    // An sao Thiên Tài
    let cellThienTai = document.querySelector('.cell' + CUNG_CELLS[idxThienTai].cell);
    if (cellThienTai) {
        cellThienTai.insertAdjacentHTML('beforeend',
            `<div class="sao-thien-tai sao-tot hanh-tho phu-tinh" >
                                                                                Thiên Tài
                                                                            </div>`);
    }
    // An sao Thiên Thọ
    let cellThienTho = document.querySelector('.cell' + CUNG_CELLS[idxThienTho].cell);
    if (cellThienTho) {
        cellThienTho.insertAdjacentHTML('beforeend',
            `<div class="sao-thien-tho sao-tot hanh-tho phu-tinh">
                                                                                Thiên Thọ
                                                                            </div>`);
    }
}
/**
* An sao Đẩu Quân theo quy tắc:
* - Sinh năm nào thì từ vị trí cung đó làm tháng 1 (Giả sử chi năm sinh là cung bắt đầu = tháng 1)
* - Đi ngược chiều kim đồng hồ tới tháng sinh (âm lịch)
* - Từ vị trí đó coi là giờ Tý, đi thuận chiều kim đồng hồ tới giờ sinh (chi)
* => Đặt sao Đẩu Quân ở đó
* @param {string} chiNam - Chi năm sinh ("Tý",..., "Hợi")
* @param {number} thangAm - Tháng sinh âm lịch (1-12)
* @param {string} gioChi - Chi giờ sinh ("Tý",..., "Hợi")
*/
function anDauQuan(chiNam, thangAm, gioChi) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-dau-quan').forEach(e => e.remove());
    });

    // Tìm index xuất phát (năm sinh) trong CUNG_CELLS
    const idxStart = CUNG_CELLS.findIndex(c => c.chi === chiNam);
    if (idxStart === -1) return;

    // Đi ngược chiều kim đồng hồ tới tháng sinh âm lịch (tháng 1 là xuất phát, tháng 2 lùi 1, ...)
    // Vị trí tháng sinh trên bàn
    let idxThang = (idxStart - (thangAm - 1) + 12) % 12;

    // Từ đó coi là giờ Tý, đi thuận tới giờ sinh
    const CHI12 = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    const idxGio = CHI12.indexOf(gioChi);
    if (idxGio === -1) return;

    let idxDauQuan = (idxThang + idxGio) % 12;
    const cell = document.querySelector('.cell' + CUNG_CELLS[idxDauQuan].cell);
    if (cell) {
        cell.insertAdjacentHTML('beforeend',
            `<div class="sao-dau-quan sao-xau hanh-hoa phu-tinh">
                                                                                Đẩu Quân
                                                                            </div>`);
    }
}
/**
* An vòng Tràng Sinh cho 12 cung tử vi
* @param {string} tenCuc - Tên cục ("Thủy nhị cục", "Mộc tam cục", "Kim tứ cục", "Thổ ngũ cục", "Hỏa lục cục")
* @param {string} amduong - "Dương Nam", "Dương Nữ", "Âm Nam", "Âm Nữ"
*/
function anVongTrangSinh(tenCuc, amduong) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-trang-sinh').forEach(e => e.remove());
    });

    // Xác định chiều an sao
    const isThuan = (amduong === "Dương Nam" || amduong === "Âm Nữ") ? 1 : -1;

    // Vị trí khởi vòng Tràng Sinh theo cục
    const khoiMap = {
        "Thủy nhị cục": "Thân",
        "Mộc tam cục": "Hợi",
        "Kim tứ cục": "Tỵ",
        "Thổ ngũ cục": "Thân",
        "Hỏa lục cục": "Dần"
    };
    const viTriKhoiChi = khoiMap[tenCuc];
    if (!viTriKhoiChi) return;

    // Thứ tự 12 sao vòng Tràng Sinh
    const SAO_TRANG_SINH = [
        "Tràng Sinh", "Mộc Dục", "Quan Đới", "Lâm Quan", "Đế Vượng", "Suy",
        "Bệnh", "Tử", "Mộ", "Tuyệt", "Thai", "Dưỡng"
    ];

    // Tìm vị trí khởi đầu trên bàn lá số
    let idxStart = CUNG_CELLS.findIndex(c => c.chi === viTriKhoiChi);
    if (idxStart === -1) return;

    // An từng sao, căn giữa sát đáy, bôi đậm
    for (let i = 0; i < 12; ++i) {
        let idx;
        if (isThuan === 1) {
            idx = (idxStart + i) % 12;
        } else {
            idx = (idxStart - i + 12) % 12;
        }
        let cellNum = CUNG_CELLS[idx].cell;
        let cell = document.querySelector('.cell' + cellNum);
        if (cell) {
            cell.insertAdjacentHTML('beforeend',
                `<div class="sao-trang-sinh" style="
                                                                                        position:absolute;
                                                                                        left:0; right:0;
                                                                                        bottom:${2}px;
                                                                                        text-align:center;
                                                                                        color:#000;
                                                                                        font-size:0.97em;
                                                                                        font-weight:bold;
                                                                                        z-index:3;
                                                                                    ">
                                                                                        ${SAO_TRANG_SINH[i]}
                                                                                    </div>`);
        }
    }
}

/**
* Mapping tứ hóa theo thiên can
*
*/
function anSaoTuHoa(canNam, saoChinhPos) {
    // Xóa nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-luu-hoa-loc, .sao-luu-hoa-quyen, .sao-luu-hoa-khoa, .sao-luu-hoa-ky').forEach(e => e.remove());
    });

    // Bảng quy tắc tứ hóa theo CAN NĂM XEM HẠN (KHÔNG phải năm sinh)
    const RULES = {
        "G.": [
            { sao: "Liêm Trinh", hoa: "Hóa Lộc", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Phá Quân", hoa: "Hóa Quyền", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Vũ Khúc", hoa: "Hóa Khoa", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thái Dương", hoa: "Hóa Kỵ", hanh: "hanh-thuy", loai: "sao-xau" }
        ],
        "Ấ.": [
            { sao: "Thiên Cơ", hoa: "Hóa Lộc", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thiên Lương", hoa: "Hóa Quyền", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Tử Vi", hoa: "Hóa Khoa", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thái Âm", hoa: "Hóa Kỵ", hanh: "hanh-thuy", loai: "sao-xau" }
        ],
        "B.": [
            { sao: "Thiên Đồng", hoa: "Hóa Lộc", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thiên Cơ", hoa: "Hóa Quyền", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Văn Xương", hoa: "Hóa Khoa", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Liêm Trinh", hoa: "Hóa Kỵ", hanh: "hanh-thuy", loai: "sao-xau" }
        ],
        "Đ.": [
            { sao: "Thái Âm", hoa: "Hóa Lộc", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thiên Đồng", hoa: "Hóa Quyền", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thiên Cơ", hoa: "Hóa Khoa", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Cự Môn", hoa: "Hóa Kỵ", hanh: "hanh-thuy", loai: "sao-xau" }
        ],
        "M.": [
            { sao: "Tham Lang", hoa: "Hóa Lộc", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thái Âm", hoa: "Hóa Quyền", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Hữu Bật", hoa: "Hóa Khoa", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thiên Cơ", hoa: "Hóa Kỵ", hanh: "hanh-thuy", loai: "sao-xau" }
        ],
        "K.": [
            { sao: "Vũ Khúc", hoa: "Hóa Lộc", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Tham Lang", hoa: "Hóa Quyền", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thiên Lương", hoa: "Hóa Khoa", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Văn Khúc", hoa: "Hóa Kỵ", hanh: "hanh-thuy", loai: "sao-xau" }
        ],
        "C.": [
            { sao: "Thái Dương", hoa: "Hóa Lộc", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Vũ Khúc", hoa: "Hóa Quyền", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thái Âm", hoa: "Hóa Khoa", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thiên Đồng", hoa: "Hóa Kỵ", hanh: "hanh-thuy", loai: "sao-xau" }
        ],
        "T.": [
            { sao: "Cự Môn", hoa: "Hóa Lộc", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thái Dương", hoa: "Hóa Quyền", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Văn Khúc", hoa: "Hóa Khoa", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Văn Xương", hoa: "Hóa Kỵ", hanh: "hanh-thuy", loai: "sao-xau" }
        ],
        "N.": [
            { sao: "Thiên Lương", hoa: "Hóa Lộc", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Tử Vi", hoa: "Hóa Quyền", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Tả Phụ", hoa: "Hóa Khoa", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Vũ Khúc", hoa: "Hóa Kỵ", hanh: "hanh-thuy", loai: "sao-xau" }
        ],
        "Q.": [
            { sao: "Phá Quân", hoa: "Hóa Lộc", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Cự Môn", hoa: "Hóa Quyền", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Thái Âm", hoa: "Hóa Khoa", hanh: "hanh-moc", loai: "sao-tot" },
            { sao: "Tham Lang", hoa: "Hóa Kỵ", hanh: "hanh-thuy", loai: "sao-xau" }
        ]
    };





    if (!RULES[canNam]) return;

    RULES[canNam].forEach(rule => {
        const idxCung = saoChinhPos[rule.sao];

        if (typeof idxCung !== "undefined") {
            const cell = document.querySelector('.cell' + CUNG_CELLS[idxCung].cell);
            if (cell) {
                cell.insertAdjacentHTML('beforeend',
                    `<div class="tu-hoa ${rule.hanh} ${rule.loai}">
                                                                                             ${rule.hoa}
                                                                                        </div>`);
            }
        }
    });
}

function anTriet(canNam) {
    document.querySelectorAll('.triet-border').forEach(e => e.remove());
    const TRIET_CAN_MAP = {
        "G.": ["Thân", "Dậu"], "K.": ["Thân", "Dậu"],
        "Ấ.": ["Ngọ", "Mùi"], "C.": ["Ngọ", "Mùi"],
        "B.": ["Thìn", "Tỵ"], "T.": ["Thìn", "Tỵ"],
        "N.": ["Dần", "Mão"], "Đ.": ["Dần", "Mão"],
        "M.": ["Tý", "Sửu"], "Q.": ["Tý", "Sửu"]
    };
    const chican = TRIET_CAN_MAP[canNam];
    if (!chican) return;
    const idx1 = CUNG_CELLS.findIndex(c => c.chi === chican[0]);
    const idx2 = CUNG_CELLS.findIndex(c => c.chi === chican[1]);
    if (idx1 === -1 || idx2 === -1) return;
    const cellNum1 = CUNG_CELLS[idx1].cell;
    const cellNum2 = CUNG_CELLS[idx2].cell;
    const cell1 = document.querySelector('.cell' + cellNum1);
    const cell2 = document.querySelector('.cell' + cellNum2);

    // Map vị trí cell (row, col)
    const cellPosMap = {
        1: [0, 0], 2: [0, 1], 3: [0, 2], 4: [0, 3],
        5: [1, 0], 8: [1, 3],
        9: [2, 0], 12: [2, 1],
        13: [3, 0], 14: [3, 1], 15: [3, 2], 16: [3, 3]
    };
    const pos1 = cellPosMap[cellNum1];
    const pos2 = cellPosMap[cellNum2];
    if (!pos1 || !pos2) return;

    // Helper: trả về cell DOM đúng để đặt ở góc
    function insertTriet(cell, styleExtend = '', rotate = '', text = 'TRIỆT') {
        cell.insertAdjacentHTML('beforeend', `
                                                                            <div class="triet-border" style="
                                                                                position:absolute;
                                                                                ${styleExtend}
                                                                                width:40px; height:20px;
                                                                                background:#fffbe7; border:2px solid #d32f2f; border-radius:5px;
                                                                                color:#d32f2f; font-weight:bold; font-size:0.75em; z-index:100;
                                                                                display:flex; align-items:center; justify-content:center;
                                                                                text-align:center; letter-spacing:1px;
                                                                                box-shadow:1px 1px 5px #0001; opacity:0.96;
                                                                                ${rotate}
                                                                            ">${text}</div>
                                                                        `);
    }

    // Xử lý từng trường hợp đặc biệt (cặp chi)
    if (
        // Ngọ-Mùi: góc dưới tiếp giáp (góc đáy giữa 2 cung, cell Ngọ bên trái)
        (chican[0] === "Ngọ" && chican[1] === "Mùi") || (chican[0] === "Mùi" && chican[1] === "Ngọ")
    ) {
        // Đặt ở cell Ngọ, góc phải dưới cùng
        if (cell1 && cellNum1 === 2) {
            insertTriet(cell1, "right:-24px; bottom:-16px;", "transform:rotate(0deg);");
        } else if (cell2 && cellNum2 === 2) {
            insertTriet(cell2, "right:-24px; bottom:-16px;", "transform:rotate(0deg);");
        }
    }
    else if (
        // Tý-Sửu: góc trên tiếp giáp (góc đỉnh giữa 2 cung, cell Tý bên trái)
        (chican[0] === "Tý" && chican[1] === "Sửu") || (chican[0] === "Sửu" && chican[1] === "Tý")
    ) {
        // Đặt ở cell Tý, góc phải trên cùng
        if (cell1 && cellNum1 === 15) {
            insertTriet(cell1, "right:-24px; top:-16px;", "transform:rotate(0deg);");
        } else if (cell2 && cellNum2 === 15) {
            insertTriet(cell2, "right:-24px; top:-16px;", "transform:rotate(0deg);");
        }
    }
    else if (
        // Mão-Thìn: góc phải tiếp giáp (góc phải giữa 2 cung)
        (chican[0] === "Mão" && chican[1] === "Thìn") || (chican[0] === "Thìn" && chican[1] === "Mão")
    ) {
        // Đặt ở cell Mão, góc phải giữa
        if (cell1 && cellNum1 === 9) {
            insertTriet(cell1, "right:-32px; top:50%;", "transform:translateY(-50%) rotate(0deg);");
        } else if (cell2 && cellNum2 === 9) {
            insertTriet(cell2, "right:-32px; top:50%;", "transform:translateY(-50%) rotate(0deg);");
        }
    }
    else if (
        // Dậu-Tuất: góc trái tiếp giáp (góc trái giữa 2 cung)
        (chican[0] === "Dậu" && chican[1] === "Tuất") || (chican[0] === "Tuất" && chican[1] === "Dậu")
    ) {
        // Đặt ở cell Dậu, góc trái giữa
        if (cell1 && cellNum1 === 8) {
            insertTriet(cell1, "left:-32px; top:50%;", "transform:translateY(-50%) rotate(0deg);");
        } else if (cell2 && cellNum2 === 8) {
            insertTriet(cell2, "left:-32px; top:50%;", "transform:translateY(-50%) rotate(0deg);");
        }
    }
    else {
        // Các cặp còn lại: tự động căn giữa cạnh tiếp giáp
        // Nếu là ngang (trái-phải)
        if (pos1[0] === pos2[0] && Math.abs(pos1[1] - pos2[1]) === 1) {
            // cell trái (col nhỏ hơn)
            const cell = pos1[1] < pos2[1] ? cell1 : cell2;
            if (cell) {
                insertTriet(cell, "right:-20px; top:50%;", "writing-mode: vertical-lr; transform:translateY(-50%) translateX(50%);");
            }
        }
        // Nếu là dọc (trên-dưới)
        else if (pos1[1] === pos2[1] && Math.abs(pos1[0] - pos2[0]) === 1) {
            // cell trên (row nhỏ hơn)
            const cell = pos1[0] < pos2[0] ? cell1 : cell2;
            if (cell) {
                insertTriet(cell, "left:50%; bottom:-16px;", "transform:translateX(-50%);");
            }
        }
        // Trường hợp khác (chéo hoặc không tiếp giáp), đặt ở cạnh phải cell1 cho dễ nhìn
        else {
            if (cell1) {
                insertTriet(cell1, "right:-20px; top:50%;", "writing-mode: vertical-lr; transform:translateY(-50%) translateX(50%);");
            }
        }
    }
}
function anTuan(canNam, chiNam) {
    document.querySelectorAll('.tuan-border').forEach(e => e.remove());

    // 1. Xác định vị trí cung có chi trùng chi năm sinh (khởi Giáp)
    const idxStart = CUNG_CELLS.findIndex(c => c.chi === chiNam);
    if (idxStart === -1) return;

    // 2. Chạy ngược chiều kim đồng hồ qua 12 cung để an thứ tự can
    const CAN10 = ["G.", "Ấ.", "B.", "Đ.", "M.", "K.", "C.", "T.", "N.", "Q."]; // Giáp-Quý
    let idx = idxStart;
    let canIdx = 0;
    let foundIdx = null;
    for (let i = 0; i < 12; ++i) {
        if (CAN10[canIdx % 10] === canNam) {
            foundIdx = idx;
            break;
        }
        idx = (idx - 1 + 12) % 12;
        canIdx++;
    }
    if (foundIdx === null) return;

    // 3. Hai cung Tuần là lùi 1 và lùi 2 cung ngược kim đồng hồ
    let tuanIdx1 = (foundIdx - 1 + 12) % 12;
    let tuanIdx2 = (foundIdx - 2 + 12) % 12;

    // Lấy cell nums
    const cellNum1 = CUNG_CELLS[tuanIdx1].cell;
    const cellNum2 = CUNG_CELLS[tuanIdx2].cell;
    const cell1 = document.querySelector('.cell' + cellNum1);
    const cell2 = document.querySelector('.cell' + cellNum2);

    // Map cellNum -> [row, col]
    const cellPosMap = {
        1: [0, 0], 2: [0, 1], 3: [0, 2], 4: [0, 3],
        5: [1, 0], 8: [1, 3],
        9: [2, 0], 12: [2, 1],
        13: [3, 0], 14: [3, 1], 15: [3, 2], 16: [3, 3]
    };
    const pos1 = cellPosMap[cellNum1];
    const pos2 = cellPosMap[cellNum2];

    // Helper: insert label TUẦN vào cell đúng vị trí
    function insertTuan(cell, styleExtend = '', rotate = '', text = 'TUẦN') {
        cell.insertAdjacentHTML('beforeend', `
                                                                                <div class="tuan-border" style="
                                                                                    position:absolute;
                                                                                    ${styleExtend}
                                                                                    width:40px; height:20px;
                                                                                    background:#fffbe7; border:2px solid #2949d3; border-radius:5px;
                                                                                    color:#2949d3; font-weight:bold; font-size:0.75em; z-index:100;
                                                                                    display:flex; align-items:center; justify-content:center;
                                                                                    text-align:center; letter-spacing:1px;
                                                                                    box-shadow:1px 1px 5px #0001; opacity:0.96;
                                                                                    ${rotate}
                                                                                ">${text}</div>
                                                                            `);
    }

    // Chỉ vẽ 1 label (ở cell có chỉ số nhỏ hơn, hoặc ưu tiên cell1)
    let cell, isVertical = false;
    if (!pos1 || !pos2) return;
    // Nếu cùng hàng (ngang)
    if (pos1[0] === pos2[0] && Math.abs(pos1[1] - pos2[1]) === 1) {
        // cell trái (col nhỏ hơn)
        cell = pos1[1] < pos2[1] ? cell1 : cell2;
        if (cell) {
            insertTuan(cell, "right:-20px; top:50%;", "writing-mode: vertical-lr; transform:translateY(-50%) translateX(50%);");
        }
    }
    // Nếu cùng cột (dọc)
    else if (pos1[1] === pos2[1] && Math.abs(pos1[0] - pos2[0]) === 1) {
        // cell trên (row nhỏ hơn)
        cell = pos1[0] < pos2[0] ? cell1 : cell2;
        if (cell) {
            insertTuan(cell, "left:50%; bottom:-12px;", "transform:translateX(-50%);");
        }
    }
    // Nếu góc (chéo), đặt ở cạnh phải cell đầu
    else {
        if (cell1) {
            insertTuan(cell1, "right:-20px; top:50%;", "writing-mode: vertical-lr; transform:translateY(-50%) translateX(50%);");
        }
    }
}