let ThienCanNamSinh = "G.";
let IDCungMenh = 0;
let IDCungThan = 0;

function arrangeGoodBadStarsInCells() {
    document.querySelectorAll('.laso-cell').forEach(cell => {
        // Tìm chiều cao của chinh-tinh-group (nếu có), để căn sao tốt/xấu thấp hơn
        let baseTop = 68;
        // Sắp xếp sao tốt bên trái
        const saoTotList = Array.from(cell.querySelectorAll('.sao-tot:not(.chinh-tinh)'));
        saoTotList.forEach((starDiv, idx) => {
            starDiv.style.position = "absolute";
            starDiv.style.left = "2px";
            starDiv.style.top = (baseTop + idx * 18) + "px";
            starDiv.style.width = "54%";
            starDiv.style.textAlign = "left";
            starDiv.style.zIndex = 2;
        });

        // Sắp xếp sao xấu bên phải
        const saoXauList = Array.from(cell.querySelectorAll('.sao-xau'));
        saoXauList.forEach((starDiv, idx) => {
            starDiv.style.position = "absolute";
            starDiv.style.right = "4px"; // cách lề phải 8px
            starDiv.style.top = (baseTop + idx * 18) + "px";
            starDiv.style.width = "max-content"
            starDiv.style.textAlign = "right";
            starDiv.style.zIndex = 2;
        });
    });
}
function groupAndArrangeStars() {
    document.querySelectorAll('.laso-cell').forEach(cell => {
        // Xử lý chính tinh
        let chinhList = Array.from(cell.querySelectorAll('.chinh-tinh'));
        if (chinhList.length) {
            let group = cell.querySelector('.chinh-tinh-group');
            if (!group) {
                group = document.createElement('div');
                group.className = 'chinh-tinh-group';
                cell.insertBefore(group, cell.firstChild);
            } else {
                group.innerHTML = '';
            }
            chinhList.forEach(e => {
                e.style.display = 'block';
                e.style.width = '100%';
                e.style.textAlign = 'center';
                group.appendChild(e);
            });
        }

        // Xử lý phụ tinh
        let phuList = Array.from(cell.querySelectorAll('.phu-tinh'));
        if (phuList.length) {
            let group = cell.querySelector('.phu-tinh-group');
            if (!group) {
                group = document.createElement('div');
                group.className = 'phu-tinh-group';
                cell.appendChild(group);
            } else {
                group.innerHTML = '';
            }
            // Tách tốt/xấu nếu cần, hoặc chỉ mỗi sao 1 dòng
            phuList.forEach(e => {
                e.style.display = 'block';
                e.style.width = '100%';
                group.appendChild(e);
            });
        }
    });
}