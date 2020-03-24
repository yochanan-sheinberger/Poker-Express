var theDivs = document.getElementsByTagName("div");
for (let div of theDivs) {
    div.addEventListener("click", myFunc, {once: true});
}

function myFunc(e){
    e.stopPropagation();
    console.log(this.id);
}