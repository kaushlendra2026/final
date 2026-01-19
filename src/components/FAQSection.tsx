import { useState } from 'react';
import { HelpCircle, ChevronDown, Mail, MessageCircle } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSections = [
    {
      title: 'Returns & Refunds',
      questions: [
        {
          q: 'Do you accept returns?',
          a: 'Since all our products are custom 3D printed on demand, we don\'t accept general returns. However, we provide replacements for manufacturing defects or damages. Please refer to our Return and Refund Policy for complete details.'
        },
        {
          q: 'What if my item arrives damaged?',
          a: 'Contact us within 7 days with photos of the damage at kaushlendra.pandey@pickaxelab.com and we\'ll arrange a free replacement once approved by our team.'
        },
        {
          q: 'Can I cancel my order?',
          a: 'Order cancellation can be made if it\'s not a custom order and the order has not been dispatched. Please reach out to us via our WhatsApp to request cancellation.'
        },
        {
          q: 'How long does it take to get a replacement?',
          a: 'Replacements usually take 3-5 working days. Please reach out to us for a more accurate timeline based on your specific order.'
        }
      ]
    },
    {
      title: 'About Our Products',
      questions: [
        {
          q: 'Why are your products made-to-order?',
          a: 'We provide unique trending products and self-manufacture everything. Not keeping inventory helps us keep our costs low and allows us to offer you better prices while reducing waste.'
        },
        {
          q: 'What materials are used?',
          a: 'All generic orders listed on our website are made using PLA filaments or PETG. However, we also provide printing in a wide variety of materials including ABS, ASA, Carbon Fibre, Nylon, Resin, and more for custom orders.'
        },
        {
          q: 'Can I request custom modifications?',
          a: 'Yes! Custom orders are available. Please visit our Custom Order page to place your custom order request.'
        }
      ]
    }
  ];

  const toggleQuestion = (sectionIndex: number, questionIndex: number) => {
    const index = `${sectionIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 section-badge mb-4">
          <HelpCircle className="w-5 h-5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
          Have Questions?
        </h2>
        <p className="text-muted-foreground">
          Find answers to common questions about our products and policies.
        </p>
      </div>

      <div className="space-y-6">
        {faqSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="glass-card p-6">
            <h3 className="font-display font-bold text-xl mb-6 text-primary">
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.questions.map((item, questionIndex) => {
                const index = `${sectionIndex}-${questionIndex}`;
                const isOpen = openIndex === index;
                
                return (
                  <div
                    key={questionIndex}
                    className="border border-border/50 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(sectionIndex, questionIndex)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
                    >
                      <span className="font-semibold pr-4">Q: {item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4">
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Contact Section */}
        <div className="glass-card p-6">
          <h3 className="font-display font-bold text-xl mb-4 text-primary">
            Still Have Questions?
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            For any other questions, feel free to reach out to us:
          </p>
          <div className="space-y-3">
            <a
              href="https://wa.me/917376713453"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
            >
              <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">WhatsApp</p>
                <p className="text-xs text-muted-foreground">+91-7376713453</p>
              </div>
            </a>
            <a
              href="mailto:kaushlendra.pandey@pickaxelab.com"
              className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
            >
              <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Email</p>
                <p className="text-xs text-muted-foreground">kaushlendra.pandey@pickaxelab.com</p>
              </div>
            </a>
            <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Response time:</span> 1-2 business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
