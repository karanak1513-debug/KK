<?php
/**
 * The front page template
 */

get_header();
?>

<main id="primary" class="site-main">

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <h1>Professional B2B Equipment & Solutions</h1>
            <p>Browse our extensive catalog of high-quality products. Request a quote today.</p>
            <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn-primary">Browse Catalog</a>
        </div>
    </section>

    <!-- Product Category Grid (Placeholder) -->
    <section class="container" style="padding: 60px 0; text-align: center;">
        <h2>Shop by Category</h2>
        <p>Explore our range of categories for your business needs.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 30px;">
            <?php
            // WooCommerce Shortcode for Product Categories
            echo do_shortcode('[product_categories number="4" columns="4" hide_empty="0" orderby="name" order="ASC"]');
            ?>
        </div>
    </section>

    <!-- Featured Products -->
    <section style="background: var(--background-light); padding: 60px 0;">
        <div class="container">
            <h2 style="text-align: center; margin-bottom: 40px;">Featured Products</h2>
            <?php
            // WooCommerce Shortcode for Featured Products
            echo do_shortcode('[featured_products per_page="4" columns="4"]');
            ?>
        </div>
    </section>

    <!-- Why Choose Us -->
    <section class="container" style="padding: 60px 0; text-align: center;">
        <h2>Why Choose Us</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-top: 40px;">
            <div>
                <h3>Premium Quality</h3>
                <p>All our products meet the highest industry standards.</p>
            </div>
            <div>
                <h3>Bulk Ordering</h3>
                <p>We support large Minimum Order Quantities (MOQ) tailored for B2B.</p>
            </div>
            <div>
                <h3>Dedicated Support</h3>
                <p>Our expert team is available 24/7 to handle your enquiries.</p>
            </div>
        </div>
    </section>

    <!-- Client Logos (Trust Section) -->
    <section style="background: #fff; padding: 40px 0; border-top: 1px solid #eee;">
        <div class="container" style="text-align: center;">
            <h3 style="color: #666; margin-bottom: 20px;">Trusted by Industry Leaders</h3>
            <div style="display: flex; justify-content: center; gap: 30px; opacity: 0.6; flex-wrap: wrap;">
                <!-- Placeholder for Client Logos -->
                <span style="font-size: 24px; font-weight: bold;">Client 1</span>
                <span style="font-size: 24px; font-weight: bold;">Client 2</span>
                <span style="font-size: 24px; font-weight: bold;">Client 3</span>
                <span style="font-size: 24px; font-weight: bold;">Client 4</span>
            </div>
        </div>
    </section>

</main><!-- #primary -->

<?php
get_footer();
