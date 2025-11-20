import React from 'react';
import Section from '../ui/Section';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Senior Software Engineer',
    company: 'TechCorp',
    quote: 'Refine transformed my generic resume into a targeted pitch. I got 3 interview invites within a week of applying.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    delay: 0
  },
  {
    name: 'Sarah Miller',
    role: 'Product Manager',
    company: 'Innovate Inc',
    quote: 'The gap detection feature is a game-changer. It found keywords I completely missed from the job description.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    delay: 0.2
  },
  {
    name: 'David Park',
    role: 'Data Scientist',
    company: 'DataFlow',
    quote: 'I was struggling with ATS rejections. After using Refine, my application response rate tripled.',
    image: 'https://randomuser.me/api/portraits/men/86.jpg',
    delay: 0.4
  }
];

const TestimonialsSection = () => {
  return (
    <Section className="bg-neutral-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold mb-4"
        >
          Success Stories
        </motion.h2>
        <p className="text-neutral-silver/60 max-w-2xl mx-auto text-lg">
          Join hundreds of professionals who landed their dream jobs with Refine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: testimonial.delay }}
            className="h-full"
          >
            <Card variant="glass" hoverEffect className="h-full p-8 relative bg-white/5 border-white/5">
              <Quote className="absolute top-6 right-6 text-white/10" size={40} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-neutral-400">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
              
              <p className="text-neutral-silver/80 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default TestimonialsSection;
