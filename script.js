// =========================
// Dados Dinâmicos
// =========================

// Cards informativos sobre o vício em celular
const cardsData = [
    {
        title: "Impacto na Saúde Mental",
        content: "O uso excessivo de celulares pode aumentar ansiedade, depressão e afetar o sono."
    },
    {
        title: "Produtividade",
        content: "Passar muito tempo no celular diminui o foco e a eficiência em tarefas diárias."
    },
    {
        title: "Relacionamentos",
        content: "O vício em celular prejudica a comunicação face a face e pode gerar isolamento social."
    }
];

// Slides do carrossel (dicas)
const carouselData = [
    { text: "Defina horários sem celular para descanso." },
    { text: "Desative notificações desnecessárias." },
    { text: "Pratique atividades físicas longe do aparelho." }
];

// Perguntas frequentes (acordeão)
const accordionData = [
    {
        question: "Como identificar que sou viciado?",
        answer: "Se você sente ansiedade sem o celular ou não consegue se concentrar sem ele, pode ser um sinal."
    },
    {
        question: "Quais são os riscos a longo prazo?",
        answer: "Problemas de sono, postura, visão e saúde mental podem se agravar com o tempo."
    },
    {
        question: "Existe tratamento?",
        answer: "Sim, terapia, aplicativos de controle de tempo e hábitos saudáveis podem ajudar."
    }
];

// =========================
// Renderização Dinâmica
// =========================

// Cards
const cardsContainer = document.querySelector(".cards-container");
cardsData.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.setAttribute("role", "listitem");
    div.innerHTML = `<h3>${card.title}</h3><p>${card.content}</p>`;
    cardsContainer.appendChild(div);
});

// Carrossel
const carouselTrack = document.querySelector(".carousel-track");
carouselData.forEach(slide => {
    const div = document.createElement("div");
    div.className = "carousel-slide";
    div.textContent = slide.text;
    carouselTrack.appendChild(div);
});

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlide(index) {
    const trackWidth = carouselTrack.offsetWidth;
    carouselTrack.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

document.querySelector(".carousel-btn.next").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

// =========================
// Acordeão
// =========================
const accordionContainer = document.querySelector(".accordion-container");
accordionData.forEach(item => {
    const div = document.createElement("div");
    div.className = "accordion-item";
    div.innerHTML = `
        <button class="accordion-header" aria-expanded="false">${item.question}</button>
        <div class="accordion-content"><p>${item.answer}</p></div>
    `;
    accordionContainer.appendChild(div);
});

accordionContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("accordion-header")) {
        const content = e.target.nextElementSibling;
        const expanded = e.target.getAttribute("aria-expanded") === "true";
        e.target.setAttribute("aria-expanded", !expanded);
        content.style.display = expanded ? "none" : "block";
    }
});

// =========================
// Acessibilidade (Fonte e Contraste)
// =========================
const body = document.body;
const increaseBtn = document.getElementById("increase-font");
const decreaseBtn = document.getElementById("decrease-font");
const toggleContrastBtn = document.getElementById("toggle-contrast");

increaseBtn.addEventListener("click", () => {
    const style = window.getComputedStyle(body);
    let currentSize = parseFloat(style.fontSize);
    body.style.fontSize = `${currentSize + 2}px`;
});

decreaseBtn.addEventListener("click", () => {
    const style = window.getComputedStyle(body);
    let currentSize = parseFloat(style.fontSize);
    if(currentSize > 12) body.style.fontSize = `${currentSize - 2}px`;
});

toggleContrastBtn.addEventListener("click", () => {
    body.classList.toggle("high-contrast");
});

// =========================
// Scroll Reveal Simples
// =========================
const sections = document.querySelectorAll("section");

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.animation = "fadeInUp 1s ease forwards";
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(revealSection, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));
