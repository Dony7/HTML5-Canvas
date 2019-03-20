window.onload = function () {

    const canvas = document.querySelector("#draw");
    const ctx = canvas.getContext("2d");
    const large = document.querySelector(".large_brush");
    const medium = document.querySelector(".medium_brush");
    const small = document.querySelector(".small_brush");
    const brushes = document.querySelectorAll(".brush");
    const clear = document.querySelector(".clear");
    let color = document.querySelector(".color");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let isDrawing = false;
    let x = 0;
    let y = 0;

    function draw(e) {
        if (isDrawing) {
            ctx.lineWidth = brushThickness();
            colorChoice();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
        }

        x = e.offsetX;
        y = e.offsetY;

    };

    for (let i = 0; i < brushes.length; i++) {
        brushes[i].addEventListener('click', toggleSelector);
    }

    function toggleSelector() {
        for (let j = 0; j < brushes.length; j++) {
            brushes[j].classList.remove("selected");
        }

        this.classList.toggle("selected");

    }

    function brushThickness() {
        if (large.classList.contains("selected")) {
            return 100;
        }

        if (medium.classList.contains("selected")) {
            return 60;
        }

        if (small.classList.contains("selected")) {
            return 25;
        }
    }

    function colorChoice() {
        ctx.strokeStyle = document.getElementById("myColor").value;
    }

    function clearCanvas() {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function changeBrushColor() {
        for (let j = 0; j < brushes.length; j++) {
            brushes[j].style.backgroundColor = color.value;
        }


    }

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    clear.addEventListener('click', clearCanvas);
    color.addEventListener('change', changeBrushColor);

}