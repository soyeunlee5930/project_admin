module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    // scss standard rule 적용
    'stylelint-config-prettier-scss',
    // prettier와 충돌하는 부분을 해결
    'stylelint-config-property-sort-order-smacss', // SMACSS 기반으로 속성 정렬
  ],
  plugins: ['stylelint-scss'], // scss 문법을 위한 플러그인
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'order/properties-alphabetical-order': true,
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'selector-list-comma-newline-after': null,
    'no-descending-specificity': null,
  },
};
