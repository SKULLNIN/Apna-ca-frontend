import TestimonialDetailClient from '@/components/TestimonialDetailClient';

export default function TestimonialDetailPage({ params }: { params: { id: string } }) {
  return <TestimonialDetailClient id={params.id} />;
} 