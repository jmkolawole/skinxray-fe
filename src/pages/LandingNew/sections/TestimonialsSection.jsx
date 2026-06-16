import { SectionHeaderBlock } from '../../../ds';
import { StarIcon } from '../landingIcons';
import * as S from '../landingShared.style';

const TESTIMONIALS = [
  {
    text: 'SkinXray helped me identify a concerning mole early. The AI analysis was spot-on and I got professional help quickly.',
    author: 'Sarah M.',
    role: 'Verified User',
    initials: 'SM',
  },
  {
    text: 'As someone with sensitive skin, this app has been invaluable. The recommendations are always helpful and accurate.',
    author: 'James K.',
    role: 'Verified User',
    initials: 'JK',
  },
  {
    text: 'Quick, easy, and reliable. I use it regularly to monitor my skin health. Highly recommend to anyone concerned about their skin.',
    author: 'Emily R.',
    role: 'Verified User',
    initials: 'ER',
  },
];

const TestimonialsSection = () => (
  <S.SectionBlock id="reviews">
    <SectionHeaderBlock
      eyebrow="Testimonials"
      title="Trusted by"
      accent="Thousands"
      subtitle="See what our users have to say about their experience with SkinXray."
    />
    <S.ReviewsGrid>
      {TESTIMONIALS.map((review) => (
        <S.ReviewCard key={review.author}>
          <S.ReviewStars aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, index) => (
              <StarIcon key={index} />
            ))}
          </S.ReviewStars>
          <S.ReviewText>&ldquo;{review.text}&rdquo;</S.ReviewText>
          <S.ReviewAuthor>
            <S.ReviewAvatar aria-hidden="true">{review.initials}</S.ReviewAvatar>
            <div>
              <S.ReviewName>{review.author}</S.ReviewName>
              <S.ReviewRole>{review.role}</S.ReviewRole>
            </div>
          </S.ReviewAuthor>
        </S.ReviewCard>
      ))}
    </S.ReviewsGrid>
  </S.SectionBlock>
);

export default TestimonialsSection;
