import { luangiaichung } from './luanchung.js';
import { luancungmenh } from './luancungmenh.js';
import { loikhuyen } from './advices.js';
export function getAllStarsInCells() {
    // Các class selector chứa sao (mỗi selector nên lấy đúng các sao bạn đã an)
    const saoSelectors = [

        '.sao-tot',
        '.sao-xau',
        '.chinh-tinh'
        // ... bổ sung nếu bạn có thêm class cho các loại sao khác
    ];

    let result = [];
    for (let i = 0; i < 12; ++i) {
        const cellNum = CUNG_CELLS[i].cell;
        const cell = document.querySelector('.cell' + cellNum);
        if (!cell) continue;
        let saoList = [];
        saoSelectors.forEach(sel => {
            cell.querySelectorAll(sel).forEach(e => {
                let ten = e.innerText.trim();
                let cls = e.className.trim();
                if (ten) {
                    // Tránh lặp lại cùng tên - class (nếu cần)
                    if (!saoList.some(obj => obj.ten === ten && obj.class === cls))
                        saoList.push({ ten: ten, class: cls });
                }
            });
        });
        result.push({
            chi: CUNG_CELLS[i].chi,
            cellNum: cellNum,
            sao: saoList
        });
    }
    return result;
}

const general = luangiaichung();
const cung = [
    luancungmenh(),
   
];
const advice = loikhuyen();

// Gọi hàm hiển thị (đảm bảo setLasoData đã có trong window)
window.setLasoData({
    general, cung, advice
});