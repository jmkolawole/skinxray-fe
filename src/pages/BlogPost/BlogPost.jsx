import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PortableText } from '@portabletext/react';
import * as S from './BlogPost.style';
import logo from '../../assets/images/logo.png';
import { sanityClient, queries, urlFor } from '../../lib/sanity';

// Icons
const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const ImageIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21,15 16,10 5,21" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// Portable Text components for rendering Sanity content
const portableTextComponents = {
  types: {
    image: ({value}) => {
      if (!value?.asset?._ref) return null;
      return (
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Blog image'}
          style={{ width: '100%', borderRadius: '12px', margin: '32px 0' }}
        />
      );
    },
  },
  marks: {
    link: ({children, value}) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      );
    },
  },
};

// Placeholder post data
const PLACEHOLDER_POSTS = {
  'understanding-common-skin-conditions': {
    _id: '1',
    slug: { current: 'understanding-common-skin-conditions' },
    title: 'Understanding Common Skin Conditions: A Comprehensive Guide',
    excerpt: 'Learn about the most common skin conditions affecting millions of people worldwide.',
    category: { title: 'Skin Health', _id: 'cat1' },
    author: { name: 'Dr. Sarah Johnson', initials: 'SJ', bio: 'Board-certified dermatologist with 15+ years of experience' },
    publishedAt: '2026-01-15',
    readTime: '8 min read',
    featuredImage: null,
    tags: ['Skin Health', 'Dermatology', 'Eczema', 'Psoriasis', 'Treatment'],
    content: null,
    htmlContent: `
      <p>Skin conditions affect millions of people worldwide, and understanding them is the first step toward effective management and treatment. In this comprehensive guide, we'll explore some of the most common skin conditions, their causes, symptoms, and available treatment options.</p>

      <h2>What Are Skin Conditions?</h2>
      <p>Skin conditions encompass a wide range of disorders that affect the skin's appearance, texture, or function. They can be temporary or chronic, mild or severe, and may be caused by various factors including genetics, environmental triggers, infections, or immune system responses.</p>

      <h2>Common Types of Skin Conditions</h2>
      
      <h3>1. Eczema (Atopic Dermatitis)</h3>
      <p>Eczema is a chronic condition characterized by dry, itchy, and inflamed skin. It often appears in childhood and can persist into adulthood. Common triggers include:</p>
      <ul>
        <li>Environmental allergens (dust mites, pollen)</li>
        <li>Irritants (soaps, detergents)</li>
        <li>Stress and emotional factors</li>
        <li>Weather changes</li>
      </ul>

      <h3>2. Psoriasis</h3>
      <p>Psoriasis is an autoimmune condition that causes rapid skin cell buildup, resulting in thick, scaly patches. These patches can appear anywhere on the body but commonly affect the scalp, elbows, and knees.</p>

      <blockquote>
        "Understanding your skin condition is the first step toward effective management. Don't hesitate to seek professional help for proper diagnosis and treatment."
      </blockquote>

      <h2>When to Seek Professional Help</h2>
      <p>While many skin conditions can be managed with over-the-counter treatments, it's important to consult a dermatologist if you experience persistent symptoms that don't improve with home care.</p>

      <h2>The Role of AI in Skin Health</h2>
      <p>Modern technology, including AI-powered tools like SkinXray, can help you better understand and monitor your skin health. While these tools don't replace professional medical advice, they can provide valuable insights and help you decide when to seek professional care.</p>
    `,
  },
  'ai-in-dermatology': {
    _id: '2',
    slug: { current: 'ai-in-dermatology' },
    title: 'How AI is Revolutionizing Dermatology and Skin Care',
    excerpt: 'Discover how artificial intelligence is transforming the way we diagnose and treat skin conditions.',
    category: { title: 'Technology', _id: 'cat2' },
    author: { name: 'Michael Chen', initials: 'MC', bio: 'Health technology researcher and writer' },
    publishedAt: '2026-01-12',
    readTime: '6 min read',
    featuredImage: null,
    tags: ['AI', 'Technology', 'Healthcare', 'Innovation', 'Dermatology'],
    content: null,
    htmlContent: `
      <p>Artificial intelligence is transforming healthcare in unprecedented ways, and dermatology is at the forefront of this revolution. From early detection of skin cancer to personalized treatment recommendations, AI is making skin care more accessible and effective than ever before.</p>

      <h2>The Rise of AI in Healthcare</h2>
      <p>Over the past decade, AI has made remarkable strides in medical diagnosis. Machine learning algorithms can now analyze medical images with accuracy that rivals—and sometimes exceeds—that of human experts.</p>

      <h2>How AI Analyzes Skin Conditions</h2>
      <p>AI-powered skin analysis tools use deep learning algorithms trained on millions of dermatological images. These systems can identify potential skin conditions from photographs, detect subtle patterns invisible to the human eye, and provide instant preliminary assessments.</p>

      <h2>Benefits of AI in Dermatology</h2>
      <p>AI tools can bring dermatological expertise to underserved areas where specialists may not be readily available. This democratization of healthcare can lead to earlier detection and better outcomes.</p>

      <blockquote>
        "AI doesn't replace dermatologists—it empowers them. By handling initial screenings, AI allows specialists to focus on complex cases that require their expertise."
      </blockquote>

      <h2>The Future of AI in Skin Health</h2>
      <p>As AI technology continues to evolve, we can expect even more sophisticated tools that integrate with wearable devices, provide real-time monitoring, and offer increasingly personalized recommendations.</p>
    `,
  },
};

const RELATED_POSTS = [
  {
    _id: '3',
    slug: { current: 'skincare-routine-for-beginners' },
    title: 'Building Your Perfect Skincare Routine',
    category: { title: 'Skincare Tips' },
    readTime: '5 min read',
    featuredImage: null,
  },
  {
    _id: '4',
    slug: { current: 'sun-protection-myths' },
    title: '10 Sun Protection Myths Debunked',
    category: { title: 'Sun Care' },
    readTime: '7 min read',
    featuredImage: null,
  },
  {
    _id: '5',
    slug: { current: 'acne-treatment-options' },
    title: 'Modern Acne Treatment Options',
    category: { title: 'Acne' },
    readTime: '9 min read',
    featuredImage: null,
  },
];

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usePlaceholder, setUsePlaceholder] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await sanityClient.fetch(queries.postBySlug(slug));
        
        if (data) {
          setPost(data);
          setUsePlaceholder(false);
          
          // Fetch related posts if we have a category
          if (data.category?._id) {
            const related = await sanityClient.fetch(queries.relatedPosts(data.category._id, data._id));
            if (related && related.length > 0) {
              setRelatedPosts(related);
            } else {
              setRelatedPosts([]);
            }
          } else {
            setRelatedPosts([]);
          }
        } else {
          // No post found in Sanity
          setPost(null);
          setUsePlaceholder(true);
          setRelatedPosts([]);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
        setUsePlaceholder(true);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    try {
      return urlFor(image).width(800).url();
    } catch {
      return null;
    }
  };

  const getPostSlug = (post) => {
    return post.slug?.current || post.slug;
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <S.Container>
        <S.Nav>
          <S.NavLogo to="/">
            <S.LogoIcon>
              <img src={logo} alt="SkinXray AI" />
            </S.LogoIcon>
            <S.LogoText>Skin<span>Xray</span></S.LogoText>
          </S.NavLogo>
          <S.NavButtons>
            <S.NavButton to="/login">Sign In</S.NavButton>
            <S.NavButton to="/signup" $variant="primary">Get Started</S.NavButton>
          </S.NavButtons>
        </S.Nav>
        <S.LoadingContainer>
          <S.SkeletonText $width="100px" $height="24px" $mb="20px" />
          <S.SkeletonText $height="48px" $mb="12px" />
          <S.SkeletonText $width="60%" $height="48px" $mb="24px" />
          <S.SkeletonText $width="300px" $height="20px" $mb="48px" />
          <S.SkeletonImage />
          <S.SkeletonText $mb="16px" />
          <S.SkeletonText $mb="16px" />
          <S.SkeletonText $width="80%" $mb="32px" />
          <S.SkeletonText $mb="16px" />
          <S.SkeletonText $mb="16px" />
          <S.SkeletonText $width="90%" />
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (!post) {
    return (
      <S.Container>
        <S.Nav>
          <S.NavLogo to="/">
            <S.LogoIcon>
              <img src={logo} alt="SkinXray AI" />
            </S.LogoIcon>
            <S.LogoText>Skin<span>Xray</span></S.LogoText>
          </S.NavLogo>
          <S.NavButtons>
            <S.NavButton to="/login">Sign In</S.NavButton>
            <S.NavButton to="/signup" $variant="primary">Get Started</S.NavButton>
          </S.NavButtons>
        </S.Nav>
        <S.ArticleContainer style={{ textAlign: 'center', paddingTop: '100px' }}>
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <S.BackLink to="/blog">
            <ArrowLeftIcon />
            Back to Blog
          </S.BackLink>
        </S.ArticleContainer>
      </S.Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - SkinXray AI Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
      </Helmet>

      <S.Container>
        {/* Navigation */}
        <S.Nav>
          <S.NavLogo to="/">
            <S.LogoIcon>
              <img src={logo} alt="SkinXray AI" />
            </S.LogoIcon>
            <S.LogoText>Skin<span>Xray</span></S.LogoText>
          </S.NavLogo>

          <S.NavButtons>
            <S.NavButton to="/login">Sign In</S.NavButton>
            <S.NavButton to="/signup" $variant="primary">Get Started</S.NavButton>
          </S.NavButtons>
        </S.Nav>

        {/* Article */}
        <S.ArticleContainer>
          <S.BackLink to="/blog">
            <ArrowLeftIcon />
            Back to Blog
          </S.BackLink>

          <S.ArticleHeader>
            <S.ArticleCategory>{post.category?.title || 'Uncategorized'}</S.ArticleCategory>
            <S.ArticleTitle>{post.title}</S.ArticleTitle>
            <S.ArticleMeta>
              <S.AuthorInfo>
                <S.AuthorAvatar>{post.author?.initials || '?'}</S.AuthorAvatar>
                <S.AuthorName>{post.author?.name || 'Anonymous'}</S.AuthorName>
              </S.AuthorInfo>
              <S.MetaItem>
                <CalendarIcon />
                {formatDate(post.publishedAt)}
              </S.MetaItem>
              <S.MetaItem>
                <ClockIcon />
                {post.readTime || '5 min read'}
              </S.MetaItem>
            </S.ArticleMeta>
          </S.ArticleHeader>

          <S.FeaturedImage>
            {getImageUrl(post.featuredImage) ? (
              <img src={getImageUrl(post.featuredImage)} alt={post.title} />
            ) : (
              <S.ImagePlaceholder>
                <ImageIcon />
              </S.ImagePlaceholder>
            )}
          </S.FeaturedImage>

          <S.ArticleContent>
            {/* Render Sanity Portable Text or fallback to HTML */}
            {post.content && Array.isArray(post.content) ? (
              <PortableText value={post.content} components={portableTextComponents} />
            ) : post.htmlContent ? (
              <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
            ) : (
              <p>{post.excerpt}</p>
            )}
          </S.ArticleContent>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <S.TagsSection>
              <S.TagsLabel>Tags:</S.TagsLabel>
              {post.tags.map((tag, index) => (
                <S.Tag key={index}>{tag}</S.Tag>
              ))}
            </S.TagsSection>
          )}

          {/* Share */}
          <S.ShareSection>
            <S.ShareLabel>Share this article:</S.ShareLabel>
            <S.ShareButtons>
              <S.ShareButton onClick={() => handleShare('twitter')} aria-label="Share on Twitter">
                <TwitterIcon />
              </S.ShareButton>
              <S.ShareButton onClick={() => handleShare('linkedin')} aria-label="Share on LinkedIn">
                <LinkedInIcon />
              </S.ShareButton>
              <S.ShareButton onClick={() => handleShare('facebook')} aria-label="Share on Facebook">
                <FacebookIcon />
              </S.ShareButton>
              <S.ShareButton onClick={() => handleShare('copy')} aria-label="Copy link">
                <LinkIcon />
              </S.ShareButton>
            </S.ShareButtons>
          </S.ShareSection>
        </S.ArticleContainer>

        {/* Related Posts - Only show if there are related posts from Sanity */}
        {relatedPosts.length > 0 && (
          <S.RelatedSection>
            <S.RelatedTitle>Related Articles</S.RelatedTitle>
            <S.RelatedGrid>
              {relatedPosts.map((relatedPost) => (
                <S.RelatedCard key={relatedPost._id} to={`/blog/${getPostSlug(relatedPost)}`}>
                  <S.RelatedImage>
                    {getImageUrl(relatedPost.featuredImage) ? (
                      <img src={getImageUrl(relatedPost.featuredImage)} alt={relatedPost.title} />
                    ) : (
                      <S.ImagePlaceholder>
                        <ImageIcon />
                      </S.ImagePlaceholder>
                    )}
                  </S.RelatedImage>
                  <S.RelatedContent>
                    <S.RelatedCategory>{relatedPost.category?.title || 'Uncategorized'}</S.RelatedCategory>
                    <S.RelatedPostTitle>{relatedPost.title}</S.RelatedPostTitle>
                    <S.RelatedMeta>{relatedPost.readTime || '5 min read'}</S.RelatedMeta>
                  </S.RelatedContent>
                </S.RelatedCard>
              ))}
            </S.RelatedGrid>
          </S.RelatedSection>
        )}

        {/* CTA Section */}
        <S.CTASection>
          <S.CTATitle>Ready to Check Your <span>Skin Health?</span></S.CTATitle>
          <S.CTASubtitle>
            Get instant AI-powered analysis of your skin conditions with SkinXray.
          </S.CTASubtitle>
          <S.CTAButton to="/signup">
            Get Started Free
            <ArrowRightIcon />
          </S.CTAButton>
        </S.CTASection>

        {/* Footer */}
        <S.Footer>
          <S.FooterText>
            © {new Date().getFullYear()} SkinXray AI. All rights reserved. <S.FooterLink to="/">Back to Home</S.FooterLink>
          </S.FooterText>
        </S.Footer>
      </S.Container>
    </>
  );
};

export default BlogPost;
