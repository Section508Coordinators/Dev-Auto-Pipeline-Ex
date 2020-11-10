import { configureAxe } from 'jest-axe';

const axe = configureAxe({
  rules: {
    'accesskeys': { enabled: false },
    'area-alt': { enabled: false },
    'aria-allowed-role': { enabled: false },
    'aria-hidden-body': { enabled: false },
    'aria-required-attr': { enabled: false },
    'aria-required-children': { enabled: false },
    'aria-required-parent': { enabled: false },
    'aria-roledescription': { enabled: false },
    'aria-roles': { enabled: false },
    'aria-valid-attr': { enabled: false },
    'aria-valid-attr-value': { enabled: false },
    'autocomplete-valid': { enabled: false },
    'avoid-inline-spacing': { enabled: false },
    'blink': { enabled: false },
    'bypass': { enabled: false },
    'css-orientation-lock': { enabled: false },
    'definition-list': { enabled: false },
    'dlitem': { enabled: false },
    'duplicate-id-active': { enabled: false },
    'duplicate-id-aria': { enabled: false },
    'focus-order-semantics': { enabled: false },
    'frame-tested': { enabled: false },
    'heading-order': { enabled: false },
    'hidden-content': { enabled: false },
    'html-xml-lang-mismatch': { enabled: false },
    'identical-links-same-purpose': { enabled: false },
    'image-redundant-alt': { enabled: false },
    'label-content-name-mismatch': { enabled: false },
    'label-title-only': { enabled: false },
    'landmark-banner-is-top-level': { enabled: false },
    'landmark-complementary-is-top-level': { enabled: false },
    'landmark-contentinfo-is-top-level': { enabled: false },
    'landmark-main-is-top-level': { enabled: false },
    'landmark-no-duplicate-banner': { enabled: false },
    'landmark-no-duplicate-contentinfo': { enabled: false },
    'landmark-no-duplicate-main': { enabled: false },
    'landmark-one-main': { enabled: false },
    'landmark-unique': { enabled: false },
    'link-in-text-block': { enabled: false },
    'marquee': { enabled: false },
    'meta-refresh': { enabled: false },
    'meta-viewport': { enabled: false },
    'meta-viewport-large': { enabled: false },
    'no-autoplay-audio': { enabled: false },
    'object-alt': { enabled: false },
    'page-has-heading-one': { enabled: false },
    'p-as-heading': { enabled: false },
    'region': { enabled: false },
    'server-side-image-map': { enabled: false },
    'skip-link': { enabled: false },
    'svg-img-alt': { enabled: false },
    'tabindex': { enabled: false },
    'table-duplicate-name': { enabled: false },
    'table-fake-caption': { enabled: false },
    'td-has-header': { enabled: false },
    'th-has-data-cells': { enabled: false }
  }
});

module.exports = axe;
