import {useState, useEffect} from 'react';
import {Tab, Text} from '../../ds';
import * as S from './Home.style';
import DragAndDrop from './DragAndDrop';
import Description from './Description';
import {useNavigate} from 'react-router-dom';
import History from './History';
import {useGetDiagnosisMutation, useImageDiagnosisMutation} from '../../api/mutations/diagnosis.mutation';
import {handleError} from '../../utils/functions';
import { Helmet } from 'react-helmet-async';

const MedicalDisclaimer = () => {
  return (
    <S.DisclaimerContainer>
      <S.DisclaimerIcon>
        <i className="fas fa-exclamation-triangle"></i>
      </S.DisclaimerIcon>
      <S.DisclaimerContent>
        <Text weight={600} size="sm" color="neutral.800">
          Medical Disclaimer
        </Text>
        <Text size="xs" color="neutral.700">
          This tool is for informational purposes only and is not a substitute for professional medical advice, 
          diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
          with any questions you may have regarding a medical condition.
        </Text>
      </S.DisclaimerContent>
    </S.DisclaimerContainer>
  );
};

const Home = () => {
  const [uploadType, setUploadType] = useState('upload');
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  const {isPending: isDescriptionPending, mutate: mutateDescription} = useGetDiagnosisMutation();
  const {isPending: isImagePending, mutate: mutateImage} = useImageDiagnosisMutation();

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleUpload = (base64Image) => {
    const payload = {
      image: base64Image
    };

    mutateImage(payload, {
      onSuccess: (res) => {
        navigate('/analysis', {
          state: {
            response: res.data.diagnosis,
            imagePath: res.data.image_path,
            diagnosisId: res.data.diagnosis_id
          }
        });
      },
      onError: (err) => handleError(err),
    });
  };

  const handleSubmitDescription = (description) => {
    const payload = {
      skin_issue_description: description,
    };

    mutateDescription(payload, {
      onSuccess: (res) => {
        navigate('/analysis', {
          state: {
            response: res.data.diagnosis,
            diagnosisId: res.data.diagnosis_id
          }
        });
      },
      onError: (err) => handleError(err),
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Skinxray AI</title>
        <meta name="description" content="Upload skin images or describe symptoms for AI-powered skin health analysis." />
      </Helmet>
      <S.Container>
        <S.Content>
          <S.Header>
            <Text weight={700} type="h2">
              Skin Health Diagnostic
            </Text>
            <Text color="neutral.600" size="md">
              Upload an image or describe your symptoms for an AI-powered analysis
            </Text>
          </S.Header>
          <S.MainContent>
            <Tab
              height={40}
              items={['Upload Image', 'Describe Symptoms']}
              width={isMobile ? '100%' : 180}
              activeTab={
                uploadType === 'upload' ? 'Upload Image' : 'Describe Symptoms'
              }
              onChange={(item) => {
                setUploadType(item === 'Upload Image' ? 'upload' : 'describe');
              }}
            />
            <S.SymptomsWrapper>
              <Text weight={600} type="h6">
                {uploadType === 'upload' ? 'Upload Image' : 'Describe Symptoms'}
              </Text>
              {uploadType === 'upload' ? (
                <DragAndDrop isLoading={isImagePending} onUpload={handleUpload} />
              ) : (
                <Description
                  isLoading={isDescriptionPending}
                  onSubmit={handleSubmitDescription}
                />
              )}
            </S.SymptomsWrapper>
          </S.MainContent>
          
          <MedicalDisclaimer />
          <History />
        </S.Content>
      </S.Container>
    </>
  );
};

export default Home;
