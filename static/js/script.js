document.addEventListener("DOMContentLoaded", function () {
/* Atualiza o contador de tempo desde a data inicial especificada.*/
    function atualizarContador() {
        const dataInicial = new Date("2024-05-24T20:00:00");
        const agora = new Date();
        const diferenca = agora - dataInicial;

        // Garante que os elementos existem antes de tentar acessá-los
        if (!document.getElementById("anos")) return;

        // Calcula o tempo decorrido
        const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365));
        const meses = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const semanas = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7));
        const dias = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        // Função para atualizar os valores e rótulos dinamicamente
        function atualizarElemento(id, valor, singular, plural) {
            const elemento = document.getElementById(id);
            const label = elemento.nextElementSibling; // O próximo elemento span é o rótulo
            
            elemento.innerText = valor; // Atualiza o número
            label.innerText = valor === 1 ? singular : plural; // Ajusta para singular ou plural
        }

        // Atualiza os valores na tela
        atualizarElemento("anos", anos, "Ano", "Anos");
        atualizarElemento("meses", meses, "Mês", "Meses");
        atualizarElemento("semanas", semanas, "Semana", "Semanas");
        atualizarElemento("dias", dias, "Dia", "Dias");
        atualizarElemento("horas", horas, "Hora", "Horas");
        atualizarElemento("minutos", minutos, "Minuto", "Minutos");
        atualizarElemento("segundos", segundos, "Segundo", "Segundos");
    }

    // Atualiza o contador a cada segundo
    setInterval(atualizarContador, 1000);
    atualizarContador(); // Chamada inicial para evitar atraso na atualização

/* Se a página foi recarregada, redireciona para a página inicial.*/
    if (performance.navigation.type === 1 || window.performance.getEntriesByType("navigation")[0].type === "reload") {
        window.location.href = "/";
    }

/* Adiciona um efeito de animação ao contador quando ele entra na tela.*/
    const contador = document.querySelector(".container-contador");

    if (contador) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        contador.classList.add("show"); // Ativa a animação
                    }
                });
            },
            { threshold: 0.3 } // Ativa quando 30% do contador estiver visível
        );

        observer.observe(contador);
    }

/* Efeito de clique no botão de início, aumentando de tamanho e redirecionando.*/
    let cliques = 0;
    const maxCliques = 1;

    function iniciarAnimacaoBotao() {
        const botao = document.getElementById("botaoIndex");
        if (!botao) return;

        botao.addEventListener("click", function (event) {
            event.preventDefault();

            cliques++;
            botao.style.transform = `scale(${1 + cliques * 0.1})`; 
            botao.innerText = `Clique mais!`;

            if (cliques >= maxCliques) {
                botao.innerText = "Redirecionando...";
                setTimeout(() => {
                    window.location.href = "/main";
                }, 500);
            }
        });
    }

    iniciarAnimacaoBotao();

/* Configuração das partículas de fundo.*/
    function iniciarParticulas() {
        particlesJS("particles-js", {
            particles: {
                number: { value: 100 }, // Quantidade de partículas
                shape: { type: "circle" }, // Formato das partículas
                color: { value: "#ffffff" }, // Cor das partículas
                size: { value: 1, random: true }, // Tamanho variável
                opacity: { value: 0.5, random: true }, // Opacidade variável
                move: { speed: 0.5, direction: "top", out_mode: "out" } // Movimento para a direita
            }
        });
    }

/* Carrega a biblioteca de partículas se ainda não estiver carregada*/
    if (typeof particlesJS !== "undefined") {
        iniciarParticulas();
    } else {
        const scriptParticulas = document.createElement("script");
        scriptParticulas.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
        scriptParticulas.onload = iniciarParticulas;
        document.body.appendChild(scriptParticulas);
    }
});
