// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize EmailJS
emailjs.init("rsXMMLe2QDWUnsY2W");

// Loading screen
window.addEventListener('load', () => {
    document.getElementById('loader').classList.add('hidden');
});

// Typed.js
var typed = new Typed('#typed', {
    strings: ['Computer Science Graduate', 'Full Stack Developer', 'Web Engineer', 'UI/UX Enthusiast'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    backDelay: 1500
});

// Custom Cursor
const cursor = document.getElementById('cursor');
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 15 + 'px';
        cursor.style.top = e.clientY - 15 + 'px';
    });
    
    document.querySelectorAll('a, button, .filter-btn, .btn-primary, .btn-outline').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Navbar hide on scroll
let lastScroll = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
    
    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    if (currentScroll > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Scroll to top
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileBtn.addEventListener('click', () => {
    if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'flex';
    } else {
        mobileMenu.style.display = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
let isDark = true;
themeToggle.addEventListener('click', () => {
    if (isDark) {
        document.documentElement.style.setProperty('--darker', '#f5f5f5');
        document.documentElement.style.setProperty('--dark', '#ffffff');
        document.documentElement.style.setProperty('--light', '#0f0f0f');
        document.documentElement.style.setProperty('--glass', 'rgba(0,0,0,0.05)');
        document.body.style.background = '#f5f5f5';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.style.setProperty('--darker', '#0f0f0f');
        document.documentElement.style.setProperty('--dark', '#0a0a0a');
        document.documentElement.style.setProperty('--light', '#ffffff');
        document.documentElement.style.setProperty('--glass', 'rgba(255,255,255,0.03)');
        document.body.style.background = '#0a0a0a';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    isDark = !isDark;
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
};

// Trigger skill animation when in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.disconnect();
        }
    });
});
observer.observe(document.getElementById('skills'));

// Stats counter animation
const stats = [
    { id: 'statProjects', target: 50 },
    { id: 'statClients', target: 30 },
    { id: 'statCode', target: 50000 },
    { id: 'statCoffee', target: 1000 }
];

const animateStats = () => {
    stats.forEach(stat => {
        let current = 0;
        const element = document.getElementById(stat.id);
        const increment = stat.target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                element.textContent = stat.target.toLocaleString() + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.disconnect();
        }
    });
});
statsObserver.observe(document.querySelector('.stats-grid'));

// Projects data
const projects = [
    { title: 'BAKING WEBSITE', category: 'fullstack', desc: 'Analytics platform with AI predictions', tech: ['Next.js', 'Python', 'MongoDB'], image: '../gracias.PNG' },
    { title: 'E-Commerce Platform', category: 'fullstack', desc: 'Full-featured online store', tech: ['React', 'Node.js', 'Stripe'], image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600' },
    { title: 'School Management System', category: 'backend', desc: 'Complete ERP for schools', tech: ['Django', 'React', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600' },
    { title: 'Banking Web App', category: 'frontend', desc: 'Modern banking dashboard', tech: ['Next.js', 'Tailwind', 'Chart.js'], image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600' },
    { title: 'Real-time Chat App', category: 'fullstack', desc: 'Instant messaging platform', tech: ['Socket.io', 'React', 'Express'], image: 'https://images.unsplash.com/photo-1611746872323-1b3b8b9e5c8d?w=600' },
    { title: 'Task Management Platform', category: 'frontend', desc: 'Kanban productivity tool', tech: ['React', 'Dnd-kit', 'Redux'], image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600' }
];

function renderProjects(filter = 'all') {
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = filtered.map(project => `
        <div class="glass-card project-card" data-aos="fade-up">
            <div class="project-image" style="background-image: url('${project.image}')"></div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p style="color: var(--gray); margin: 0.5rem 0;">${project.desc}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
                    ${project.tech.map(t => `<span style="background: var(--glass); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem;">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    AOS.refresh();
}

renderProjects();

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

// Contact form with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('.btn-primary');
    const status = document.getElementById('formStatus');
    
    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.innerHTML = '📧 Sending...';
    
    emailjs.sendForm('service_lfm77ms', 'template_qdrybyz', this)
        .then(() => {
            status.innerHTML = '✅ Message sent successfully!';
            this.reset();
            setTimeout(() => status.innerHTML = '', 5000);
        })
        .catch((error) => {
            status.innerHTML = '❌ Failed: ' + (error.text || 'Unknown error');
            console.error(error);
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Send Message';
        });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});