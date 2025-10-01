import { Metadata } from 'next';
import { getPageBySlug } from '@/lib/cms';
import CMSPageRenderer from '@/components/CMSPageRenderer';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const page = await getPageBySlug(params.slug);
    return {
      title: `${page.title} | AETC 2026`,
      description: page.meta_description || page.title,
      keywords: page.meta_keywords,
    };
  } catch (error) {
    return {
      title: 'Page Not Found | AETC 2026',
    };
  }
}

export default async function CMSPage({ params }: PageProps) {
  try {
    const page = await getPageBySlug(params.slug);
    
    if (!page || page.status !== 'published') {
      notFound();
    }

    return <CMSPageRenderer content={page.content_json} />;
  } catch (error) {
    notFound();
  }
}

