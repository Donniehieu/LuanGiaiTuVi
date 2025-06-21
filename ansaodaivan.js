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