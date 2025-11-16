window.CONFIG = {
    API_BASE_URL: 'http://localhost:8080/api/v1',

    ENDPOINT: {
        LOGIN: '/members/login',
        LOGOUT: '/members/logout',
        ME: '/members/me',
        SIGNUP: '/members/signup',
        SIGNUP_PAGE: 'terms.html',
        SIGNUP_FORM: 'signup.html',
        REGISTRATION_NUMBER: '/members/business-number/verify',
        CHECK_LOGIN_ID: '/members/check-login-id',
        CATEGORIES: '/categories',
        MYPAGE: '/members',
        AUCTION_PRICE: '/auction-price', // 경락가격 조회 프록시 API
        PRODUCTS: '/products', // 상품 등록 API
    },

    LOGGED_IN: 'logged_in',
    SIGNUP_DATA: 'signup_data', // 회원가입 임시 데이터 저장소

    COOKIE: {
        SESSION_NAME: 'MAJANG_SESSION',
    },

    USE_CREDENTIALS: true,
};
