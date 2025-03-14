// Função para trocar as frases motivacionais
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 5000);
slides[0].classList.add('active');

// Função para redirecionar ao clicar no botão "Abrir Task"
function abrirTask() {
    window.open('https://forms.clickup.com/9011833817/f/8cjbayt-7791/8LVM6MSRGMTA3SCR8N', '_blank');
}

function redefinirSenha() {
    window.open('https://console.jumpcloud.com/login', '_blank');
}

function erpbi() {
    window.open('https://erp.gdigital.com.br/greenn/admin/', '_blank');
}

function primeiraConfig() {
    window.location.href = 'public/check/checklist.html';
}

function acessarManual() {
    window.location.href = 'public/Manual/manual.html';
}

function abrirTutoriais() {
    window.location.href = 'public/tutoriais/tutoriais.html';
}

// Modal
const modal = document.getElementById("meuModal");
const btnModal = document.querySelector("#botoes button:last-child");
const span = document.getElementsByClassName("fechar")[0];

function abrirModal() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}