const Mod1 = document.querySelector("[data-Mod1]");
const Mod2 = document.querySelector("[data-Mod2]");
const Mod3 = document.querySelector("[data-Mod3]");

Mod1.addEventListener("click", () => {
    document.getElementById('F-VS-G').style.display='block';
});
Mod2.addEventListener("click", () => {
    document.getElementById('N-D').style.display='block';
});
Mod3.addEventListener("click", () => {
    document.getElementById('N-P').style.display='block';
});


const Mod1off = document.querySelector("[data-Mod1off]");
const Mod2off = document.querySelector("[data-Mod2off]");
const Mod3off = document.querySelector("[data-Mod3off]");

Mod1off.addEventListener("click", () => {
    document.getElementById('F-VS-G').style.display='none';
});
Mod2off.addEventListener("click", () => {
    document.getElementById('N-D').style.display='none';
});
Mod3off.addEventListener("click", () => {
    document.getElementById('N-P').style.display='none';
});