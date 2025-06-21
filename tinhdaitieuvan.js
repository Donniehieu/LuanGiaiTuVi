
function tinhdaivan(menhIdx, cucSo, amduong) {
    // Số đại vận cho 12 cung, khởi tạo
    let daiVanArr = Array(12).fill(0);
    // Xác định chiều: thuận = +1, ngược = -1
    let isThuan = (amduong === "Dương Nam" || amduong === "Âm Nữ");
    // Đặt số cục tại cung Mệnh
    let idx = menhIdx;
    for (let i = 0; i < 12; ++i) {
        daiVanArr[idx] = cucSo + i * 10;
        // Tính chỉ số cung tiếp theo
        idx = (idx + (isThuan ? 1 : -1) + 12) % 12;
    }
    return daiVanArr;
}
function tinhTieuvan(chiNamSinh, chiNam, gioitinh) {
    // Xác định cung khởi tiểu vận dựa vào chi năm sinh
    // Dần Ngọ Tuất -> Thìn, Thân Tý Thìn -> Tuất, Tỵ Dậu Sửu -> Mùi, Hợi Mão Mùi -> Sửu
    const CHI12 = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    const tieuvanKhoi = (() => {
        if (["Dần", "Ngọ", "Tuất"].includes(chiNamSinh)) return "Thìn";
        if (["Thân", "Tý", "Thìn"].includes(chiNamSinh)) return "Tuất";
        if (["Tỵ", "Dậu", "Sửu"].includes(chiNamSinh)) return "Mùi";
        if (["Hợi", "Mão", "Mùi"].includes(chiNamSinh)) return "Sửu";
        // fallback: default về Tý nếu không xác định được
        return "Tý";
    })();
    // Tìm vị trí cung khởi trong CUNG_CELLS
    const khoiIdx = CUNG_CELLS.findIndex(c => c.chi === tieuvanKhoi);
    if (khoiIdx === -1) return Array(12).fill("");
    // Xác định chiều: Nam thuận, Nữ nghịch (thứ tự điền cung)
    const step = gioitinh === "Nam" ? 1 : -1;

    // Tính chi của năm tiểu hạn đầu tiên (năm tuổi âm)
    let chiIdx = CHI12.indexOf(chiNamSinh);
    let tieuvanArr = Array(12).fill("");
    for (let i = 0; i < 12; ++i) {
        // Vị trí cung hiện tại
        let cungIdx = (khoiIdx + i * step + 12 * 5) % 12;
        // Chi năm tiểu hạn tương ứng
        let chi = CHI12[(chiIdx + i) % 12];

        if (chi == chiNam) {
            tieuvanArr[cungIdx] = chi + " (T.H)";
            IDTieuHan = cungIdx;
        } else {
            tieuvanArr[cungIdx] = chi;
        }
    }
    return tieuvanArr;
}