// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // FAQ 아코디언 기능
    initFAQ();
    
    // 스무스 스크롤링
    initSmoothScroll();
    
    // 레이지 로딩
    initLazyLoading();
    
    // 스크롤 애니메이션
    initScrollAnimations();
    
    // 전화번호 클릭 이벤트
    initPhoneClick();
    
    // 이미지 슬라이더
    initImageSlider();
});

// FAQ 아코디언 기능
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentNode;
            const isActive = faqItem.classList.contains('active');
            
            // 모든 FAQ 아이템 닫기
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // 클릭된 아이템만 토글
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// 스무스 스크롤링
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 레이지 로딩
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy-load');
        imageObserver.observe(img);
    });
}

// 스크롤 애니메이션
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature, .review-item, .before-after-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 전화번호 클릭 이벤트 (분석용)
function initPhoneClick() {
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    
    phoneButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 전화 버튼 클릭 시 애니메이션
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 분석 이벤트 전송 (Google Analytics 등)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_click', {
                    event_category: 'engagement',
                    event_label: 'phone_button'
                });
            }
        });
    });
}

// 페이지 로드 성능 최적화
window.addEventListener('load', function() {
    // 중요하지 않은 스타일 지연 로딩
    const nonCriticalCSS = document.createElement('link');
    nonCriticalCSS.rel = 'stylesheet';
    nonCriticalCSS.href = 'non-critical.css';
    document.head.appendChild(nonCriticalCSS);
    
    // 폰트 최적화
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
});

// 스크롤 시 헤더 효과
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header');
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 스크롤 다운
        header.style.transform = 'translateY(-100%)';
    } else {
        // 스크롤 업
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// 모바일 터치 개선
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, { passive: true });
}

// 성능 모니터링
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (entry.entryType === 'navigation') {
                console.log('페이지 로드 시간:', entry.loadEventEnd - entry.loadEventStart);
            }
        });
    });
    
    observer.observe({ entryTypes: ['navigation'] });
}

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('JavaScript 에러:', e.error);
});

// 브라우저 호환성 체크
function checkBrowserSupport() {
    const features = {
        grid: CSS.supports('display', 'grid'),
        flexbox: CSS.supports('display', 'flex'),
        customProperties: CSS.supports('color', 'var(--test)'),
        intersectionObserver: 'IntersectionObserver' in window
    };
    
    // 구형 브라우저 폴백
    if (!features.grid) {
        document.body.classList.add('no-grid');
    }
    
    if (!features.intersectionObserver) {
        // 폴백 구현
        initFallbackAnimations();
    }
}

// 폴백 애니메이션 (구형 브라우저용)
function initFallbackAnimations() {
    const elements = document.querySelectorAll('.feature, .review-item, .before-after-item');
    
    window.addEventListener('scroll', function() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                element.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    });
}

// 접근성 개선
document.addEventListener('keydown', function(e) {
    // Tab 키 사용 시 포커스 표시
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// 페이지 가시성 API 사용
if ('hidden' in document) {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 페이지가 숨겨짐
            console.log('페이지가 백그라운드로 이동');
        } else {
            // 페이지가 다시 보임
            console.log('페이지가 포그라운드로 이동');
        }
    });
}

// 이미지 슬라이더 기능
function initImageSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');
    
    if (!sliderTrack || !slides.length || !indicatorsContainer) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    let validSlides = []; // 실제 로드된 이미지가 있는 슬라이드만 저장
    
    // 유효한 슬라이드 개수 계산
    function getValidSlides() {
        validSlides = [];
        slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img && img.src && !img.src.includes('placeholder')) {
                validSlides.push(index);
            }
        });
        return validSlides.length;
    }
    
    // 화면 크기에 따른 슬라이드 개수 설정
    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }
    
    // 총 슬라이드 그룹 개수 계산
    function getTotalGroups() {
        const validSlideCount = getValidSlides();
        const slidesPerView = getSlidesPerView();
        return Math.ceil(validSlideCount / slidesPerView);
    }
    
    // 인디케이터 동적 생성
    function createIndicators() {
        const totalGroups = getTotalGroups();
        const slidesPerView = getSlidesPerView();
        const validSlideCount = getValidSlides();
        
        // 디버깅용 콘솔 출력
        console.log('Total slides in DOM:', slides.length);
        console.log('Valid slides:', validSlideCount);
        console.log('Slides per view:', slidesPerView);
        console.log('Total groups:', totalGroups);
        
        indicatorsContainer.innerHTML = '';
        
        // 모든 인디케이터 표시
        for (let i = 0; i < totalGroups; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            indicator.dataset.slide = i;
            if (i === currentIndex) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
                restartAutoPlay();
            });
            
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // 슬라이더 위치 업데이트
    function updateSlider() {
        const slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView;
        const translateX = -(currentIndex * slideWidth * slidesPerView);
        
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // 인디케이터 업데이트
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // 다음 슬라이드
    function nextSlide() {
        const totalGroups = getTotalGroups();
        if (totalGroups <= 1) return; // 그룹이 1개 이하면 이동하지 않음
        
        if (currentIndex < totalGroups - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }
    
    // 이전 슬라이드
    function prevSlide() {
        const totalGroups = getTotalGroups();
        if (totalGroups <= 1) return; // 그룹이 1개 이하면 이동하지 않음
        
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalGroups - 1;
        }
        updateSlider();
    }
    
    // 자동 재생 시작
    function startAutoPlay() {
        const totalGroups = getTotalGroups();
        if (totalGroups > 1) { // 그룹이 2개 이상일 때만 자동 재생
            autoPlayInterval = setInterval(nextSlide, 3000);
        }
    }
    
    // 자동 재생 정지
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // 자동 재생 다시 시작
    function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // 이미지 확대 기능
    function initImageExpansion() {
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('click', () => {
                    modalImage.src = img.src;
                    modalImage.alt = img.alt;
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                });
            }
        });
        
        // 모달 닫기
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // 이미지 로딩 처리
    function initImageLoading() {
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('error', function() {
                    const placeholder = 'https://via.placeholder.com/600x300/FFA500/FFFFFF?text=시공+전후+비교';
                    this.src = placeholder;
                    this.classList.add('loaded');
                });
                
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
                
                if (img.complete) {
                    img.classList.add('loaded');
                }
            }
        });
    }
    
    // 터치 이벤트 처리
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }
    
    function handleTouchMove(e) {
        e.preventDefault(); // 스크롤 방지
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            restartAutoPlay();
        }
    }
    
    // 마우스 드래그 이벤트 처리
    function initMouseEvents() {
        let isDragging = false;
        let startX = 0;
        
        sliderTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            sliderTrack.style.cursor = 'grabbing';
        });
        
        sliderTrack.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        sliderTrack.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            sliderTrack.style.cursor = 'grab';
            
            const endX = e.clientX;
            const swipeDistance = startX - endX;
            const swipeThreshold = 50;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                restartAutoPlay();
            }
        });
        
        sliderTrack.addEventListener('mouseleave', () => {
            isDragging = false;
            sliderTrack.style.cursor = 'grab';
        });
    }
    
    // 이벤트 리스너 등록
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            restartAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            restartAutoPlay();
        });
    }
    
    // 터치 이벤트 등록
    sliderTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
    sliderTrack.addEventListener('touchmove', handleTouchMove, { passive: false });
    sliderTrack.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // 화면 크기 변경 시 슬라이더 업데이트
    window.addEventListener('resize', () => {
        const totalGroups = getTotalGroups();
        if (currentIndex >= totalGroups) {
            currentIndex = totalGroups - 1;
        }
        createIndicators();
        updateSlider();
    });
    
    // 슬라이더에 마우스 오버시 자동재생 일시정지
    sliderTrack.addEventListener('mouseenter', stopAutoPlay);
    sliderTrack.addEventListener('mouseleave', startAutoPlay);
    
    // 초기화
    createIndicators();
    initImageLoading();
    initImageExpansion();
    initMouseEvents();
    updateSlider();
    startAutoPlay();
}

// 초기화 함수 호출
checkBrowserSupport();

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #FFA500 !important;
        outline-offset: 2px;
    }
    
    .no-grid .before-after-grid,
    .no-grid .features,
    .no-grid .reviews-grid {
        display: block;
    }
    
    .no-grid .before-after-item,
    .no-grid .feature,
    .no-grid .review-item {
        margin-bottom: 30px;
    }
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .fonts-loaded body {
        font-family: 'Noto Sans KR', sans-serif;
    }
`;
document.head.appendChild(style); 