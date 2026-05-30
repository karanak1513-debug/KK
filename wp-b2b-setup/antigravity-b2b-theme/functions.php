<?php
/**
 * Antigravity B2B Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Theme Setup
function antigravity_b2b_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    // Let WordPress manage the document title.
    add_theme_support( 'title-tag' );

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support( 'post-thumbnails' );

    // Register Navigation Menu
    register_nav_menus( array(
        'menu-1' => esc_html__( 'Primary', 'antigravity-b2b' ),
        'footer' => esc_html__( 'Footer Menu', 'antigravity-b2b' ),
    ) );

    // WooCommerce Support
    add_theme_support( 'woocommerce' );
    // Enlarge product gallery features
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'antigravity_b2b_setup' );

// Enqueue Scripts and Styles
function antigravity_b2b_scripts() {
    // Google Fonts
    wp_enqueue_style( 'antigravity-b2b-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap', array(), null );
    
    // Main Stylesheet
    wp_enqueue_style( 'antigravity-b2b-style', get_stylesheet_uri(), array(), '1.0.0' );
}
add_action( 'wp_enqueue_scripts', 'antigravity_b2b_scripts' );

// Filter WooCommerce "Add to Cart" text to "Request Quote"
add_filter( 'woocommerce_product_single_add_to_cart_text', 'antigravity_b2b_custom_cart_button_text' );
add_filter( 'woocommerce_product_add_to_cart_text', 'antigravity_b2b_custom_cart_button_text' );
function antigravity_b2b_custom_cart_button_text() {
    return __( 'Add to Quote', 'woocommerce' );
}

// Redirect standard checkout to quote page (Assuming YITH or custom quote page exists)
add_action( 'template_redirect', 'antigravity_b2b_redirect_checkout' );
function antigravity_b2b_redirect_checkout() {
    if ( is_checkout() && ! is_wc_endpoint_url( 'order-received' ) ) {
        // Redirect to a custom "Request a Quote" page. Ensure this page is created.
        wp_redirect( home_url( '/request-quote/' ) );
        exit;
    }
}
