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