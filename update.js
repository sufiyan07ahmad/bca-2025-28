const fs = require('fs');

const fileBuffer = fs.readFileSync('gallery.html');
const content = fileBuffer.toString('utf-8');

const lines = content.split('\n');

// We need to replace lines 177 to 503. (0-indexed 177 to 503 means lines 178 to 504 are replaced)
const preamble = lines.slice(0, 177).join('\n');
const endamble = lines.slice(504).join('\n'); // keep </body> and </html>

const replacement = `        <div id="carousels-container" class="w-full flex flex-col gap-16 md:gap-24 mb-10">
            <!-- Carousels injected via JS -->
        </div>

        <!-- Full Album Grid Section -->
        <div id="full-album" class="hidden opacity-0 transition-opacity duration-700 mt-10 md:mt-20 border-t border-outline-variant/20 pt-16 md:pt-20">
            <div class="mb-10 md:mb-16 flex flex-col items-center text-center max-w-4xl mx-auto">
                <span class="inline-block px-4 py-1.5 rounded-full bg-secondary text-white font-headline font-bold text-xs uppercase tracking-widest mb-4 md:mb-6">Complete Album</span>
                <h2 id="album-title-text" class="text-3xl sm:text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight mb-4 md:mb-6">
                    Archive
                </h2>
                <p id="album-desc-text" class="text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    Click on any image to expand and view the full gallery.
                </p>
            </div>
            
            <!-- Masonry Grid -->
            <div id="masonry-grid" class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
                <!-- Images injected via JS -->
            </div>
        </div>
        
        <!-- Fullscreen Lightbox -->
        <div id="lightbox" class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
            <button id="lb-close" class="absolute top-4 right-4 md:top-6 md:right-6 z-[110] w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-all hover:scale-110 shadow-xl cursor-pointer">
                <span class="material-symbols-outlined text-xl md:text-3xl">close</span>
            </button>
            <button id="lb-prev" class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-all hover:scale-110 shadow-xl cursor-pointer">
                <span class="material-symbols-outlined text-xl md:text-3xl">arrow_back_ios_new</span>
            </button>
            <button id="lb-next" class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-all hover:scale-110 shadow-xl cursor-pointer">
                <span class="material-symbols-outlined text-xl md:text-3xl">arrow_forward_ios</span>
            </button>
            <div class="relative max-w-[100vw] sm:max-w-[90vw] max-h-[100vh] sm:max-h-[90vh] flex items-center justify-center p-0 sm:p-4">
                <img id="lightbox-img" src="" alt="Enlarged Image" class="max-w-[100vw] sm:max-w-full max-h-[80vh] sm:max-h-[90vh] object-contain rounded-none sm:rounded-lg shadow-none sm:shadow-2xl border-none sm:border border-white/10">
                <div id="lb-counter" class="absolute -bottom-10 sm:-bottom-10 left-1/2 -translate-x-1/2 text-white/90 sm:text-white/70 bg-black/50 sm:bg-transparent px-3 py-1 rounded-full sm:rounded-none font-label text-xs sm:text-sm tracking-widest uppercase font-bold">1 / x</div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-100 dark:bg-slate-900 w-full py-10 md:py-12 px-4 md:px-8 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <div class="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
            <div class="space-y-4">
                <div class="flex items-center justify-center md:justify-start gap-3">
                    <img alt="Tetso Logo" class="h-8 w-auto grayscale brightness-50 dark:brightness-200" src="static/carousel/tetso-logo.png"/>
                    <span class="font-headline font-bold text-lg text-cyan-950 dark:text-cyan-50">Tetso Unofficial</span>
                </div>
                <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto md:mx-0">An independent community space created and managed by the students of Tetso College.</p>
            </div>
            <div class="md:text-right space-y-4">
                <p class="text-slate-500 dark:text-slate-400 font-body text-sm">© 2024 Student Hub. Keep Striving.</p>
                <div class="flex justify-center md:justify-end gap-6">
                    <span class="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">share</span>
                    <span class="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">alternate_email</span>
                    <span class="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">groups</span>
                </div>
            </div>
        </div>
    </footer>

    <script>
        const ALBUMS = [
            {
                id: 'picnic',
                title: 'Dept. Picnic 2026',
                folder: 'DeptPicnic2026',
                total: 26,
                slidesText: [
                    { t: 'Dept. Picnic 2026', d: 'A wonderful day out with the entire department, building memories that last forever.' },
                    { t: 'Dept. Picnic 2026', d: 'Fun, food, and endless conversations under the sun.' },
                    { t: 'Dept. Picnic 2026', d: 'Unwinding with friends and faculties outside the classrooms.' },
                    { t: 'Dept. Picnic 2026', d: 'Capturing candid moments and laughter throughout the day.' }
                ]
            },
            {
                id: 'powwow',
                title: 'PowWow 2026',
                folder: 'PowWow2026',
                total: 35,
                slidesText: [
                    { t: 'PowWow 2026', d: 'A spectacular showcase of performing arts, culture, and student talent.' },
                    { t: 'PowWow 2026', d: 'Intense inter-house competitions and cheering squads.' },
                    { t: 'PowWow 2026', d: 'Vibrant ethnic wear, traditional dances, and musical performances.' },
                    { t: 'PowWow 2026', d: 'Euphoric crowds celebrating the spirit of Tetso College.' }
                ]
            }
        ];

        // Global Lightbox State
        let currentAlbumId = null;
        let currentImageIndex = 1;
        let lbTotal = 0;
        let lbFolder = "";

        const createCarouselHTML = (album) => {
            return \`
        <div class="relative w-full max-w-[1200px] mx-auto h-[400px] sm:h-[500px] md:h-[700px] bg-black rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl group border-4 md:border-[8px] border-surface-container-high animate-on-scroll">
            
            <div id="\${album.id}-gallery-track" class="w-full h-full relative">
                \${album.slidesText.map((sl, i) => \`
                <div class="\${album.id}-gallery-slide absolute inset-0 w-full h-full transition-all duration-[1200ms] ease-out \${i === 0 ? 'slide-fade-in' : 'slide-fade-out'}" data-title="\${sl.t}" data-desc="\${sl.d}">
                    <img class="w-full h-full object-cover" src="" alt="\${album.title}">
                </div>\`).join('')}
            </div>

            <div class="absolute inset-x-0 bottom-0 top-1/2 glass-overlay pointer-events-none z-20 flex flex-col justify-end p-4 sm:p-8 md:p-14 transition-opacity duration-500 group-hover:opacity-100">
                <div class="transform transition-transform duration-700 translate-y-2 md:translate-y-4 group-hover:translate-y-0">
                    <div class="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
                        <span class="px-2 py-0.5 md:px-3 md:py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] md:text-xs font-bold uppercase tracking-widest border border-white/30 hidden sm:inline-block">Event Highlight</span>
                        <button onclick="window.viewAlbum('\${album.id}')" class="pointer-events-auto px-3 py-1.5 md:px-4 md:py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:-translate-y-0.5 transition-all shadow-lg flex items-center gap-1 shadow-secondary-fixed/30 hover:shadow-secondary-fixed/50 cursor-pointer border-0">View Album <span class="material-symbols-outlined text-[14px]">arrow_downward</span></button>
                    </div>
                    <h3 id="\${album.id}-gallery-title" class="text-3xl sm:text-4xl md:text-6xl font-headline font-extrabold text-white mb-1 md:mb-3 text-shadow-md hover:text-secondary-fixed transition-colors pointer-events-auto cursor-pointer" onclick="window.viewAlbum('\${album.id}')">\${album.title}</h3>
                    <p id="\${album.id}-gallery-desc" class="text-white/90 max-w-2xl text-sm md:text-xl font-body text-shadow-sm font-medium line-clamp-2 md:line-clamp-none">Loading...</p>
                </div>
            </div>

            <button id="\${album.id}-prev-btn" class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white/30 backdrop-blur-lg rounded-full flex items-center justify-center text-white border border-white/20 transition-all transform opacity-100 md:opacity-0 -translate-x-0 md:-translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 focus:opacity-100 hover:scale-110 shadow-xl cursor-pointer">
                <span class="material-symbols-outlined text-xl md:text-3xl">arrow_back_ios_new</span>
            </button>
            <button id="\${album.id}-next-btn" class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white/30 backdrop-blur-lg rounded-full flex items-center justify-center text-white border border-white/20 transition-all transform opacity-100 md:opacity-0 translate-x-0 md:translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 focus:opacity-100 hover:scale-110 shadow-xl cursor-pointer">
                <span class="material-symbols-outlined text-xl md:text-3xl">arrow_forward_ios</span>
            </button>

            <div class="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 p-2 md:gap-3 md:p-3 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
                \${album.slidesText.map((sl, i) => \`<button class="\${album.id}-gallery-indicator w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/50 hover:bg-white transition-all duration-300 focus:outline-none \${i === 0 ? 'indicator-active' : ''}" data-index="\${i}"></button>\`).join('')}
            </div>
            
            <div class="absolute top-4 right-4 md:top-6 md:right-6 z-30 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button id="\${album.id}-pause-btn" class="w-8 h-8 md:w-10 md:h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 transition-colors cursor-pointer">
                    <span class="material-symbols-outlined text-sm md:text-xl" id="\${album.id}-pause-icon">pause</span>
                </button>
            </div>
        </div>\`;
        };

        const setupCarouselLogic = (album) => {
            const prefix = album.id;
            const slides = document.querySelectorAll(\`.\${prefix}-gallery-slide\`);
            const slideImages = document.querySelectorAll(\`.\${prefix}-gallery-slide img\`);
            const indicators = document.querySelectorAll(\`.\${prefix}-gallery-indicator\`);
            const titleEl = document.getElementById(\`\${prefix}-gallery-title\`);
            const descEl = document.getElementById(\`\${prefix}-gallery-desc\`);
            
            const currentImages = [];
            while(currentImages.length < slides.length) {
                const r = Math.floor(Math.random() * album.total) + 1;
                if(!currentImages.includes(r)) currentImages.push(r);
            }
            slideImages.forEach((img, i) => {
                img.src = \`static/Gallery/\${album.folder}/\${currentImages[i]}.jpeg\`;
            });
            
            let currentIndex = 0;
            let slideInterval;
            let isPaused = false;
            
            function updateCarousel(newIndex) {
                const oldIndex = currentIndex;
                slides[oldIndex].classList.remove('slide-fade-in');
                slides[oldIndex].classList.add('slide-fade-out');
                indicators[oldIndex].classList.remove('indicator-active');
                
                currentIndex = newIndex;
                if (currentIndex >= slides.length) currentIndex = 0;
                if (currentIndex < 0) currentIndex = slides.length - 1;
                
                slides[currentIndex].classList.remove('slide-fade-out');
                slides[currentIndex].classList.add('slide-fade-in');
                indicators[currentIndex].classList.add('indicator-active');
                
                titleEl.textContent = slides[currentIndex].dataset.title;
                descEl.textContent = slides[currentIndex].dataset.desc;
                
                let r = Math.floor(Math.random() * album.total) + 1;
                while(currentImages.includes(r)) {
                    r = Math.floor(Math.random() * album.total) + 1;
                }
                currentImages[oldIndex] = r;
                setTimeout(() => { slideImages[oldIndex].src = \`static/Gallery/\${album.folder}/\${r}.jpeg\`; }, 1200);
            }
            
            function nextSlide() { updateCarousel(currentIndex + 1); }
            function prevSlide() { updateCarousel(currentIndex - 1); }
            
            function startAutoPlay() {
                if(slideInterval) clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 4000);
            }
            startAutoPlay();
            
            document.getElementById(\`\${prefix}-prev-btn\`).addEventListener('click', () => { prevSlide(); if(!isPaused) startAutoPlay(); });
            document.getElementById(\`\${prefix}-next-btn\`).addEventListener('click', () => { nextSlide(); if(!isPaused) startAutoPlay(); });
            document.getElementById(\`\${prefix}-pause-btn\`).addEventListener('click', () => {
                isPaused = !isPaused;
                if(isPaused) { clearInterval(slideInterval); document.getElementById(\`\${prefix}-pause-icon\`).textContent='play_arrow'; } 
                else { startAutoPlay(); document.getElementById(\`\${prefix}-pause-icon\`).textContent='pause'; }
            });
            indicators.forEach(ind => ind.addEventListener('click', (e) => {
                updateCarousel(parseInt(e.target.dataset.index));
                if(!isPaused) startAutoPlay();
            }));
            
            titleEl.textContent = slides[0].dataset.title;
            descEl.textContent = slides[0].dataset.desc;
        };

        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('carousels-container');
            container.innerHTML = ALBUMS.map(a => createCarouselHTML(a)).join('\\n');
            
            ALBUMS.forEach(a => setupCarouselLogic(a));

            document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = \`opacity 0.6s ease-out \${index * 0.15}s, transform 0.6s ease-out \${index * 0.15}s\`;
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100);
            });
        });

        window.viewAlbum = function(albumId) {
            const albumInfo = ALBUMS.find(a => a.id === albumId);
            if(!albumInfo) return;
            
            const albumEl = document.getElementById('full-album');
            document.getElementById('album-title-text').textContent = albumInfo.title + " Archive";
            
            const grid = document.getElementById('masonry-grid');
            let html = '';
            for(let i = 1; i <= albumInfo.total; i++) {
                html += \`
                    <div class="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer masonry-item" onclick="window.openLightbox('\${albumInfo.id}', \${i})">
                        <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                            <span class="material-symbols-outlined text-white text-5xl transform scale-50 group-hover:scale-100 transition-transform duration-300 drop-shadow-lg">fullscreen</span>
                        </div>
                        <img src="static/Gallery/\${albumInfo.folder}/\${i}.jpeg" alt="\${albumInfo.title} \${i}" class="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-[800ms] ease-out" loading="lazy" onload="this.parentElement.classList.add('loaded')">
                    </div>
                \`;
            }
            grid.innerHTML = html;
            
            albumEl.classList.remove('hidden');
            setTimeout(() => {
                albumEl.classList.remove('opacity-0');
                albumEl.scrollIntoView({behavior: 'smooth'});
            }, 100);
        };

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const counter = document.getElementById('lb-counter');

        window.openLightbox = function(albumId, index) {
            const albumInfo = ALBUMS.find(a => a.id === albumId);
            if(!albumInfo) return;
            currentAlbumId = albumId;
            lbFolder = albumInfo.folder;
            lbTotal = albumInfo.total;
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function updateLightbox() {
            lightboxImg.src = \`static/Gallery/\${lbFolder}/\${currentImageIndex}.jpeg\`;
            counter.textContent = \`\${currentImageIndex} / \${lbTotal}\`;
        }

        document.getElementById('lb-next').addEventListener('click', (e) => {
            e.stopPropagation();
            if(!lbFolder) return;
            currentImageIndex = currentImageIndex >= lbTotal ? 1 : currentImageIndex + 1;
            updateLightbox();
        });

        document.getElementById('lb-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            if(!lbFolder) return;
            currentImageIndex = currentImageIndex <= 1 ? lbTotal : currentImageIndex - 1;
            updateLightbox();
        });
        
        document.getElementById('lb-close').addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') document.getElementById('lb-next').click();
            if (e.key === 'ArrowLeft') document.getElementById('lb-prev').click();
        });
    </script>
`;

fs.writeFileSync('gallery.html', preamble + '\\n' + replacement + '\\n' + endamble);
console.log('Successfully updated gallery.html');
