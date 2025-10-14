document.addEventListener("DOMContentLoaded", () => {
    const handleMouseEvent = e => {
        switch (e.type) {
            case "mouseenter":
                e.target.style.backgroundColor = "lightblue";
                break;
            case "mouseleave":
                e.target.style.backgroundColor = "";
                break;
        }
    };

    const box = document.querySelector(".box");
    box.addEventListener("mouseenter", handleMouseEvent);
    box.addEventListener("mouseleave", handleMouseEvent);
});
