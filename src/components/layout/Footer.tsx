
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'AECR Score', href: '/aecr-score' },
        { name: 'Benchmarks', href: '/benchmarks' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Integrations', href: '/integrations' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Roadmap', href: '/roadmap' },
      ],
    },
    {
      title: 'Industries',
      links: [
        { name: 'SaaS', href: '/industries/saas' },
        { name: 'Ecommerce', href: '/industries/ecommerce' },
        { name: 'Healthcare', href: '/industries/healthcare' },
        { name: 'Finance', href: '/industries/finance' },
        { name: 'Local Services', href: '/industries/local-services' },
        { name: 'Education', href: '/industries/education' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Playbooks', href: '/playbooks' },
        { name: 'Benchmark Reports', href: '/benchmark-reports' },
        { name: 'Toolbox', href: '/toolbox' },
        { name: 'Videos', href: '/videos' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Contact', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-softgray-50 border-t border-navy-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-navy-900">Bench<span className="text-lilac">marketing</span></span>
            </Link>
            <p className="text-navy-600 mb-6">
              Know how your marketing compares to industry benchmarks, and get AI recommendations to improve.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="https://twitter.com" aria-label="Twitter" className="text-navy-500 hover:text-navy-800">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-navy-500 hover:text-navy-800">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-navy-900 font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-navy-600 hover:text-navy-900 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Signals and Copyright */}
        <div className="border-t border-navy-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              <Link to="/privacy" className="text-navy-600 hover:text-navy-900 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-navy-600 hover:text-navy-900 text-sm">
                Terms of Service
              </Link>
              <Link to="/security" className="text-navy-600 hover:text-navy-900 text-sm">
                Security
              </Link>
              <Link to="/gdpr" className="text-navy-600 hover:text-navy-900 text-sm">
                GDPR
              </Link>
            </div>
            <div className="text-navy-600 text-sm">
              © {year} Benchmarketing. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
