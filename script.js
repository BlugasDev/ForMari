// Data do aniversário (06 de fevereiro de 2026)
const birthdayDate = new Date('2026-02-06T00:00:00').getTime();

// Função para atualizar a contagem regressiva
function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Cálculos de tempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Atualizar os elementos HTML com formatação de dois dígitos
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Quando a contagem terminar
    if (distance < 0) {
        clearInterval(countdownInterval);
        
        // Esconder a contagem regressiva
        document.getElementById('countdown').style.display = 'none';
        document.querySelector('.countdown-title').style.display = 'none';
        
        // Mostrar a mensagem de aniversário com animação
        const birthdayMessage = document.getElementById('birthdayMessage');
        birthdayMessage.style.display = 'block';
        
        // Adicionar confetes (opcional - efeito visual)
        createConfetti();
    }
}

// Função para criar efeito de confetes
function createConfetti() {
    const colors = ['#FFB6C1', '#FFDAB9', '#FFE4E1', '#FFC0CB', '#FFDEAD'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.opacity = '0.8';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            document.body.appendChild(confetti);
            
            // Animação de queda
            const duration = Math.random() * 3 + 2;
            const rotation = Math.random() * 720 - 360;
            const xMovement = Math.random() * 200 - 100;
            
            confetti.animate([
                {
                    transform: `translate(0, 0) rotate(0deg)`,
                    opacity: 0.8
                },
                {
                    transform: `translate(${xMovement}px, ${window.innerHeight + 20}px) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            // Remover o elemento após a animação
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 30);
    }
}

// Adicionar efeito de brilho nos números ao mudar
let previousValues = {
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
};

function addGlowEffect(elementId) {
    const element = document.getElementById(elementId);
    element.style.transition = 'all 0.3s ease';
    element.style.transform = 'scale(1.1)';
    element.style.textShadow = '0 0 20px rgba(192, 128, 112, 0.6)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.textShadow = '0 2px 8px rgba(192, 128, 112, 0.2)';
    }, 300);
}

// Função aprimorada de atualização com efeitos
function updateCountdownWithEffects() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const currentValues = {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    };

    // Atualizar e adicionar efeito se o valor mudou
    Object.keys(currentValues).forEach(key => {
        if (currentValues[key] !== previousValues[key]) {
            document.getElementById(key).textContent = currentValues[key];
            addGlowEffect(key);
            previousValues[key] = currentValues[key];
        }
    });

    // Quando a contagem terminar
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').style.display = 'none';
        document.querySelector('.countdown-title').style.display = 'none';
        
        const birthdayMessage = document.getElementById('birthdayMessage');
        birthdayMessage.style.display = 'block';
        
        createConfetti();
        
        // Repetir confetes a cada 5 segundos
        setInterval(createConfetti, 5000);
    }
}

// Iniciar a contagem regressiva
const countdownInterval = setInterval(updateCountdownWithEffects, 1000);

// Executar imediatamente para não esperar 1 segundo
updateCountdownWithEffects();

// Adicionar animação suave ao scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de parallax suave no scroll
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const container = document.querySelector('.container');
    
    // Efeito parallax muito sutil
    if (container) {
        const offset = scrollY * 0.02;
        container.style.transform = `translateY(${offset}px)`;
    }
    
    lastScrollY = scrollY;
}, { passive: true });

// Adicionar efeito de fade-in aos elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar seções para animação de entrada
document.querySelectorAll('.text-section, .poem-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Efeito de partículas flutuantes (opcional)
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'radial-gradient(circle, rgba(255, 182, 193, 0.6), transparent)';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '0';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 15 + 10;
    const xMovement = Math.random() * 100 - 50;
    
    particle.animate([
        {
            transform: `translate(0, 0)`,
            opacity: 0
        },
        {
            transform: `translate(${xMovement}px, ${-window.innerHeight - 100}px)`,
            opacity: 0.6
        },
        {
            transform: `translate(${xMovement * 2}px, ${-window.innerHeight * 2}px)`,
            opacity: 0
        }
    ], {
        duration: duration * 1000,
        easing: 'linear'
    });
    
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Criar partículas periodicamente
setInterval(createFloatingParticle, 3000);

// Iniciar com algumas partículas
for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingParticle, i * 600);
}

console.log('💌 Carta literária carregada com sucesso!');
console.log('🎂 Contagem regressiva para: 06/02/2026');
