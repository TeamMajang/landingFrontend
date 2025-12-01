// 공통 헤더와 푸터를 동적으로 로드하는 스크립트

async function loadHeader(headerType = 'default') {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    let headerHTML = '';
    
    if (headerType === 'home') {
        // 메인 페이지: 로그인/회원가입 버튼
        headerHTML = `
            <header class="header">
                <div class="container header-inner">
                    <div class="logo" onclick="window.location.href='index.html'">MAJANGDEAL</div>
                    <div class="header-actions">
                        <button id="login-btn" class="btn btn-ghost" type="button" aria-label="로그인">로그인</button>
                        <button id="signup-btn" class="btn btn-primary" type="button" aria-label="회원가입">회원가입</button>
                    </div>
                </div>
            </header>
        `;
    } else {
        // 회원가입 페이지들: 홈 버튼
        headerHTML = `
            <header class="header">
                <div class="container header-inner">
                    <div class="logo" onclick="window.location.href='index.html'">MAJANGDEAL</div>
                    <div class="header-actions">
                        <button class="btn btn-ghost" type="button" onclick="window.location.href='index.html'">홈</button>
                    </div>
                </div>
            </header>
        `;
    }
    
    headerPlaceholder.innerHTML = headerHTML;
    
    // 헤더 로드 후 auth UI 적용 및 이벤트 핸들러 연결
    if (typeof MD_AUTH !== 'undefined') {
        MD_AUTH.applyHeaderUI();
        if (typeof attachHeaderHandlers === 'function') {
            attachHeaderHandlers();
        }
    }
}

async function loadFooter(footerType = 'default') {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    let footerHTML = '';
    
    if (footerType === 'full') {
        // 메인 페이지, contact 페이지: 서비스 + 고객지원
        footerHTML = `
            <footer class="footer">
                <div class="container footer-inner">
                    <div class="footer-left">
                        <div class="logo footer-logo">MAJANGDEAL</div>
                        <p class="footer-text">믿을 수 있는 산지 거래 플랫폼</p>
                    </div>
                    <div class="footer-links">
                        <div>
                            <div class="footer-heading">서비스</div>
                            <a href="#">판매하기</a>
                            <a href="#">구매하기</a>
                            <a href="#">알림 설정</a>
                        </div>
                        <div>
                            <div class="footer-heading">고객지원</div>
                            <a href="#">고객센터</a>
                            <a href="#">자주 묻는 질문</a>
                            <a href="#">공지사항</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    } else {
        // 회원가입 페이지들: 정책만
        footerHTML = `
            <footer class="footer">
                <div class="container footer-inner">
                    <div class="footer-left">
                        <div class="logo footer-logo">MAJANGDEAL</div>
                        <p class="footer-text">믿을 수 있는 산지 거래 플랫폼</p>
                    </div>
                    <div class="footer-links">
                        <div>
                            <div class="footer-heading">정책</div>
                            <a href="terms-of-service.html">이용약관</a>
                            <a href="privacy-policy.html">개인정보처리방침</a>
                            <a href="privacy-consent.html">개인정보 수집 및 이용동의서</a>
                            <a href="#">고객센터:070-8144-9013</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
    
    footerPlaceholder.innerHTML = footerHTML;
}

// 페이지 로드 시 헤더/푸터 로드
document.addEventListener('DOMContentLoaded', () => {
    const headerType = document.body.dataset.headerType || 'default';
    const footerType = document.body.dataset.footerType || 'default';
    
    loadHeader(headerType);
    loadFooter(footerType);
});

