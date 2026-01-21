import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import * as S from './Blog.style';
import logo from '../../assets/images/logo.png';
import { sanityClient, queries, urlFor } from '../../lib/sanity';

// Placeholder icons
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
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21,15 16,10 5,21" />
  </svg>
);

// Placeholder data for when Sanity has no content yet
const PLACEHOLDER_POSTS = [
  {
    _id: '1',
    slug: { current: 'understanding-common-skin-conditions' },
    title: 'Understanding Common Skin Conditions: A Comprehensive Guide',
    excerpt: 'Learn about the most common skin conditions affecting millions of people worldwide, from eczema to psoriasis, and understand their causes, symptoms, and treatment options.',
    category: { title: 'Skin Health' },
    author: { name: 'Dr. Sarah Johnson', initials: 'SJ' },
    publishedAt: '2026-01-15',
    readTime: '8 min read',
    featured: true,
    featuredImage: null,
  },
  {
    _id: '2',
    slug: { current: 'ai-in-dermatology' },
    title: 'How AI is Revolutionizing Dermatology and Skin Care',
    excerpt: 'Discover how artificial intelligence is transforming the way we diagnose and treat skin conditions, making dermatological care more accessible than ever.',
    category: { title: 'Technology' },
    author: { name: 'Michael Chen', initials: 'MC' },
    publishedAt: '2026-01-12',
    readTime: '6 min read',
    featured: false,
    featuredImage: null,
  },
  {
    _id: '3',
    slug: { current: 'skincare-routine-for-beginners' },
    title: 'Building Your Perfect Skincare Routine: A Beginner\'s Guide',
    excerpt: 'Starting a skincare routine can be overwhelming. This guide breaks down the essentials and helps you create a routine that works for your skin type.',
    category: { title: 'Skincare Tips' },
    author: { name: 'Emma Williams', initials: 'EW' },
    publishedAt: '2026-01-10',
    readTime: '5 min read',
    featured: false,
    featuredImage: null,
  },
  {
    _id: '4',
    slug: { current: 'sun-protection-myths' },
    title: '10 Sun Protection Myths Debunked by Dermatologists',
    excerpt: 'Think you know everything about sunscreen? Dermatologists reveal common misconceptions about sun protection that could be putting your skin at risk.',
    category: { title: 'Sun Care' },
    author: { name: 'Dr. James Park', initials: 'JP' },
    publishedAt: '2026-01-08',
    readTime: '7 min read',
    featured: false,
    featuredImage: null,
  },
  {
    _id: '5',
    slug: { current: 'acne-treatment-options' },
    title: 'Modern Acne Treatment: From Over-the-Counter to Prescription',
    excerpt: 'Explore the full spectrum of acne treatments available today, including new innovations in skincare technology and when to consider professional help.',
    category: { title: 'Acne' },
    author: { name: 'Dr. Lisa Martinez', initials: 'LM' },
    publishedAt: '2026-01-05',
    readTime: '9 min read',
    featured: false,
    featuredImage: null,
  },
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usePlaceholder, setUsePlaceholder] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await sanityClient.fetch(queries.allPosts);
        
        if (data && data.length > 0) {
          setPosts(data);
          setUsePlaceholder(false);
        } else {
          // No content in Sanity yet, use placeholders
          setPosts(PLACEHOLDER_POSTS);
          setUsePlaceholder(true);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback to placeholders on error
        setPosts(PLACEHOLDER_POSTS);
        setUsePlaceholder(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getPostSlug = (post) => {
    return post.slug?.current || post.slug;
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    try {
      return urlFor(image).width(800).url();
    } catch {
      return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog - SkinXray AI | Skin Health Insights & Tips</title>
        <meta name="description" content="Explore our blog for expert insights on skin health, dermatology tips, and the latest in AI-powered skin care technology." />
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

        {/* Hero Section */}
        <S.HeroSection>
          <S.HeroTitle>
            Skin Health <span>Insights</span>
          </S.HeroTitle>
          <S.HeroSubtitle>
            Expert articles, tips, and the latest research on skin health, dermatology, and AI-powered skincare solutions.
          </S.HeroSubtitle>
          {usePlaceholder && (
            <p style={{ color: '#6C757D', fontSize: '14px', marginTop: '16px' }}>
              <em>Showing sample content. Add posts in Sanity Studio to see your own content.</em>
            </p>
          )}
        </S.HeroSection>

        {/* Blog Content */}
        <S.BlogSection>
          {loading ? (
            // Loading skeleton
            <>
              <S.SkeletonCard style={{ marginBottom: '60px' }}>
                <S.SkeletonImage style={{ height: '300px' }} />
                <S.SkeletonContent>
                  <S.SkeletonText $width="100px" $height="24px" $mb="16px" />
                  <S.SkeletonText $height="32px" $mb="12px" />
                  <S.SkeletonText $width="80%" $mb="8px" />
                  <S.SkeletonText $width="60%" />
                </S.SkeletonContent>
              </S.SkeletonCard>
              <S.SectionTitle>Latest Articles</S.SectionTitle>
              <S.LoadingGrid>
                {[1, 2, 3].map((i) => (
                  <S.SkeletonCard key={i}>
                    <S.SkeletonImage />
                    <S.SkeletonContent>
                      <S.SkeletonText $width="80px" $height="20px" $mb="12px" />
                      <S.SkeletonText $height="24px" $mb="8px" />
                      <S.SkeletonText $width="90%" $mb="8px" />
                      <S.SkeletonText $width="70%" />
                    </S.SkeletonContent>
                  </S.SkeletonCard>
                ))}
              </S.LoadingGrid>
            </>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <S.FeaturedPost to={`/blog/${getPostSlug(featuredPost)}`}>
                  <S.FeaturedImage>
                    {getImageUrl(featuredPost.featuredImage) ? (
                      <img src={getImageUrl(featuredPost.featuredImage)} alt={featuredPost.title} />
                    ) : (
                      <S.ImagePlaceholder>
                        <ImageIcon />
                      </S.ImagePlaceholder>
                    )}
                  </S.FeaturedImage>
                  <S.FeaturedContent>
                    <S.FeaturedBadge>Featured</S.FeaturedBadge>
                    <S.CardCategory>{featuredPost.category?.title || 'Uncategorized'}</S.CardCategory>
                    <S.FeaturedTitle>{featuredPost.title}</S.FeaturedTitle>
                    <S.FeaturedExcerpt>{featuredPost.excerpt}</S.FeaturedExcerpt>
                    <S.FeaturedMeta>
                      <S.MetaItem>
                        <CalendarIcon />
                        {formatDate(featuredPost.publishedAt)}
                      </S.MetaItem>
                      <S.MetaItem>
                        <ClockIcon />
                        {featuredPost.readTime || '5 min read'}
                      </S.MetaItem>
                    </S.FeaturedMeta>
                  </S.FeaturedContent>
                </S.FeaturedPost>
              )}

              {/* Regular Posts Grid */}
              <S.SectionTitle>Latest Articles</S.SectionTitle>
              <S.BlogGrid>
                {regularPosts.map((post) => (
                  <S.BlogCard key={post._id} to={`/blog/${getPostSlug(post)}`}>
                    <S.CardImage>
                      {getImageUrl(post.featuredImage) ? (
                        <img src={getImageUrl(post.featuredImage)} alt={post.title} />
                      ) : (
                        <S.ImagePlaceholder>
                          <ImageIcon />
                        </S.ImagePlaceholder>
                      )}
                    </S.CardImage>
                    <S.CardContent>
                      <S.CardCategory>{post.category?.title || 'Uncategorized'}</S.CardCategory>
                      <S.CardTitle>{post.title}</S.CardTitle>
                      <S.CardExcerpt>{post.excerpt}</S.CardExcerpt>
                      <S.CardMeta>
                        <S.CardAuthor>
                          <S.AuthorAvatar>{post.author?.initials || '?'}</S.AuthorAvatar>
                          {post.author?.name || 'Anonymous'}
                        </S.CardAuthor>
                        <span>{post.readTime || '5 min read'}</span>
                      </S.CardMeta>
                    </S.CardContent>
                  </S.BlogCard>
                ))}
              </S.BlogGrid>
            </>
          )}
        </S.BlogSection>

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

export default Blog;
