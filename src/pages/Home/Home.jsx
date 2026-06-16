import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Icon, DisclaimerPill, PrimaryButton } from '../../ds';
import { BRAND } from '../../constants/brand';
import { DISCLAIMERS } from '../../constants/disclaimers';
import DragAndDrop from './DragAndDrop';
import Description from './Description';
import History from './History';
import { useGetDiagnosisMutation, useImageDiagnosisMutation } from '../../api/mutations/diagnosis.mutation';
import { handleError } from '../../utils/functions';
import * as S from './Home.style';

const ANALYSIS_STORAGE_KEY = 'skinxray_last_analysis';

export const persistAnalysis = (payload) => {
  sessionStorage.setItem(ANALYSIS_STORAGE_KEY, JSON.stringify(payload));
};

const Home = () => {
  const [uploadType, setUploadType] = useState('upload');
  const navigate = useNavigate();
  const { isPending: isDescriptionPending, mutate: mutateDescription } = useGetDiagnosisMutation();
  const { isPending: isImagePending, mutate: mutateImage } = useImageDiagnosisMutation();

  const goToAnalysis = (payload) => {
    persistAnalysis(payload);
    navigate('/analysis', { state: payload });
  };

  const handleUpload = (base64Image) => {
    mutateImage(
      { image: base64Image },
      {
        onSuccess: (res) => {
          goToAnalysis({
            response: res.data.diagnosis,
            imagePath: res.data.image_path,
            diagnosisId: res.data.diagnosis_id,
          });
        },
        onError: handleError,
      }
    );
  };

  const handleSubmitDescription = (description) => {
    mutateDescription(
      { skin_issue_description: description },
      {
        onSuccess: (res) => {
          goToAnalysis({
            response: res.data.diagnosis,
            diagnosisId: res.data.diagnosis_id,
          });
        },
        onError: handleError,
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Scan — SkinXray</title>
        <meta name="description" content="Upload a skin photo or describe symptoms for AI-powered educational insights." />
      </Helmet>

      <S.Page>
        <S.Hero>
          <S.HeroEyebrow>Skin Scanner</S.HeroEyebrow>
          <S.HeroTitle>{BRAND.scanHeroTitle}</S.HeroTitle>
          <S.HeroSubtitle>{BRAND.scanHeroSubtitle}</S.HeroSubtitle>
        </S.Hero>

        <S.SegmentControl>
          <S.SegmentButton
            type="button"
            $active={uploadType === 'upload'}
            onClick={() => setUploadType('upload')}
          >
            Upload Photo
          </S.SegmentButton>
          <S.SegmentButton
            type="button"
            $active={uploadType === 'describe'}
            onClick={() => setUploadType('describe')}
          >
            Describe Symptoms
          </S.SegmentButton>
        </S.SegmentControl>

        <S.ScanCard>
          <S.CardLabel>
            {uploadType === 'upload' ? 'Upload a photo' : 'Describe your symptoms'}
          </S.CardLabel>

          {uploadType === 'upload' ? (
            <DragAndDrop isLoading={isImagePending} onUpload={handleUpload} />
          ) : (
            <Description isLoading={isDescriptionPending} onSubmit={handleSubmitDescription} />
          )}

          <DisclaimerPill>
            <Icon name="info" size={16} color="primary.1000" bg="inherit" weight={0} />
            {DISCLAIMERS.scan}
          </DisclaimerPill>
        </S.ScanCard>

        <History />
      </S.Page>
    </>
  );
};

export default Home;
