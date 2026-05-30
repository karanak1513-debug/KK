<?php
/**
 * Plugin Name: Antigravity B2B Core
 * Plugin URI: https://example.com/antigravity-b2b-plugin
 * Description: Core functionality for the B2B eCommerce Platform. Converts WooCommerce into a Quote/Catalog only system.
 * Version: 1.0.0
 * Author: Antigravity AI
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * 1. Hide Price and Add to Cart if user is not logged in OR universally for B2B.
 * As per requirements: Buyers browse the catalog, request quotes.
 * No direct checkout or payment gateway needed.
 */
add_action( 'init', 'antigravity_b2b_catalog_mode' );
function antigravity_b2b_catalog_mode() {
    // Remove Add to Cart button from Shop page
    remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
    
    // Remove Add to Cart button from Single Product page
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
    
    // Optional: Hide Prices if needed. Uncomment to hide prices entirely.
    // remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );
    // remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
}

/**
 * 2. Add "Request Quote" and "Send Enquiry" Buttons
 */
add_action( 'woocommerce_single_product_summary', 'antigravity_b2b_add_quote_buttons', 30 );
function antigravity_b2b_add_quote_buttons() {
    echo '<div style="margin-top: 20px; display: flex; gap: 10px;">';
    // Link to the Enquiry Page
    echo '<a href="' . esc_url( home_url( '/product-enquiry/' ) ) . '?product_id=' . get_the_ID() . '" class="button alt" style="background-color: var(--secondary-color); color: white;">Send Enquiry</a>';
    
    // If YITH Request a Quote is installed, its button will be appended automatically.
    // If not, we can provide a fallback link to a generic quote page.
    echo '<a href="' . esc_url( home_url( '/request-quote/' ) ) . '?product_id=' . get_the_ID() . '" class="button" style="background-color: var(--primary-color); color: white;">Request Quote</a>';
    echo '</div>';
}

/**
 * 3. Add Custom Product Fields (MOQ, PDF Brochure)
 */
add_action( 'woocommerce_product_options_general_product_data', 'antigravity_b2b_custom_fields' );
function antigravity_b2b_custom_fields() {
    global $woocommerce, $post;
    
    echo '<div class="options_group">';
    
    // MOQ Field
    woocommerce_wp_text_input( array(
        'id'          => '_b2b_moq',
        'label'       => __( 'Minimum Order Quantity (MOQ)', 'antigravity-b2b' ),
        'placeholder' => 'e.g. 50',
        'desc_tip'    => 'true',
        'description' => __( 'Enter the minimum order quantity for this product.', 'antigravity-b2b' )
    ) );
    
    // PDF Brochure Link Field
    woocommerce_wp_text_input( array(
        'id'          => '_b2b_pdf_brochure',
        'label'       => __( 'PDF Brochure URL', 'antigravity-b2b' ),
        'placeholder' => 'http://...',
        'desc_tip'    => 'true',
        'description' => __( 'Enter the URL of the PDF brochure for this product.', 'antigravity-b2b' )
    ) );
    
    echo '</div>';
}

add_action( 'woocommerce_process_product_meta', 'antigravity_b2b_save_custom_fields' );
function antigravity_b2b_save_custom_fields( $post_id ) {
    $moq = isset( $_POST['_b2b_moq'] ) ? sanitize_text_field( $_POST['_b2b_moq'] ) : '';
    update_post_meta( $post_id, '_b2b_moq', $moq );
    
    $pdf = isset( $_POST['_b2b_pdf_brochure'] ) ? esc_url_raw( $_POST['_b2b_pdf_brochure'] ) : '';
    update_post_meta( $post_id, '_b2b_pdf_brochure', $pdf );
}

/**
 * 4. Display Custom Fields on Single Product Page
 */
add_action( 'woocommerce_single_product_summary', 'antigravity_b2b_display_custom_fields', 25 );
function antigravity_b2b_display_custom_fields() {
    global $post;
    
    $moq = get_post_meta( $post->ID, '_b2b_moq', true );
    $pdf = get_post_meta( $post->ID, '_b2b_pdf_brochure', true );
    
    echo '<div class="b2b-product-meta" style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 4px;">';
    
    if ( ! empty( $moq ) ) {
        echo '<p><strong>' . __( 'MOQ:', 'antigravity-b2b' ) . '</strong> ' . esc_html( $moq ) . '</p>';
    }
    
    if ( ! empty( $pdf ) ) {
        echo '<p><a href="' . esc_url( $pdf ) . '" target="_blank" class="button button-outline">' . __( 'Download PDF Brochure', 'antigravity-b2b' ) . '</a></p>';
    }
    
    echo '</div>';
}
