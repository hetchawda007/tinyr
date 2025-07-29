import { redirect } from 'next/navigation';
import { getLinkByShortUrl, incrementLinkClicks } from '../Useractions/Linkactions';
import { notFound } from 'next/navigation';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  // Get the original URL for this short URL
  const originalUrl = await getLinkByShortUrl(slug);

  if (!originalUrl) {
    // If no link found, show 404
    notFound();
  }

  // Increment the click count (in background, don't wait)
  incrementLinkClicks(slug).catch(error => {
    console.error('Error incrementing clicks:', error);
  });

  // Redirect to the original URL
  redirect(originalUrl);
}

export default Page