// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
	navToggle.addEventListener('click', () => {
		navMenu.classList.toggle('open');
	});
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Intersection-based reveal animations
const animated = document.querySelectorAll('[data-animate]');
if (animated.length) {
	const io = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
				io.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	animated.forEach(el => io.observe(el));
}

// Search filter (client-side demo)
const searchForm = document.getElementById('searchForm');
if (searchForm) {
	searchForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const location = document.getElementById('location').value.trim().toLowerCase();
		const type = document.getElementById('type').value;
		const priceMax = document.getElementById('price').value ? Number(document.getElementById('price').value) : Infinity;

		const cards = document.querySelectorAll('.card.property');
		let visibleCount = 0;
		cards.forEach(card => {
			const cLoc = (card.getAttribute('data-location') || '').toLowerCase();
			const cType = card.getAttribute('data-type') || '';
			const cPrice = Number(card.getAttribute('data-price') || '0');

			const matchesLocation = location ? cLoc.includes(location) : true;
			const matchesType = type ? cType === type : true;
			const matchesPrice = cPrice <= priceMax;
			const isMatch = matchesLocation && matchesType && matchesPrice;

			card.style.display = isMatch ? '' : 'none';
			if (isMatch) visibleCount++;
		});
		// Optional UX: scroll to listings and give subtle feedback
		document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
		if (visibleCount === 0) {
			alert('No listings match your criteria. Try broadening your filters.');
		}
	});
}

// Simple testimonial slider
const slider = document.querySelector('.slider');
if (slider) {
	const slidesTrack = slider.querySelector('.slides');
	const slides = Array.from(slider.querySelectorAll('.slide'));
	const prev = slider.querySelector('.prev');
	const next = slider.querySelector('.next');
	let index = 0;

	function update() {
		const offset = -index * 100;
		slidesTrack.style.transform = `translateX(${offset}%)`;
	}
	function go(dir) {
		index = (index + dir + slides.length) % slides.length;
		update();
	}
	prev?.addEventListener('click', () => go(-1));
	next?.addEventListener('click', () => go(1));

	// Auto-play
	let timer = setInterval(() => go(1), 6000);
	slider.addEventListener('mouseenter', () => clearInterval(timer));
	slider.addEventListener('mouseleave', () => timer = setInterval(() => go(1), 6000));
}

// Contact form (front-end only)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
	contactForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = /** @type {HTMLInputElement} */(document.getElementById('name')).value.trim();
		const email = /** @type {HTMLInputElement} */(document.getElementById('email')).value.trim();
		if (!name || !email) {
			if (formStatus) formStatus.textContent = 'Please provide your name and a valid email.';
			return;
		}
		if (formStatus) {
			formStatus.textContent = 'Thank you — our advisor will reach out shortly.';
		}
		contactForm.reset();
	});
}


