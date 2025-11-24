window.CONFIG = {
    // API_BASE_URL: 'http://localhost:8080/api/v1',
    API_BASE_URL: '/api/v1',  // 프로덕션용 (배포시 사용)

    ENDPOINT: {
        LOGIN: '/members/login',
        LOGOUT: '/members/logout',
        ME: '/members/me',
        SIGNUP: '/members/signup',
        SIGNUP_PAGE: 'terms.html',
        SIGNUP_FORM: 'signup.html',
        REGISTRATION_NUMBER: '/members/business-number/verify',
        CHECK_LOGIN_ID: '/members/check-login-id',
        FIND_LOGIN_ID: '/members/find-login-id',
        RESET_PASSWORD: '/members/reset-password',
        CATEGORIES: '/categories',
        CATEGORY_ALERTS: '/category-alerts',
        MYPAGE: '/members/my-page',
        STORE_NAME: '/members/store-name',
        BUSINESS_ADDRESS: '/members/business-address',
        BUSINESS_ADDRESS_DETAIL: '/members/business-address-detail',
        NAME: '/members/name',
        PHONE_NUMBER: '/members/phone-number',
        PASSWORD: '/members/password',
        PHONE_VERIFICATION_SEND: '/verification/phone/send',
        PHONE_VERIFICATION_CONFIRM: '/verification/phone/confirm',
        LIVESTOCK_PRICE: '/livestock-price', // 경락가격 조회 API
        PRODUCTS: '/products', // 상품 등록 API
        MY_SALES: '/products/my', // 내 판매이력 조회 API
    },

    LOGGED_IN: 'logged_in',
    SIGNUP_DATA: 'signup_data', // 회원가입 임시 데이터 저장소

    COOKIE: {
        SESSION_NAME: 'MAJANG_SESSION',
    },

    USE_CREDENTIALS: true,
};
