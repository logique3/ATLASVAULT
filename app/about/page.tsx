export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">About AtlasVault</h1>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              AtlasVault is Tunisia's leading digital services marketplace, dedicated to simplifying access to premium global services. We believe everyone deserves easy, affordable, and secure access to streaming subscriptions, telecom services, gaming credits, and business tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-primary mb-2">The Vault</h3>
                <p className="text-muted-foreground">Stream your favorite movies, shows, and music with Netflix, Disney+, Spotify, and more.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-primary mb-2">Telecom Hub</h3>
                <p className="text-muted-foreground">Stay connected with Ooredoo, Orange, and TT internet bundles and mobile top-ups.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-primary mb-2">Gaming Corner</h3>
                <p className="text-muted-foreground">Power up your gaming with Free Fire, PUBG, Steam, PlayStation, and Xbox credits.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-primary mb-2">Business Suite</h3>
                <p className="text-muted-foreground">Boost productivity with Canva Pro, ChatGPT Plus, hosting, and domain services.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose AtlasVault?</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span><strong>24/7 WhatsApp Support:</strong> Get instant help whenever you need it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span><strong>Multiple Payment Methods:</strong> D17, Flouci, and card payments accepted</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span><strong>Instant Delivery:</strong> Services activated within 5-10 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span><strong>Best Prices:</strong> Competitive rates with regular promotions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span><strong>Secure Transactions:</strong> Industry-standard encryption for all payments</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Team</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              AtlasVault was founded by a team of passionate entrepreneurs committed to bridging the gap between Tunisian consumers and global digital services. With years of experience in e-commerce and fintech, we've built a platform that's user-friendly, reliable, and trustworthy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <div className="bg-card border border-border rounded-lg p-8">
              <p className="text-muted-foreground mb-6">Have questions? We'd love to hear from you!</p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground">Email:</p>
                  <a href="mailto:support@atlasvault.tn" className="text-primary hover:underline">support@atlasvault.tn</a>
                </div>
                <div>
                  <p className="font-semibold text-foreground">WhatsApp:</p>
                  <a href="https://wa.me/21695555555" className="text-primary hover:underline">+216 95 555 555</a>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Address:</p>
                  <p className="text-muted-foreground">Tunis, Tunisia</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
