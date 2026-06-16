# 🎮 Accessibility Arcade

> **Componente:** MATC83 - Desenvolvimento de Objetos de Aprendizagem (UFBA)
>  **Link do Jogo:** [CLIQUE AQUI PARA JOGAR](https://eduardaloyola.github.io/accessibility-arcade/)

O **Accessibility Arcade** é um **Objeto de Aprendizagem (OA)** desenvolvido como um jogo retrô 8-bit. O objetivo é ensinar as diretrizes de acessibilidade na Web (WCAG) de forma prática e gamificada.

---

## ⚡ O que o jogo ensina (Habilidades Desbloqueadas)

1. **Semântica Estrutural:** A importância da tag `<h1>` para situar usuários de leitores de tela.
2. **Design Inclusivo:** Regras de contraste mínimo de cor (4.5:1) da WCAG para baixa visão.
3. **Acessibilidade Textual:** Uso do atributo `alt` para descrever imagens informativas.
4. **Auditoria Técnica:** Critérios fundamentais para avaliar a conformidade de uma página.
5. **Estruturas Complexas:** O uso de `scope="col"` em tabelas para guiar sintetizadores de voz.
6. **Destruidor de Bugs:** Um minigame prático para identificar e corrigir código inacessível.

---

## 💻 Estrutura Técnica

O projeto foi estritamente modularizado em três arquivos para seguir as boas práticas de desenvolvimento web:
* **`index.html`**: Estrutura semântica do documento.
* **`style.css`**: Identidade visual retrô/neon e responsividade.
* **`script.js`**: Lógica do jogo, sistema de score, validações e efeitos sonoros.

> 🎵 **Nota de Engenharia:** A trilha sonora e os efeitos (SFX) do jogo são gerados nativamente por código através da **Web Audio API** do JavaScript, eliminando a necessidade de carregar arquivos externos de áudio (`.mp3`).
