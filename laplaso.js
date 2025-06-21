let cucSo = 0;
let IDTieuHan = 0;
let cungCu = "";

document.getElementById('form_tuvi').addEventListener('input', function () {
    const hoten = document.getElementById('hoten').value.trim();
    const ngay = document.getElementById('ngay').value;
    const thang = document.getElementById('thang').value;
    const nam = document.getElementById('nam').value;
    const namxemhan = document.getElementById('namxemhan').value;
    // Chỉ enable nếu hợp lệ ngày tháng năm (được validate ở trên)
    validateDateInput();
});

// hàm thực hiện khi bấm nút
document.getElementById('form_tuvi').addEventListener('submit', function (e) {
    e.preventDefault();

    const hoten = document.getElementById('hoten').value.trim();
    const ngay = parseInt(document.getElementById('ngay').value);
    const thang = parseInt(document.getElementById('thang').value);
    const nam = parseInt(document.getElementById('nam').value);
    const gio = document.getElementById('gio').value;
    const gioitinh = document.getElementById('gioitinh').value;
    const namxemhan = parseInt(document.getElementById('namxemhan').value);

    if (typeof getCanChiFull !== "function") {
        document.getElementById('cungGop').innerHTML = '<div class="text-danger">Không tìm thấy thư viện amlich-convert.js. Vui lòng kiểm tra lại đường dẫn và tải trang.</div>';
        document.getElementById('laso-row').classList.remove('d-none');
        return;
    }
    const kq = getCanChiFull(ngay, thang, nam, gio.split(' ')[0]);
    const am = kq.amlich;
    const canchi = kq.canchi;

    // Năm xem hạn (dương lịch)
    const CAN = ["G.", "Ấ.", "B.", "Đ.", "M.", "K.", "C.", "T.", "N.", "Q."];
    const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    const canchiNamXemHan = CAN[(namxemhan - 4) % 10] + " " + CHI[(namxemhan - 4) % 12];
    const tuoiAm = namxemhan - am.nam + 1;
    const chiNamXemhan = CHI[(namxemhan - 4) % 12];

    // --- TÍCH HỢP ÂM DƯƠNG, MỆNH, CỤC ---
    const canNam = canchi.nam.split(' ')[0];
    const chiNam = canchi.nam.split(' ')[1];
    const amduong = tinhAmDuong(gioitinh, canNam);
    const menh = traMenh(canNam, chiNam);
    ThienCanNamSinh = canNam;
    // Xác định vị trí cung Mệnh
    const menhObj = getMenhCell(am.thang, gio.split(' ')[0]);
    const chiMenh = menhObj.chi;
    const cellMenh = menhObj.cell;


    // Xác định cung thân
    const thanObj = getThanCell(am.thang, gio.split(' ')[0]);
    const chiThan = thanObj.chi;
    const cellThan = thanObj.cell;
    document.getElementById('cungGop').innerHTML += `<div><b>Cung Thân:</b> ${chiThan}</div>`;

    hienThiTenCungLaso(IDCungMenh, cellThan);
    // Tính Cục
    const cuc = traCuc(canNam, chiMenh);
    // An đại vận
    cucSo = tinhcucSo(cuc);

    // An Sao tử vi

    const idxTuVi = anSaoTuVi(am.ngay, cucSo);

    displayChinhTinhOnLaSo(idxTuVi);

    // 1. Xác định vị trí Thiên Phủ
    const idxThienPhu = viTriThienPhu(idxTuVi);

    // 2. An các sao từ Thiên Phủ
    const saoTuThienPhu = cacSaoTuThienPhu(idxThienPhu);

    rendercacsaotheoThienPhu(saoTuThienPhu, CUNG_CELLS);

    const lsDaiVan = tinhdaivan(IDCungMenh, cucSo, amduong);
    renderDaivan(lsDaiVan);
    // Ví dụ sử dụng sau khi xác định chiNam, tuoiAm, gioitinh
    const arrTieuvan = tinhTieuvan(chiNam, chiNamXemhan, gioitinh);
    renderTieuVan(arrTieuvan);

    anNguyetHan(IDTieuHan, am.thang, canchi.gio.split(' ')[1]);

    const thangSinhSaoIdx = anSaoTheoThangSinh(am.thang, IDCungMenh);


    const gioSinhSaoIdx = anSaoTheoGioSinh(gio.split(' ')[0]);


    const gio_sinh_chi = canchi.gio.split(' ')[1];
    anSaoHoaLinhTinh(chiNam, gioitinh, canNam, gio_sinh_chi);


    anSaoTheoNgaySinh(
        am.ngay,
        { taPhu: thangSinhSaoIdx.taPhuIdx, huuBat: thangSinhSaoIdx.huuBatIdx },
        { vanXuong: gioSinhSaoIdx.vanXuongIdx, vanKhuc: gioSinhSaoIdx.vanKhucIdx }
    );

    hienThiLocTonKinhDuongDaLa(IDCungMenh, canNam);
    hienThiSaoCoDinh(IDCungMenh);
    // Xác định vị trí Lộc Tồn
    const locTonIdx = viTriLocTon(canNam);
    // An vòng Lộc Tồn 12 sao
    anVongLocTon12Sao(locTonIdx, amduong, CUNG_CELLS);
    // An Văn Tinh, Đường Phù, Quốc Ấn
    anVanTinhDuongPhuQuocAn(locTonIdx, CUNG_CELLS);
    // An Khôi Việt Lưu Hà
    anSaoThienKhoiVietLuuHa(canNam);
    // An sao vòng Thái Tuế
    anVongThaiTueVaKem(chiNam);
    anSaoThienKhoc(chiNam);
    // An Hoa cái  Đào hoa, Thiên mã, Kiếp sát
    anHoaCaiDaoHoaThienMaKiepSat(chiNam);
    // An sao Hồng Loan, Thiên Hỷ, Phượng Các
    anHongLoanThienHyPhuongCacGiaiThan(chiNam);
    // An sao Cô Thần, Quả Tú
    anCoThanQuaTu(chiNam);
    // An sao Phá toái
    anPhaToai(chiNam);
    // An sao Thiên Tài Thiên Thọ
    anThienTaiThienTho(chiNam, chiMenh, chiThan);
    // An Đẩu Quân
    anDauQuan(chiNam, am.thang, canchi.gio.split(' ')[1]);
    // An vòng Trường Sinh
    anVongTrangSinh(cuc, amduong);
    // An sao tứ Hoá

    // Sao chính tinh từ Tử Vi
    const posChinh = getChinhTinhFromTuVi(idxTuVi);
    const cuCungSao = {};
    // Sao chính tinh
    cuCungSao["Tử Vi"] = posChinh.tuVi - 1;
    cuCungSao["Thiên Cơ"] = posChinh.thienCo - 1;
    cuCungSao["Thái Dương"] = posChinh.thaiDuong - 1;
    cuCungSao["Vũ Khúc"] = posChinh.vuKhuc - 1;
    cuCungSao["Thiên Đồng"] = posChinh.thienDong - 1;
    cuCungSao["Liêm Trinh"] = posChinh.liemTrinh - 1;
    // Sao phụ tinh
    const phuTinhMap = {
        thienPhu: "Thiên Phủ",
        thaiAm: "Thái Âm",
        thamLang: "Tham Lang",
        cuMon: "Cự Môn",
        thienTuong: "Thiên Tướng",
        thienLuong: "Thiên Lương",
        thatSat: "Thất Sát",
        phaQuan: "Phá Quân"
    };
    for (const [k, v] of Object.entries(saoTuThienPhu)) {
        if (phuTinhMap[k]) cuCungSao[phuTinhMap[k]] = v - 1;
    }
    // Tả Phụ, Hữu Bật, Văn Xương, Văn Khúc, ...
    if (typeof idx_taPhu === "number") cuCungSao["Tả Phụ"] = idx_taPhu;
    if (typeof idx_huuBat === "number") cuCungSao["Hữu Bật"] = idx_huuBat;
    if (typeof idx_vanXuong === "number") cuCungSao["Văn Xương"] = idx_vanXuong;
    if (typeof idx_vanKhuc === "number") cuCungSao["Văn Khúc"] = idx_vanKhuc;

    anSaoTuHoa(canNam, cuCungSao);
    // An Triệt
    anTriet(canNam);
    // An Tuần
    anTuan(canNam, chiNam);
    // An sao lưu  theo Năm xem
    anSaoLuuTheoNamXem(chiNamXemhan);
    // An sao lưu Lộc Tồn
    anLuuLocTon(canchiNamXemHan.split(' ')[0]);
    // An sao Lưu Kình -Đà
    anLuuKinhDuongDaLa(canchiNamXemHan.split(' ')[0]);
    // Gọi hàm an sao lưu tứ hóa
    anSaoLuuTuHoa(canchiNamXemHan.split(' ')[0], cuCungSao);
    // An đại vận sao
    let daiVanArr = [];
    for (let i = 0; i < 12; ++i) daiVanArr.push(cucSo + i * 10);
    let idxCungDaiVan = getCungDaiVanHienTai(daiVanArr, tuoiAm);
    let tenCungDaiVan = CUNG_CELLS[idxCungDaiVan].chi;


    let canCung = getCanThang12Cung(ThienCanNamSinh)[idxCungDaiVan];

    renderDaiVanSaoLocTonKinhDuongDaLa(idxCungDaiVan, lsDaiVan, CUNG_CELLS, canCung);

    const viTriKVDV = viTriKhoiVietDaiVan(canCung, CUNG_CELLS);

    hienThiKhoiVietDaiVan(viTriKVDV, CUNG_CELLS);

    const vitriDV_Thiên_Mã = viTriThienMaDaiVan(tenCungDaiVan, CUNG_CELLS);

    const danhSachSao = getAllStarsInCells();


    hienThiThienMaDaiVan(vitriDV_Thiên_Mã, CUNG_CELLS);

    hienThiTuHoaDaiVan(canCung, danhSachSao);
    // Gọi sau khi an sao xong:
    groupAndArrangeStars();
    arrangeGoodBadStarsInCells();
    const hanhMenh = layNguHanhMenh60(menh);
    const hanhCuc = layNguHanhCuc(cuc);
    const kqSinhKhac = xetSinhKhacNguHanh(hanhMenh, hanhCuc);
    const Quan_he_cucmenh = hienHuongCo(kqSinhKhac);

    namtuoi = soCuoiNamSinh(am.nam);
    const am_duong_tinh_chat = amDuongThuanNghichLy(namtuoi, chiMenh);
    const chiGio = canchi.gio.split(' ')[1];
    phamgio_quan_sat = checkGioPhamQuanSat(am.thang, chiGio);
    phamgio_diem_vuong = checkGioDiemVuong(am.thang, chiGio);
    phamgio_da_de = checkGioDaDe(am.thang, chiGio);
    phamgio_tuong_quan = checkGioTuongQuan(am.thang, chiGio);
    phamgio_kim_xa_thiet_toa = checkGioKimXaThietToa(chiNam, am.thang, am.ngay, chiGio, gioitinh);

    document.getElementById('cungGop').innerHTML = `
                                                                                                        <div><b>Người xem hạn:</b> ${hoten} </div>
                                                                                                        <div><b>Giới tính :</b> ${gioitinh} </div>
                                                                                                        <div><b>Năm xem hạn:</b> ${namxemhan} (${canchiNamXemHan})</div>
                                                                                                        <div><b>Sinh âm lịch:</b> ${am.ngay}/${am.thang}${am.nhuan ? ' (Nhuận)' : ''}/${am.nam}</div>
                                                                                                        <div><b>Năm sinh: ${canchi.nam} Tháng sinh: ${canchi.thang} </b> </div>
                                                                                                        <div><b> Ngày sinh: ${canchi.ngay} Giờ sinh: ${canchi.gio}</b> </div>
                                                                                                        <div><b> Số tuổi âm:</b> ${tuoiAm} Tuổi</div>
                                                                                                        <hr/>
                                                                                                        <div><b>Âm dương:</b> ${amduong}</div>
                                                                                                        <div><b>Mệnh:</b> ${menh}</div>
                                                                                                        <div><b>Cục:</b> ${cuc}</div>
                                                                                                        <div><b> ${Quan_he_cucmenh}</b></div>
                                                                                                        <div><b> Thân cư ${cungCu}</b></div>
                                                                                                        <div><b>${am_duong_tinh_chat}</b></div>
                                                                                                        <hr/>
                                                                                                        <div><b>${phamgio_quan_sat}</b></div>
                                                                                                        <div><b>${phamgio_diem_vuong}</b></div>
                                                                                                        <div><b>${phamgio_da_de}</b></div>
                                                                                                        <div><b>${phamgio_tuong_quan}</b></div>
                                                                                                        <div><b>${phamgio_kim_xa_thiet_toa}</b></div>


                                                                                                    `;
    document.getElementById('form-row').classList.add('d-none');
    document.getElementById('laso-row').classList.remove('d-none');
    setTimeout(function () {
        drawTamHopByMenhIdx(IDCungMenh);
        chupVaShowBanLaSo();
    }, 20);

});