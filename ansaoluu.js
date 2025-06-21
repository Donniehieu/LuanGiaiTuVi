function anSaoLuuTheoNamXem(chiNamXem) {
    // Xóa nhãn lưu cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll(`
                                                                                    .sao-luu-thai-tue, .sao-luu-bach-ho, .sao-luu-tang-mon,
                                                                                    .sao-luu-thien-hu, .sao-luu-thien-khoc, .sao-luu-thien-ma
                                                                                `).forEach(e => e.remove());
    });

    // Helper: lấy vị trí chi trong vòng 12 chi
    function getIndexChi(chi) {
        return CHI12.indexOf(chi);
    }

    // Helper: tìm index cung theo chi
    function getIndexCungByChi(chi) {
        return CUNG_CELLS.findIndex(c => c.chi === chi);
    }

    // 1. Lưu Thái Tuế: An tại cung chi đúng năm xem
    const idxLuuThaiTue = getIndexCungByChi(chiNamXem);
    if (idxLuuThaiTue !== -1) {
        const cell = document.querySelector('.cell' + CUNG_CELLS[idxLuuThaiTue].cell);
        if (cell) {
            cell.insertAdjacentHTML('beforeend', `
                                                                                        <div class="sao-luu-thai-tue sao-xau hanh-hoa">
                                                                                            L. Thái Tuế
                                                                                        </div>
                                                                                    `);
        }
    }

    // Lưu Bạch Hổ: từ Thân (năm Tý), thuận chiều kim đồng hồ đến năm xem
    const idxCungThan = getIndexCungByChi("Thân");
    const buocBachHo = (getIndexChi(chiNamXem) - getIndexChi("Tý") + 12) % 12;
    const idxBachHo = (idxCungThan + buocBachHo) % 12;
    if (idxBachHo !== -1) {
        const cell = document.querySelector('.cell' + CUNG_CELLS[idxBachHo].cell);
        if (cell) {
            cell.insertAdjacentHTML('beforeend', `
                                                                                        <div class="sao-luu-bach-ho sao-xau hanh-kim" >
                                                                                            L. Bạch Hổ
                                                                                        </div>
                                                                                    `);
        }
    }

    // Lưu Tang Môn: từ Dần (năm Tý), thuận chiều kim đồng hồ đến năm xem
    const idxCungDan = getIndexCungByChi("Dần");
    const buocTangMon = (getIndexChi(chiNamXem) - getIndexChi("Tý") + 12) % 12;
    const idxTangMon = (idxCungDan + buocTangMon) % 12;
    if (idxTangMon !== -1) {
        const cell = document.querySelector('.cell' + CUNG_CELLS[idxTangMon].cell);
        if (cell) {
            cell.insertAdjacentHTML('beforeend', `
                                                                                        <div class="sao-luu-tang-mon sao-xau hanh-moc" >
                                                                                            L. Tang Môn
                                                                                        </div>
                                                                                    `);
        }
    }

    // Lưu Thiên Hư: từ Ngọ (năm Tý), thuận chiều kim đồng hồ đến năm xem
    const idxCungNgo = getIndexCungByChi("Ngọ");
    const buocThienHu = (getIndexChi(chiNamXem) - getIndexChi("Tý") + 12) % 12;
    const idxThienHu = (idxCungNgo + buocThienHu) % 12;
    if (idxThienHu !== -1) {
        const cell = document.querySelector('.cell' + CUNG_CELLS[idxThienHu].cell);
        if (cell) {
            cell.insertAdjacentHTML('beforeend', `
                                                                                        <div class="sao-luu-thien-hu sao-xau hanh-thuy">
                                                                                            L. Thiên Hư
                                                                                        </div>
                                                                                    `);
        }
    }

    // Lưu Thiên Khốc: từ Ngọ (năm Tý), NGƯỢC chiều kim đồng hồ đến năm xem
    const buocThienKhoc = (getIndexChi("Tý") - getIndexChi(chiNamXem) + 12) % 12;
    const idxThienKhoc = (idxCungNgo + buocThienKhoc) % 12;
    if (idxThienKhoc !== -1) {
        const cell = document.querySelector('.cell' + CUNG_CELLS[idxThienKhoc].cell);
        if (cell) {
            cell.insertAdjacentHTML('beforeend', `
                                                                                        <div class="sao-luu-thien-khoc sao-xau hanh-kim">
                                                                                            L. Thiên Khốc
                                                                                        </div>
                                                                                    `);
        }
    }

    // Lưu Thiên Mã: bảng cố định theo chi năm xem
    let chiThienMa = "";
    [
        { list: ["Thân", "Tý", "Thìn"], chi: "Dần" },
        { list: ["Dần", "Ngọ", "Tuất"], chi: "Thân" },
        { list: ["Tỵ", "Dậu", "Sửu"], chi: "Hợi" },
        { list: ["Hợi", "Mão", "Mùi"], chi: "Tỵ" },
    ].forEach(row => {
        if (row.list.includes(chiNamXem)) chiThienMa = row.chi;
    });
    if (chiThienMa) {
        const idx = getIndexCungByChi(chiThienMa);
        if (idx !== -1) {
            const cell = document.querySelector('.cell' + CUNG_CELLS[idx].cell);
            if (cell) {
                cell.insertAdjacentHTML('beforeend', `
                                                                                            <div class="sao-luu-thien-ma sao-tot hanh-hoa">
                                                                                                L. Thiên Mã
                                                                                            </div>
                                                                                        `);
            }
        }
    }
}

function anLuuLocTon(canNamXem) {
    // Xoá nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-luu-loc-ton').forEach(e => e.remove());
    });
    // Bản đồ đúng quy tắc từng can - cung
    const CAN_MAP = {
        "G.": "Dần",    // Giáp
        "Ấ.": "Mão",    // Ất
        "B.": "Tỵ",     // Bính
        "Đ.": "Ngọ",    // Đinh
        "M.": "Tỵ",     // Mậu
        "K.": "Ngọ",    // Kỷ
        "C.": "Thân",   // Canh
        "T.": "Dậu",    // Tân
        "N.": "Hợi",    // Nhâm
        "Q.": "Tý"      // Quý
    };
    const chiLocTon = CAN_MAP[canNamXem];
    if (!chiLocTon) return;
    const idx = CUNG_CELLS.findIndex(c => c.chi === chiLocTon);
    if (idx !== -1) {
        const cell = document.querySelector('.cell' + CUNG_CELLS[idx].cell);
        if (cell) {
            cell.insertAdjacentHTML('beforeend',
                `<div class="sao-luu-loc-ton sao-tot hanh-tho">
                                                                                        L. Lộc Tồn
                                                                                    </div>`);
        }
    }
}

function anLuuKinhDuongDaLa(canNamXem) {
    // Xoá nhãn cũ
    document.querySelectorAll('.laso-cell').forEach(cell => {
        cell.querySelectorAll('.sao-luu-kinh-duong, .sao-luu-da-la, .sao-luu-loc-ton').forEach(e => e.remove());
    });

    // Quy tắc vị trí Lộc Tồn
    const CAN_MAP = {
        "G.": "Dần",   // Giáp
        "Ấ.": "Mão",   // Ất
        "B.": "Tỵ",    // Bính
        "Đ.": "Ngọ",   // Đinh
        "M.": "Tỵ",    // Mậu
        "K.": "Ngọ",   // Kỷ
        "C.": "Thân",  // Canh
        "T.": "Dậu",   // Tân
        "N.": "Hợi",   // Nhâm
        "Q.": "Tý"     // Quý
    };
    const chiLocTon = CAN_MAP[canNamXem];
    if (!chiLocTon) return;
    const idxLocTon = CUNG_CELLS.findIndex(c => c.chi === chiLocTon);
    if (idxLocTon === -1) return;

    // Lưu Lộc Tồn (sao tốt, hành mộc)
    const cellLocTon = document.querySelector('.cell' + CUNG_CELLS[idxLocTon].cell);
    if (cellLocTon) {
        cellLocTon.insertAdjacentHTML('beforeend',
            `<div class="sao-luu-loc-ton sao-tot hanh-tho phu-tinh">
                                                                                L. Lộc Tồn
                                                                            </div>`);
    }

    // Lưu Kình Dương: cung ngay sau Lộc Tồn (thuận chiều kim đồng hồ) - sao xấu, hành kim
    const idxKinhDuong = (idxLocTon + 1) % 12;
    const cellKinhDuong = document.querySelector('.cell' + CUNG_CELLS[idxKinhDuong].cell);
    if (cellKinhDuong) {
        cellKinhDuong.insertAdjacentHTML('beforeend',
            `<div class="sao-luu-kinh-duong sao-xau hanh-kim phu-tinh">
                                                                                L. Kình Dương
                                                                            </div>`);
    }

    // Lưu Đà La: cung ngay trước Lộc Tồn (ngược chiều kim đồng hồ) - sao xấu, hành kim
    const idxDaLa = (idxLocTon + 11) % 12;
    const cellDaLa = document.querySelector('.cell' + CUNG_CELLS[idxDaLa].cell);
    if (cellDaLa) {
        cellDaLa.insertAdjacentHTML('beforeend',
            `<div class="sao-luu-da-la sao-xau hanh-kim phu-tinh">
                                                                                L. Đà La
                                                                            </div>`);
    }
}


function anSaoLuuTuHoa(canNamXem, cuCungSao) {
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





    if (!RULES[canNamXem]) return;

    RULES[canNamXem].forEach(rule => {
        const idxCung = cuCungSao[rule.sao];
        if (typeof idxCung !== "undefined") {
            const cell = document.querySelector('.cell' + CUNG_CELLS[idxCung].cell);
            if (cell) {
                cell.insertAdjacentHTML('beforeend',
                    `<div class="tu-hoa ${rule.hanh} ${rule.loai}">
                                                                                            L. ${rule.hoa}
                                                                                        </div>`);
            }
        }
    });
}