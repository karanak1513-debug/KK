<?php
/**
 * The template for displaying the footer
 */
?>

<footer class="site-footer">
    <div class="container">
        <div class="footer-widgets">
            <!-- Trust Badges & Social Links would go here -->
            <p>Trusted by industry leaders worldwide.</p>
        </div>
        <div class="site-info">
            &copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?>. All rights reserved. <br>
            B2B Platform powered by Antigravity
        </div>
    </div>
</footer>

<!-- Floating WhatsApp Button -->
<?php 
// Example WhatsApp number. This should be a setting in a real plugin.
$whatsapp_number = '+919718503557';
?>
<a href="https://wa.me/<?php echo esc_attr( str_replace('+', '', $whatsapp_number) ); ?>?text=Hello%20I%20have%20an%20enquiry" class="floating-whatsapp" target="_blank" rel="noopener noreferrer">
    &#x1F4AC; <!-- Unicode Chat Icon fallback, FontAwesome would be better here -->
</a>

<?php wp_footer(); ?>
</body>
</html>
