function layNguHanhMenh60(menh60hoagiap) {
    if (!menh60hoagiap) return "";
    const arr = menh60hoagiap.trim().split(" ");
    return arr[arr.length - 1];
}

function layNguHanhCuc(cuc) {
    if (!cuc) return "";
    return cuc.trim().split(" ")[0];
}
const NGU_HANH_SINH = {
    "Mộc": "Hỏa",
    "Hỏa": "Thổ",
    "Thổ": "Kim",
    "Kim": "Thủy",
    "Thủy": "Mộc"
};

const NGU_HANH_KHAC = {
    "Mộc": "Thổ",
    "Thổ": "Thủy",
    "Thủy": "Hỏa",
    "Hỏa": "Kim",
    "Kim": "Mộc"
};

/**
 * Hàm xét 4 hướng sinh khắc giữa mệnh và cục
 * @param {string} hanhMenh - Ngũ hành mệnh (ví dụ: "Kim")
 * @param {string} hanhCuc - Ngũ hành cục (ví dụ: "Thủy")
 * @returns {object} - Kết quả 4 hướng: menh_sinh_cuc, menh_khac_cuc, cuc_sinh_menh, cuc_khac_menh
 */
function xetSinhKhacNguHanh(hanhMenh, hanhCuc) {
    return {
        menh_sinh_cuc: (NGU_HANH_SINH[hanhMenh] === hanhCuc) ? "Có" : "Không",
        menh_khac_cuc: (NGU_HANH_KHAC[hanhMenh] === hanhCuc) ? "Có" : "Không",
        cuc_sinh_menh: (NGU_HANH_SINH[hanhCuc] === hanhMenh) ? "Có" : "Không",
        cuc_khac_menh: (NGU_HANH_KHAC[hanhCuc] === hanhMenh) ? "Có" : "Không",
    };
}

// Chỉ hiện những hướng có
function hienHuongCo(result) {
    const mapping = {
        menh_sinh_cuc: "Mệnh sinh Cục",
        menh_khac_cuc: "Mệnh khắc Cục",
        cuc_sinh_menh: "Cục sinh Mệnh",
        cuc_khac_menh: "Cục khắc Mệnh"
    };
    return Object.entries(result)
        .filter(([_, value]) => value === "Có")
        .map(([key]) => mapping[key]);
}

function amDuongThuanNghichLy(namSinh, menhChi) {
    // 1. Xác định tuổi âm/dương
    const soCuoi = namSinh % 10;
    const laTuoiAm = soCuoi % 2 === 1; // Lẻ: tuổi âm
    // 2. Xác định cung mệnh âm/dương
    const cungDuong = ["Tý", "Dần", "Thìn", "Ngọ", "Thân", "Tuất"];
    const laMenhDuong = cungDuong.includes(menhChi); // true: dương, false: âm
    // 3. Thuận/Nghịch lý
    if ((laTuoiAm && !laMenhDuong) || (!laTuoiAm && laMenhDuong)) {
        return "Âm Dương Thuận lý";
    } else {
        return "Âm Dương Nghịch lý";
    }
}
function soCuoiNamSinh(namSinh) {
    return namSinh % 10;
}
const MENH_60HOAGIAP = [
    "Hải Trung Kim", "Hải Trung Kim", "Lư Trung Hỏa", "Lư Trung Hỏa", "Đại Lâm Mộc", "Đại Lâm Mộc",
    "Lộ Bàng Thổ", "Lộ Bàng Thổ", "Kiếm Phong Kim", "Kiếm Phong Kim", "Sơn Đầu Hỏa", "Sơn Đầu Hỏa",
    "Giản Hạ Thủy", "Giản Hạ Thủy", "Thành Đầu Thổ", "Thành Đầu Thổ", "Bạch Lạp Kim", "Bạch Lạp Kim",
    "Dương Liễu Mộc", "Dương Liễu Mộc", "Tuyền Trung Thủy", "Tuyền Trung Thủy", "Ốc Thượng Thổ", "Ốc Thượng Thổ",
    "Tích Lịch Hỏa", "Tích Lịch Hỏa", "Tùng Bách Mộc", "Tùng Bách Mộc", "Trường Lưu Thủy", "Trường Lưu Thủy",
    "Sa Trung Kim", "Sa Trung Kim", "Sơn Hạ Hỏa", "Sơn Hạ Hỏa", "Bình Địa Mộc", "Bình Địa Mộc",
    "Bích Thượng Thổ", "Bích Thượng Thổ", "Kim Bạch Kim", "Kim Bạch Kim", "Phúc Đăng Hỏa", "Phúc Đăng Hỏa",
    "Thiên Hà Thủy", "Thiên Hà Thủy", "Đại Dịch Thổ", "Đại Dịch Thổ", "Thoa Xuyến Kim", "Thoa Xuyến Kim",
    "Tang Đố Mộc", "Tang Đố Mộc", "Đại Khê Thủy", "Đại Khê Thủy", "Sa Trung Thổ", "Sa Trung Thổ",
    "Thiên Thượng Hỏa", "Thiên Thượng Hỏa", "Thạch Lựu Mộc", "Thạch Lựu Mộc", "Đại Hải Thủy", "Đại Hải Thủy"
];// Hàm lấy chỉ số 60 hoa giáp từ can chi (ĐÚNG QUY TẮC)
function indexInSexagenary(can, chi) {
    const CAN = ["G.", "Ấ.", "B.", "Đ.", "M.", "K.", "C.", "T.", "N.", "Q."];
    const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    for (let i = 0; i < 60; ++i) {
        if (CAN[i % 10] === can && CHI[i % 12] === chi) return i;
    }
    return -1; // không tìm thấy
}
function traMenh(can, chi) {
    const idx = indexInSexagenary(can, chi);
    if (idx === -1) return "Không xác định";
    return MENH_60HOAGIAP[idx];
}

function tinhAmDuong(gioitinh, canNam) {
    const duong = ["G.", "B.", "M.", "C.", "N."];
    if (duong.includes(canNam)) {
        return gioitinh === "Nam" ? "Dương Nam" : "Dương Nữ";
    } else {
        return gioitinh === "Nam" ? "Âm Nam" : "Âm Nữ";
    }
}

function soCanNam(can) {
    if (["G.", "K."].includes(can)) return 1;
    if (["Ấ.", "C."].includes(can)) return 2;
    if (["B.", "T."].includes(can)) return 3;
    if (["Đ.", "N."].includes(can)) return 4;
    if (["M.", "Q."].includes(can)) return 5;
    return 0;
}
function soViTriMenh(chi) {
    if (["Tý", "Sửu"].includes(chi)) return 1;
    if (["Dần", "Mão", "Tuất", "Hợi"].includes(chi)) return 2;
    if (["Ngọ", "Mùi"].includes(chi)) return 3;
    if (["Tỵ", "Thìn"].includes(chi)) return 4;
    if (["Thân", "Dậu"].includes(chi)) return 5;
    return 0;
}
function traCuc(can, chi) {
    let s = soCanNam(can) + soViTriMenh(chi);
    if (s > 5) s -= 5;
    const arrCuc = ["", "Kim tứ cục", "Thủy nhị cục", "Hỏa lục cục", "Thổ ngũ cục", "Mộc tam cục"];
    return arrCuc[s];
}

function tinhcucSo(tenCuc) {

    if (tenCuc == "Thủy nhị cục") return 2;
    if (tenCuc == "Mộc tam cục") return 3;
    if (tenCuc == "Kim tứ cục") return 4;
    if (tenCuc == "Thổ ngũ cục") return 5;
    if (tenCuc == "Hỏa lục cục") return 6;


}