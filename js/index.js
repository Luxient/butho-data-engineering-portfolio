const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const yearElement = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');
const botAnswers = [
    {
        patterns: ['skill', 'stack', 'tool', 'technology', 'tech'],
        answer: 'Butho works across Microsoft Fabric, Fabric Pipelines, Fabric Data Factory, Lakehouse, Warehouse, Power BI, SQL Server, ADLS Gen2, SSIS, Python, SQL, T-SQL, PostgreSQL, Sybase SQL Anywhere, Apache Airflow, Flask, RabbitMQ, and Git.'
    },
    {
        patterns: ['experience', 'work history', 'role', 'job', 'q link', 'qlink'],
        answer: 'Butho is a Data Engineer at Q Link Holdings, where he builds ingestion pipelines, supports Microsoft Fabric Lakehouse and Warehouse layers, develops SQL Server transformation logic, and helps stabilise reporting and refresh processes.'
    },
    {
        patterns: ['fabric', 'microsoft fabric', 'lakehouse', 'warehouse'],
        answer: 'His Microsoft Fabric work includes Fabric Pipelines, Data Factory patterns, Lakehouse and Warehouse layers, shortcuts, lakehouse-to-warehouse flows, and reusable datasets for finance and operational reporting.'
    },
    {
        patterns: ['power bi', 'report', 'semantic', 'dax', 'paginated'],
        answer: 'Butho supports Power BI delivery through semantic models, DAX, paginated reports, curated datasets, refresh troubleshooting, and stakeholder reporting enablement.'
    },
    {
        patterns: ['pipeline', 'etl', 'elt', 'ingestion', 'adls', 'parquet', 'csv', 'sybase'],
        answer: 'He builds Python and platform-based ingestion flows, including extracting from Sybase SQL Anywhere and landing data into ADLS Gen2 in CSV and Parquet formats for downstream Fabric processing.'
    },
    {
        patterns: ['reliability', 'production', 'support', 'refresh', 'gateway', 'authentication', 'failure'],
        answer: 'A strong part of Butho\'s profile is production reliability: resolving authentication, connectivity, gateway, refresh, and data-load failures across Microsoft and hybrid data environments.'
    },
    {
        patterns: ['certification', 'certificate', 'certified', 'dp-203', 'education'],
        answer: 'Butho holds Microsoft Azure Data Engineering Associate (DP-203), IBM Data Engineering, IBM Data Warehouse Engineer, Google Project Management, IBM IT Scrum Master, and Lean Six Sigma White and Yellow Belt credentials.'
    },
    {
        patterns: ['cv', 'resume', 'download'],
        answer: 'You can download Butho\'s CV using the Download CV button near the top of the homepage.'
    },
    {
        patterns: ['contact', 'email', 'phone', 'linkedin', 'hire', 'available'],
        answer: 'You can contact Butho at Mthethwajames5@gmail.com, use the contact page form, or connect on LinkedIn at linkedin.com/in/james-mthethwa-504328198.'
    },
    {
        patterns: ['project', 'delivery', 'portfolio', 'case study', 'impact'],
        answer: 'The delivery section highlights data engineering work such as legacy source ingestion to ADLS Gen2, Fabric Lakehouse and Warehouse layers, SQL transformation layers, Power BI support, and pipeline recovery.'
    }
];

if (yearElement) {
    yearElement.innerHTML = `&copy; ${new Date().getFullYear()} Butho James Mthethwa. All rights reserved.`;
}

if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', document.body.classList.contains('nav-open'));
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

if (contactForm && thankYouMessage) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                thankYouMessage.style.display = 'block';
                contactForm.reset();
            } else {
                alert('There was an issue with your submission. Please try again.');
            }
        }).catch(() => {
            alert('There was an error. Please try again.');
        });
    });
}

function createChatbot() {
    const chatbot = document.createElement('section');
    chatbot.className = 'chatbot';
    chatbot.setAttribute('aria-label', 'Portfolio chatbot');
    chatbot.innerHTML = `
        <button class="chatbot__toggle" type="button" aria-expanded="false" aria-label="Open portfolio chatbot">
            <i class="fas fa-comment-dots" aria-hidden="true"></i>
        </button>
        <div class="chatbot__panel" hidden>
            <div class="chatbot__header">
                <div>
                    <p class="chatbot__eyebrow">Portfolio Assistant</p>
                    <h2>Ask about Butho</h2>
                </div>
                <button class="chatbot__close" type="button" aria-label="Close portfolio chatbot">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <div class="chatbot__messages" aria-live="polite"></div>
            <div class="chatbot__quick-actions" aria-label="Suggested questions">
                <button type="button" data-question="What is Butho's tech stack?">Tech stack</button>
                <button type="button" data-question="Tell me about his Fabric experience.">Fabric</button>
                <button type="button" data-question="How can I contact him?">Contact</button>
            </div>
            <form class="chatbot__form">
                <label class="sr-only" for="chatbotInput">Ask a question</label>
                <input id="chatbotInput" type="text" placeholder="Ask about skills, Fabric, CV..." autocomplete="off">
                <button type="submit" aria-label="Send message">
                    <i class="fas fa-paper-plane" aria-hidden="true"></i>
                </button>
            </form>
        </div>
    `;

    document.body.appendChild(chatbot);

    const toggle = chatbot.querySelector('.chatbot__toggle');
    const close = chatbot.querySelector('.chatbot__close');
    const panel = chatbot.querySelector('.chatbot__panel');
    const messages = chatbot.querySelector('.chatbot__messages');
    const form = chatbot.querySelector('.chatbot__form');
    const input = chatbot.querySelector('#chatbotInput');
    const quickActions = chatbot.querySelectorAll('[data-question]');

    function setOpen(isOpen) {
        panel.hidden = !isOpen;
        toggle.setAttribute('aria-expanded', isOpen);
        toggle.setAttribute('aria-label', isOpen ? 'Close portfolio chatbot' : 'Open portfolio chatbot');

        if (isOpen) {
            input.focus();
        }
    }

    function addMessage(text, type) {
        const message = document.createElement('div');
        message.className = `chatbot__message chatbot__message--${type}`;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function findAnswer(question) {
        const normalisedQuestion = question.toLowerCase();
        const match = botAnswers.find(item => item.patterns.some(pattern => normalisedQuestion.includes(pattern)));

        if (match) {
            return match.answer;
        }

        return 'I can help with Butho\'s skills, Microsoft Fabric work, Power BI experience, delivery examples, certifications, CV, or contact details. Try asking about one of those.';
    }

    function ask(question) {
        const trimmedQuestion = question.trim();

        if (!trimmedQuestion) {
            return;
        }

        addMessage(trimmedQuestion, 'user');
        addMessage(findAnswer(trimmedQuestion), 'bot');
        input.value = '';
    }

    toggle.addEventListener('click', () => {
        setOpen(panel.hidden);
    });

    close.addEventListener('click', () => {
        setOpen(false);
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        ask(input.value);
    });

    quickActions.forEach(button => {
        button.addEventListener('click', () => {
            ask(button.dataset.question);
        });
    });

    addMessage('Hi, I can answer quick questions about Butho\'s data engineering background, Microsoft Fabric work, CV, and contact details.', 'bot');
}

createChatbot();
