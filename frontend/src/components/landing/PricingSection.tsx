import React from 'react';
import Section from '../ui/Section';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    title: 'Free',
    price: '0',
    description: 'Try it out with a single optimization.',
    features: [
      '1 Resume Optimization',
      'Basic AI Scoring',
      'ATS Keyword Check',
      'LaTeX Download'
    ],
    cta: 'Start Free',
    variant: 'glass' as const,
    popular: false
  },
  {
    title: 'Pro',
    price: '60',
    description: 'Best value for active job seekers.',
    features: [
      '15 Optimizations / month',
      'Advanced AI Rewrite',
      'Job-Specific Tailoring',
      'Priority Processing',
      '₹4 per additional use'
    ],
    cta: 'Get Pro Access',
    variant: 'glass-dark' as const,
    popular: true
  },
  {
    title: 'Pay As You Go',
    price: '10',
    description: 'Flexible pricing for occasional use.',
    features: [
      '1 Optimization Credit',
      'Full Feature Access',
      'No Subscription',
      'Credits Never Expire',
      'Instant Use'
    ],
    cta: 'Buy Credit',
    variant: 'glass' as const,
    popular: false
  }
];

const PricingSection = () => {
  return (
    <Section className="bg-neutral-900 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold mb-4"
        >
          Simple, Transparent Pricing
        </motion.h2>
        <p className="text-neutral-silver/60 max-w-2xl mx-auto text-lg">
          Invest in your career with a plan that pays for itself.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-center">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={plan.popular ? 'md:-mt-4 md:mb-4' : ''}
          >
            <Card 
              variant={plan.variant} 
              className={`h-full relative border-white/10 ${plan.popular ? 'border-primary-500/50 shadow-glow-primary' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-b-lg shadow-lg">
                  MOST POPULAR
                </div>
              )}
              
              <CardHeader className="text-center pb-2 pt-8">
                <CardTitle className="text-2xl mb-2">{plan.title}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm text-neutral-400">₹</span>
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.title === 'Pro' && <span className="text-sm text-neutral-400">/mo</span>}
                  {plan.title === 'Pay As You Go' && <span className="text-sm text-neutral-400">/use</span>}
                </div>
                <p className="text-sm text-neutral-400 mt-4 h-10">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-silver/80">
                      <Check size={16} className={plan.popular ? "text-primary-400 shrink-0 mt-0.5" : "text-neutral-500 shrink-0 mt-0.5"} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  fullWidth 
                  glow={plan.popular}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default PricingSection;
