const mappingTamHopCungMenh = [
    // 0: Dần
    {
        start: { cell: [9, 14], type: "corner" }, // Đỉnh chung Dần - Mão
        ends: [
            { cell: 2, type: "edge", edge: "bottom" }, // Trung điểm cạnh dưới Ngọ (cell2)
            { cell: 12, type: "edge", edge: "left" },  // Trung điểm cạnh trái Tuất (cell12)
            { cell: [3, 8], type: "corner" }           //
        ]
    },
    // 1: Mão
    {
        start: { cell: 9, type: "edge", edge: "right" }, // Trung điểm cạnh phải Mão
        ends: [
            { cell: 8, type: "edge", edge: "left" },     // Trung điểm trái Dậu (Thiên Di)
            { cell: 3, type: "edge", edge: "bottom" },   // Trung điểm dưới Mùi (Quan)
            { cell: [15, 12], type: "corner" }           // Đỉnh chung Hợi - Tuất (Tài - Tử Tức)
        ]
    },
    // 2: Thìn
    {
        start: { cell: 5, type: "edge", edge: "right" }, // Trung điểm cạnh phải Thìn
        ends: [
            { cell: 12, type: "edge", edge: "left" },    // Trung điểm trái Tuất (Thiên Di)
            { cell: [3, 8], type: "corner" },            // Đỉnh chung Thân - Dậu (Quan - Nô Bộc)
            { cell: 15, type: "edge", edge: "top" }      // Trung điểm trên Tý (Tài)
        ]
    },
    // 3: Tỵ
    {
        start: { cell: [1, 5], type: "corner" },         // Đỉnh chung Tỵ - Ngọ
        ends: [
            { cell: [12, 15], type: "corner" },            // Đỉnh chung Mùi - Thân (Thiên Di - Nô Bộc)
            { cell: 8, type: "edge", edge: "left" },     // Trung điểm trái Dậu (Quan)
            { cell: 14, type: "edge", edge: "top" }      // Trung điểm trên Sửu (Tài)
        ]
    },
    // 4: Ngọ
    {
        start: { cell: 2, type: "edge", edge: "bottom" }, // Trung điểm dưới Ngọ
        ends: [
            { cell: 15, type: "edge", edge: "top" },      // Trung điểm trên Tý (Thiên Di)
            { cell: [9, 14], type: "corner" },            // Đỉnh chung Mão - Dần (Quan - Tử Tức)
            { cell: 12, type: "edge", edge: "left" }      // Trung điểm trái Tuất (Nô Bộc)
        ]
    },
    // 5: Mùi
    {
        start: { cell: 3, type: "edge", edge: "bottom" }, // Trung điểm dưới Mùi
        ends: [
            { cell: 9, type: "edge", edge: "right" },     // Trung điểm phải Mão (Thiên Di)
            { cell: [16, 12], type: "corner" },           // Đỉnh chung Hợi - Tuất (Quan - Nô Bộc)
            { cell: 14, type: "edge", edge: "top" }       // Trung điểm trên Sửu (Tài)
        ]
    },
    // 6: Thân
    {
        start: { cell: [3, 8], type: "corner" },
        ends: [
            { cell: 15, type: "edge", edge: "top" },      // Trung điểm trên Tý (Thiên Di)
            { cell: [9, 13], type: "corner" },            // Đỉnh chung Mão - Dần (Quan - Tử Tức)
            { cell: 5, type: "edge", edge: "right" }      // Trung điểm phải Thìn (Tài)
        ]
    },
    // 7: Dậu
    {
        start: { cell: 8, type: "edge", edge: "left" },   // Trung điểm trái Dậu
        ends: [
            { cell: 9, type: "edge", edge: "right" },     // Trung điểm phải Mão (Thiên Di)
            { cell: [1, 5], type: "corner" },             // Đỉnh chung Tỵ - Thìn (Quan - Nô Bộc)
            { cell: 14, type: "edge", edge: "top" }       // Trung điểm trên Sửu (Tài)
        ]
    },
    // 8: Tuất
    {
        start: { cell: 12, type: "edge", edge: "left" },  // Trung điểm trái Tuất
        ends: [
            { cell: 2, type: "edge", edge: "bottom" },    // Trung điểm dưới Ngọ (Thiên Di)
            { cell: [9, 13], type: "corner" },            // Đỉnh chung Mão - Dần (Quan - Tử Tức)
            { cell: 5, type: "edge", edge: "right" }      // Trung điểm phải Thìn (Tài)
        ]
    },
    // 9: Hợi
    {
        start: { cell: [16, 12], type: "corner" },        // Đỉnh chung Hợi - Tuất
        ends: [
            { cell: 9, type: "edge", edge: "right" },     // Trung điểm phải Mão (Thiên Di)
            { cell: [2, 5], type: "corner" },             // Đỉnh chung Tỵ - Thìn (Quan - Nô Bộc)
            { cell: 3, type: "edge", edge: "bottom" }     // Trung điểm dưới Mùi (Tài)
        ]
    },
    // 10: Tý
    {
        start: { cell: 15, type: "edge", edge: "top" },   // Trung điểm trên Tý
        ends: [
            { cell: 2, type: "edge", edge: "bottom" },    // Trung điểm dưới Ngọ (Thiên Di)
            { cell: [3, 8], type: "corner" },             // Đỉnh chung Mùi - Dậu (Quan - Nô Bộc)
            { cell: 5, type: "edge", edge: "right" }      // Trung điểm phải Thìn (Tài)
        ]
    },
    // 11: Sửu
    {
        start: { cell: 14, type: "edge", edge: "top" },  // Trung điểm trái Sửu
        ends: [
            { cell: 8, type: "edge", edge: "left" },      // Trung điểm trái Dậu (Thiên Di)
            { cell: [2, 5], type: "corner" },             // Đỉnh chung Tỵ - Thìn (Quan - Nô Bộc)
            { cell: 3, type: "edge", edge: "bottom" }     // Trung điểm dưới Mùi (Tài)
        ]
    }
];
function getCellRect(cellNum) {
    const el = document.querySelector('.cell' + cellNum);
    if (!el) return null;
    return el.getBoundingClientRect();
}

// Edge mid
function getEdgeMid(rect, edge) {
    if (!rect) return { x: 0, y: 0 };
    switch (edge) {
        case 'left': return { x: rect.left, y: (rect.top + rect.bottom) / 2 };
        case 'right': return { x: rect.right, y: (rect.top + rect.bottom) / 2 };
        case 'top': return { x: (rect.left + rect.right) / 2, y: rect.top };
        case 'bottom': return { x: (rect.left + rect.right) / 2, y: rect.bottom };
    }
}

// Corner chung
function getCorner(rectA, rectB) {
    if (!rectA || !rectB) return { x: 0, y: 0 };
    const cornersA = [
        { x: rectA.left, y: rectA.top },
        { x: rectA.right, y: rectA.top },
        { x: rectA.right, y: rectA.bottom },
        { x: rectA.left, y: rectA.bottom }
    ];
    const cornersB = [
        { x: rectB.left, y: rectB.top },
        { x: rectB.right, y: rectB.top },
        { x: rectB.right, y: rectB.bottom },
        { x: rectB.left, y: rectB.bottom }
    ];
    for (let a of cornersA) {
        for (let b of cornersB) {
            if (Math.abs(a.x - b.x) <= 2 && Math.abs(a.y - b.y) <= 2) return a;
        }
    }
    let minDist = 1e9, res = cornersA[0];
    for (let a of cornersA) for (let b of cornersB) {
        let d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
        if (d < minDist) { minDist = d; res = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }
    }
    return res;
}

// Lấy toạ độ các điểm cần vẽ
function getTamHopPoints(menhIdx) {
    const mapping = mappingTamHopCungMenh[menhIdx];
    if (!mapping) return { start: { x: 0, y: 0 }, ends: [] };
    // Start
    let start;
    if (mapping.start.type === 'edge') {
        const rect = getCellRect(mapping.start.cell);
        start = getEdgeMid(rect, mapping.start.edge);
    } else if (mapping.start.type === 'corner') {
        const rectA = getCellRect(mapping.start.cell[0]);
        const rectB = getCellRect(mapping.start.cell[1]);
        start = getCorner(rectA, rectB);
    }
    // Ends
    let ends = mapping.ends.map(end => {
        if (end.type === 'edge') {
            const rect = getCellRect(end.cell);
            return getEdgeMid(rect, end.edge);
        } else if (end.type === 'corner') {
            const rectA = getCellRect(end.cell[0]);
            const rectB = getCellRect(end.cell[1]);
            return getCorner(rectA, rectB);
        }
    });
    return { start, ends };
}

function drawTamHopLines(svg, start, ends) {
    // Xoá các line cũ
    svg.querySelectorAll('.tam-hop-line').forEach(e => e.remove());
    ends.forEach(end => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', start.x);
        line.setAttribute('y1', start.y);
        line.setAttribute('x2', end.x);
        line.setAttribute('y2', end.y);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('opacity', '0.25');
        line.classList.add('tam-hop-line');
        svg.appendChild(line);
    });
}

// Hàm chính
function drawTamHopByMenhIdx(menhIdx) {
    // Lấy lưới bàn lá số
    const grid = document.getElementById('lasoGrid');
    if (!grid) {
        alert('Không tìm thấy bàn lá số (id="lasoGrid")!');
        return;
    }
    // ĐẢM BẢO grid có position: relative
    grid.style.position = 'relative';

    const rect = grid.getBoundingClientRect();

    // Tạo SVG nếu chưa có, gắn trực tiếp vào #lasoGrid
    let svg = document.getElementById('tamHopSvg');
    if (!svg) {
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'tamHopSvg';
        svg.style.position = 'absolute';
        svg.style.left = 0;
        svg.style.top = 0;
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.zIndex = 20;
        grid.appendChild(svg);
    }
    // Cập nhật lại size SVG
    svg.setAttribute('width', rect.width);
    svg.setAttribute('height', rect.height);
    svg.style.left = 0;
    svg.style.top = 0;

    // Lấy các điểm cần vẽ
    const { start, ends } = getTamHopPoints(menhIdx);
    // Offset các điểm về relative với SVG
    const offset = { x: rect.left, y: rect.top };
    const _start = { x: start.x - offset.x, y: start.y - offset.y };
    const _ends = ends.map(e => ({ x: e.x - offset.x, y: e.y - offset.y }));

    // Vẽ
    drawTamHopLines(svg, _start, _ends);
}