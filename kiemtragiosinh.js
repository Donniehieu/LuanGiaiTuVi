// Bảng giờ phạm quan sát: tháng -> giờ phạm
const GIO_PHAM_QUAN_SAT = ["Tỵ", "Thìn", "Mão", "Dần", "Sửu", "Tý", "Hợi", "Tuất", "Dậu", "Thân", "Mùi", "Ngọ"];

let phamgio_quan_sat = "";
let phamgio_diem_vuong = "";
let phamgio_da_de = "";
let phamgio_tuong_quan = "";
let phamgio_kim_xa_thiet_toa = "";

/**
 * Kiểm tra giờ sinh có phạm giờ quan sát không
 * @param {number} thangAm - Tháng âm lịch (1-12)
 * @param {string} gioChi - Tên giờ ("Tý", "Sửu", ...)
 * @returns {string} - "Phạm giờ quan sát" hoặc "Không phạm giờ quan sát"
 */
function checkGioPhamQuanSat(thangAm, gioChi) {
    const gioPham = GIO_PHAM_QUAN_SAT[thangAm - 1];
    if (gioChi === gioPham) {
        return "Phạm giờ Quan Sát";
    } else {
        return "Không phạm giờ Quan Sát";
    }
}

function checkGioDiemVuong(thangAm, gioChi) {
    const bangPham = [
        { thangs: [1, 2, 3], gios: ["Sửu", "Mùi"] },
        { thangs: [4, 5, 6], gios: ["Thìn", "Tuất"] },
        { thangs: [7, 8, 9], gios: ["Tý", "Ngọ"] },
        { thangs: [10, 11, 12], gios: ["Mão", "Dậu"] }
    ];
    for (let row of bangPham) {
        if (row.thangs.includes(thangAm) && row.gios.includes(gioChi)) {
            return "Phạm giờ Diêm Vương";
        }
    }
    return "Không phạm giờ Diêm Vương";
}
function checkGioDaDe(thangAm, gioChi) {
    if ([1, 2, 3].includes(thangAm) && gioChi === "Ngọ") return "Phạm giờ Dạ Đề";
    if ([4, 5, 6].includes(thangAm) && gioChi === "Dậu") return "Phạm giờ Dạ Đề";
    if ([7, 8, 9].includes(thangAm) && gioChi === "Tý") return "Phạm giờ Dạ Đề";
    if ([10, 11, 12].includes(thangAm) && gioChi === "Mão") return "Phạm giờ Dạ Đề";
    return "Không phạm giờ Dạ Đề";
}
function checkGioTuongQuan(thangAm, gioChi) {
    if ([1, 2, 3].includes(thangAm) && ["Thìn", "Tuất", "Dậu"].includes(gioChi)) return "Phạm giờ Tướng Quân";
    if ([4, 5, 6].includes(thangAm) && ["Tý", "Mão", "Mùi"].includes(gioChi)) return "Phạm giờ Tướng Quân";
    if ([7, 8, 9].includes(thangAm) && ["Dần", "Ngọ", "Sửu"].includes(gioChi)) return "Phạm giờ Tướng Quân";
    if ([10, 11, 12].includes(thangAm) && ["Thân", "Tỵ", "Hợi"].includes(gioChi)) return "Phạm giờ Tướng Quân";
    return "Không phạm giờ Tướng Quân";
}
function checkGioKimXaThietToa(namSinhChi, thangSinh, ngaySinh, gioSinhChi, gioiTinh) {
    const CHI12 = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

    // Bước 1: Khởi tại cung Tuất đặt là năm Tý, chạy thuận tới NĂM sinh
    let idxTuất = CHI12.indexOf("Tuất");
    let idxNamSinh = CHI12.indexOf(namSinhChi);
    let idxThang1 = (idxTuất + ((idxNamSinh - CHI12.indexOf("Tý") + 12) % 12)) % 12;

    // Bước 2: Đặt đó là tháng 1, chạy ngược tới THÁNG sinh (tháng âm: 1-12)
    let idxThangSinh = (idxThang1 - (thangSinh - 1) + 12) % 12;

    // Bước 3: Đặt đó là ngày 1, chạy thuận tới NGÀY sinh
    let idxNgaySinh = (idxThangSinh + (ngaySinh - 1)) % 12;

    // Bước 4: Đặt đó là giờ Tý, chạy ngược tới GIỜ sinh
    let idxGioSinh = (idxNgaySinh - CHI12.indexOf(gioSinhChi) + 12) % 12;

    // Kết quả chi của giờ Kim Xà Thiết Tỏa
    let chiKetQua = CHI12[idxGioSinh];

    if (gioiTinh === "Nam" && (chiKetQua === "Thìn" || chiKetQua === "Tuất")) {
        return "Phạm giờ Kim Xà Thiết Tỏa";
    }
    if (gioiTinh === "Nữ" && (chiKetQua === "Sửu" || chiKetQua === "Mùi")) {
        return "Phạm giờ Kim Xà Thiết Tỏa";
    }
    return "Không phạm giờ Kim Xà Thiết Tỏa";
}