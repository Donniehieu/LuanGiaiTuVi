// Kiểm tra hợp lệ ngày/tháng/năm dương lịch và cảnh báo
function isLeapYear(year) {
    year = parseInt(year);
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}
function scalePage() {
    document.body.classList.add('scaled');
}

function getMaxDay(month, year) {
    month = parseInt(month);
    year = parseInt(year);
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31;
    if ([4, 6, 9, 11].includes(month)) return 30;
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    }
    return 31; // fallback
}
const ngayInput = document.getElementById('ngay');
const thangInput = document.getElementById('thang');
const namInput = document.getElementById('nam');
const btnTuvi = document.getElementById('btn_xemtuvi');
const amlichDiv = document.getElementById('amlich');

function validateDateInput() {
    const day = parseInt(ngayInput.value);
    const month = parseInt(thangInput.value);
    const year = parseInt(namInput.value);

    if (!month || !year) {
        amlichDiv.classList.add('d-none');
        btnTuvi.disabled = true;
        return;
    }
    const maxDay = getMaxDay(month, year);
    ngayInput.max = maxDay; // cập nhật max cho input ngày

    if (day > maxDay) {
        amlichDiv.classList.remove('d-none');
        amlichDiv.classList.add('alert-danger');
        amlichDiv.classList.remove('alert-info');
        amlichDiv.innerText = `Tháng ${month} năm ${year} chỉ có tối đa ${maxDay} ngày. Vui lòng nhập lại ngày!`;
        btnTuvi.disabled = true;
    } else {
        // Kiểm tra các trường khác đã đủ chưa để enable nút
        const hoten = document.getElementById('hoten').value.trim();
        const namxemhan = document.getElementById('namxemhan').value;
        if (hoten && day && month && year && namxemhan) {
            btnTuvi.disabled = false;
        } else {
            btnTuvi.disabled = true;
        }
        // Ẩn cảnh báo nếu trước đó có lỗi
        if (amlichDiv.innerText.includes('chỉ có tối đa')) {
            amlichDiv.classList.add('d-none');
            amlichDiv.classList.remove('alert-danger');
            amlichDiv.classList.add('alert-info');
            amlichDiv.innerText = '';
        }
    }
}
// hàm check khi input ngày tháng năm
ngayInput.addEventListener('input', validateDateInput);
thangInput.addEventListener('input', validateDateInput);
namInput.addEventListener('input', validateDateInput);