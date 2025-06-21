// ====== Hàm xác định vị trí Lộc Tồn đại vận dựa theo can đại vận hiện tại (vòng Lộc Tồn, bỏ tứ mộ) ======
const VONG_LOC_TON_CUNG = ["Dần", "Mão", "Tỵ", "Ngọ", "Tỵ", "Ngọ", "Thân", "Dậu", "Hợi", "Tý"];
const VONG_LOC_TON_CAN = ["G.", "Ấ.", "B.", "Đ.", "M.", "K.", "C.", "T.", "N.", "Q."]; // Giáp, Ất, Bính, Đinh, ...

/**
 * Trả về tên cung ứng với can đại vận hiện tại theo vòng Lộc Tồn
 * @param {string} canDaiVan - Thiên can ký hiệu ("G.","Ấ.","B.","Đ.","M.","K.","C.","T.","N.","Q.")
 * @returns {string|null} - Tên cung Lộc Tồn đại vận ("Dần", "Mão", "Tỵ", "Ngọ", "Thân", "Dậu") hoặc null nếu không hợp lệ
 */
function viTriLocTonDaiVan(canDaiVan) {
    // Chỉ 6 can đầu tiên ứng với 6 cung vòng Lộc Tồn (Giáp~Kỷ)
    const idx = VONG_LOC_TON_CAN.indexOf(canDaiVan);
    if (idx === -1) return null;
    return VONG_LOC_TON_CUNG[idx];
}


/**
 * Tìm vị trí các sao đại vận vòng Lộc Tồn dựa trên can đại vận hiện tại
 * @param {string} canDaiVan - Thiên can cung đại vận hiện tại ("G.","Ấ.",...)
 * @param {object[]} cungCells - Mảng CUNG_CELLS từ code dự án, mỗi phần tử {cell, chi}
 * @returns {object} - {locTon: idx, kinhDuong: idx, daLa: idx, tenCungLocTon: string}
 */
function viTriSaoDaiVanVongLocTon(canDaiVan, cungCells) {
    // Lấy tên cung Lộc Tồn đại vận
    const tenCungLocTon = viTriLocTonDaiVan(canDaiVan);
    if (!tenCungLocTon) return { locTon: null, kinhDuong: null, daLa: null, tenCungLocTon: null };

    // Tìm index trong mảng CUNG_CELLS
    const idxLocTon = cungCells.findIndex(c => c.chi === tenCungLocTon);

    // Kình Dương: từ Lộc Tồn tiến 1 cung thuận vòng Bắc phái
    const idxKinhDuong = (idxLocTon + 1) % 12;
    // Đà La: từ Lộc Tồn lùi 1 cung nghịch vòng Bắc phái
    const idxDaLa = (idxLocTon + 11) % 12;

    return {
        locTon: idxLocTon,       // index trong CUNG_CELLS
        kinhDuong: idxKinhDuong, // index trong CUNG_CELLS
        daLa: idxDaLa,           // index trong CUNG_CELLS
        tenCungLocTon
    };
}

/**
 * Hiển thị các sao đại vận Lộc Tồn, Kình Dương, Đà La lên bàn lá số
 * @param {object} saoDaiVan - Đối tượng trả về từ viTriSaoDaiVanVongLocTon
 * @param {object[]} cungCells - Mảng CUNG_CELLS từ code dự án, mỗi phần tử {cell, chi}
 */
function hienThiSaoDaiVanVongLocTon(saoDaiVan, cungCells) {
    // Xoá nhãn cũ nếu có
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.saodv-loc-ton, .saodv-kinh-duong, .saodv-da-la').forEach(e => e.remove());
    });

    // Lộc Tồn đại vận
    if (saoDaiVan.locTon !== null) {
        let cellNum = cungCells[saoDaiVan.locTon].cell;

        let cell = document.querySelector('.cell' + cellNum);
        if (cell) {
            cell.insertAdjacentHTML('afterbegin',
                `<div class="saodv-loc-ton sao-tot hanh-tho phu-tinh" style="text-align:left;">
                                                               Lộc Tồn (ĐV)
                                                           </div>`);
        }
    }
    // Kình Dương đại vận
    if (saoDaiVan.kinhDuong !== null) {
        let cellNum = cungCells[saoDaiVan.kinhDuong].cell;

        let cell = document.querySelector('.cell' + cellNum);
        if (cell) {
            cell.insertAdjacentHTML('afterbegin',
                `<div class="saodv-kinh-duong sao-xau hanh-kim phu-tinh" style="text-align:left;">
                                                               Kình Dương (ĐV)
                                                           </div>`);
        }
    }
    // Đà La đại vận
    if (saoDaiVan.daLa !== null) {
        let cellNum = cungCells[saoDaiVan.daLa].cell;

        let cell = document.querySelector('.cell' + cellNum);
        if (cell) {
            cell.insertAdjacentHTML('afterbegin',
                `<div class="saodv-da-la sao-xau hanh-kim phu-tinh" style="text-align:left;">
                                                               Đà La (ĐV)
                                                           </div>`);
        }
    }
}

// ====== Hàm workflow tổng hợp cho đại vận (gọi hàm này khi cần render đại vận lên lá số) ======
/**
 * Gọi hàm này sau khi đã xác định idxCungDaiVan và mảng can 12 cung (thứ tự theo CUNG_CELLS)
 * @param {number} idxCungDaiVan - index cung đại vận hiện tại (0~11, trong CUNG_CELLS)
 * @param {string[]} can12Cung - mảng 12 thiên can cho 12 cung, thứ tự khớp CUNG_CELLS
 * @param {object[]} cungCells - Mảng CUNG_CELLS từ code dự án
 */
function renderDaiVanSaoLocTonKinhDuongDaLa(idxCungDaiVan, can12Cung, cungCells, canCung) {
    // Lấy can đại vận hiện tại

    // Lấy vị trí các sao đại vận
    let saoDaiVan = viTriSaoDaiVanVongLocTon(canCung, cungCells);
    // Hiển thị lên bàn lá số
    hienThiSaoDaiVanVongLocTon(saoDaiVan, cungCells);
}
const MAP_KHOI_VIET = {
    "G.": { khoi: "Sửu", viet: "Mùi" },      // Giáp
    "Ấ.": { khoi: "Tý", viet: "Thân" },      // Ất
    "B.": { khoi: "Hợi", viet: "Dậu" },      // Bính
    "Đ.": { khoi: "Hợi", viet: "Dậu" },      // Đinh
    "M.": { khoi: "Sửu", viet: "Mùi" },      // Mậu
    "K.": { khoi: "Tý", viet: "Thân" },      // Kỷ
    "C.": { khoi: "Ngọ", viet: "Dần" },      // Canh
    "T.": { khoi: "Ngọ", viet: "Dần" },      // Tân
    "N.": { khoi: "Mão", viet: "Tỵ" },       // Nhâm
    "Q.": { khoi: "Mão", viet: "Tỵ" },       // Quý
};

/**
 * Xác định vị trí Thiên Khôi và Thiên Việt đại vận trên CUNG_CELLS
 * @param {string} canDaiVan - Thiên can cung đại vận hiện tại ("G.","Ấ.",...)
 * @param {object[]} cungCells - Mảng CUNG_CELLS: [{chi: "Dần", ...}, ...]
 * @returns {object} - {khoi: idx, viet: idx, tenCungKhoi: string, tenCungViet: string}
 */
function viTriKhoiVietDaiVan(canDaiVan, cungCells) {
    const entry = MAP_KHOI_VIET[canDaiVan];
    if (!entry) return { khoi: null, viet: null, tenCungKhoi: null, tenCungViet: null };
    const idxKhoi = cungCells.findIndex(c => c.chi === entry.khoi);
    const idxViet = cungCells.findIndex(c => c.chi === entry.viet);
    return {
        khoi: idxKhoi,
        viet: idxViet,
        tenCungKhoi: entry.khoi,
        tenCungViet: entry.viet
    };
}
function hienThiKhoiVietDaiVan(viTriKV, cungCells) {
    // Xoá nhãn cũ nếu có
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.saodv-thien-khoi, .saodv-thien-viet').forEach(e => e.remove());
    });

    // Thiên Khôi đại vận
    if (viTriKV.khoi !== null && viTriKV.khoi !== -1) {
        let cellNum = cungCells[viTriKV.khoi].cell;
        let cell = document.querySelector('.cell' + cellNum);
        if (cell) {
            cell.insertAdjacentHTML('afterbegin',
                `<div class="saodv-thien-khoi sao-tot hanh-hoa phu-tinh" style="text-align:left;">
                                                                        Thiên Khôi (ĐV)
                                                                    </div>`);
        }
    }

    // Thiên Việt đại vận
    if (viTriKV.viet !== null && viTriKV.viet !== -1) {
        let cellNum = cungCells[viTriKV.viet].cell;
        let cell = document.querySelector('.cell' + cellNum);
        if (cell) {
            cell.insertAdjacentHTML('afterbegin',
                `<div class="saodv-thien-viet sao-tot hanh-hoa phu-tinh" style="text-align:left;">
                                                                        Thiên Việt (ĐV)
                                                                    </div>`);
        }
    }
}

// ==== Xác định vị trí sao Thiên Mã Đại Vận - ĐÚNG quy tắc truyền thống ====

// Tam hợp
const TAM_HOP_CHI = [
    ["Dần", "Ngọ", "Tuất"],    // Hỏa
    ["Thân", "Tý", "Thìn"],    // Thủy
    ["Tỵ", "Dậu", "Sửu"],      // Kim
    ["Hợi", "Mão", "Mùi"],     // Mộc
];

// Đối xung 12 địa chi
const DOI_XUNG_CHI = {
    "Tý": "Ngọ", "Sửu": "Mùi", "Dần": "Thân", "Mão": "Dậu",
    "Thìn": "Tuất", "Tỵ": "Hợi", "Ngọ": "Tý", "Mùi": "Sửu",
    "Thân": "Dần", "Dậu": "Mão", "Tuất": "Thìn", "Hợi": "Tỵ"
};

/**
 * Xác định cung Thiên Mã đại vận (chuẩn truyền thống)
 * @param {string} chiDaiVan - Địa chi cung đại vận hiện tại ("Dần", "Thân", ...)
 * @param {object[]} cungCells - Mảng CUNG_CELLS: [{chi: "Dần", ...}, ...]
 * @returns {object} - {thienMa: idx, tenCungThienMa: string}
 */
function viTriThienMaDaiVan(chiDaiVan, cungCells) {
    // Tìm nhóm tam hợp chứa chi hiện tại
    let foundGroup = null;
    for (const group of TAM_HOP_CHI) {
        if (group.includes(chiDaiVan)) {
            foundGroup = group;
            break;
        }
    }
    if (!foundGroup) return { thienMa: null, tenCungThienMa: null };

    // Chi đầu tiên của tam hợp
    const chiDau = foundGroup[0];
    // Lấy chi đối xung với chi đầu
    const chiThienMa = DOI_XUNG_CHI[chiDau];

    // Tìm index trong mảng CUNG_CELLS
    const idxThienMa = cungCells.findIndex(c => c.chi === chiThienMa);

    return {
        thienMa: idxThienMa,
        tenCungThienMa: chiThienMa
    };
}
function hienThiThienMaDaiVan(viTriTM, cungCells) {
    // Xoá nhãn cũ nếu có
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.saodv-thien-ma').forEach(e => e.remove());
    });

    // Thiên Mã đại vận
    if (viTriTM.thienMa !== null && viTriTM.thienMa !== -1) {
        let cellNum = cungCells[viTriTM.thienMa].cell;
        let cell = document.querySelector('.cell' + cellNum);
        if (cell) {
            cell.insertAdjacentHTML('afterbegin',
                `<div class="saodv-thien-ma sao-tot hanh-hoa phu-tinh" style="text-align:left;">
                                                                        Thiên Mã (ĐV)
                                                                    </div>`);
        }
    }
}
// Bảng tứ hóa đại vận theo bài thơ (Bắc phái)
const TU_HOA_DAI_VAN = {
    "G.": ["Liêm Trinh", "Phá Quân", "Vũ Khúc", "Thái Dương"],        // Giáp
    "Ấ.": ["Thiên Cơ", "Thiên Lương", "Tử Vi", "Thái Âm"],           // Ất
    "B.": ["Thiên Đồng", "Thiên Cơ", "Văn Xương", "Liêm Trinh"],      // Bính
    "Đ.": ["Thái Âm", "Thiên Đồng", "Thiên Cơ", "Cự Môn"],            // Đinh
    "M.": ["Tham Lang", "Thái Âm", "Hữu Bật", "Thiên Cơ"],            // Mậu
    "K.": ["Vũ Khúc", "Tham Lang", "Thiên Lương", "Văn Khúc"],        // Kỷ
    "C.": ["Thái Dương", "Vũ Khúc", "Thái Âm", "Thiên Đồng"],         // Canh
    "T.": ["Cự Môn", "Thái Dương", "Văn Khúc", "Văn Xương"],          // Tân
    "N.": ["Thiên Lương", "Tử Vi", "Tả Phụ", "Vũ Khúc"],              // Nhâm
    "Q.": ["Phá Quân", "Cự Môn", "Thái Âm", "Tham Lang"],             // Quý
};

const TU_HOA_LABELS = ["Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ"];

// Ngũ hành của các sao chủ hóa theo truyền thống (bạn có thể chỉnh lại cho phù hợp quy chuẩn của dự án)


const HANH_CLASS = {
    "kim": "hanh-kim",
    "moc": "hanh-moc",
    "thuy": "hanh-thuy",
    "hoa": "hanh-hoa",
    "tho": "hanh-tho",
};

/**
 * An tứ hóa đại vận lên bàn lá số, gán class tốt/xấu và ngũ hành đúng từng sao hóa
 * @param {string} canDaiVan - Thiên can cung đại vận hiện tại ("G.","Ấ.",...)
 * @param {object[]} cungCells - Mảng CUNG_CELLS: [{cell, chi, sao: [{name, ...}, ...]}, ...]
 */
// Các nhãn hóa

// Ngũ hành cho hóa đại vận (chuẩn Bắc phái)
const NGU_HANH_HOA_SAO = {
    "Hóa Lộc": "moc",
    "Hóa Quyền": "moc",
    "Hóa Khoa": "moc",
    "Hóa Kỵ": "thuy"
};


/**
 * Hiển thị hóa Lộc, Quyền, Khoa, Kỵ đại vận lên lá số (theo can đại vận)
 * @param {string} canDaiVan - Thiên can đại vận ("G.", "B.",...)
 * @param {object[]} cungCells - Danh sách cung trên lá số, mỗi cung có .cell hoặc .cellNum, .sao (mảng sao)
 */
function hienThiTuHoaDaiVan(canDaiVan, cungCells) {
    const hoaArr = TU_HOA_DAI_VAN[canDaiVan];
    if (!hoaArr) return;

    // Xoá nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.saodv-tu-hoa').forEach(e => e.remove());
    });

    for (const cung of cungCells) {
        if (!cung.sao) continue;
        for (const sao of cung.sao) {
            const tenSao = sao.ten || sao.name;
            const idx = hoaArr.indexOf(tenSao);
            if (idx !== -1) {
                const label = TU_HOA_LABELS[idx];
                // Xác định tốt/xấu
                const isTot = idx < 3; // Lộc, Quyền, Khoa là tốt, Kỵ là xấu
                // Ngũ hành hóa
                const hanh = NGU_HANH_HOA_SAO[label] || "tho";
                const hanhClass = HANH_CLASS[hanh];
                // Lấy DOM cell
                let cell = document.querySelector('.cell' + (cung.cellNum || cung.cell));
                if (cell) {
                    cell.insertAdjacentHTML('beforeend',
                        `<div class="saodv-tu-hoa ${isTot ? "sao-tot" : "sao-xau"} ${hanhClass} phu-tinh"
                                                                        style="font-weight:bold;font-size:13px;text-align:left;white-space:pre-line;">
                                                                            (${label} - ĐV)
                                                                        </div>`);
                }
            }
        }
    }
}