import {useCallback, useState, useRef, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import * as S from './Home.style';
import PropTypes from 'prop-types';
import { colors } from '../../ds';

const DragAndDrop = ({onUpload, isLoading}) => {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handle video stream setup
  useEffect(() => {
    if (showCamera && videoRef.current && !streamRef.current) {
      initializeCamera();
    }
  }, [showCamera]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        uploadImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    noClick: true,
  });

  const uploadImage = async (base64Image) => {
    onUpload(base64Image);
  };

  const initializeCamera = async () => {
    try {
      // Reset any previous errors
      setCameraError(null);

      // Check for secure context
      if (!window.isSecureContext) {
        throw new Error('Camera access requires HTTPS or localhost');
      }

      // Check for camera support
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Your browser doesn\'t support camera access');
      }

      // Request camera access with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      // Store the stream reference
      streamRef.current = stream;

      // Set up video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Wait for video to be ready
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().then(resolve);
          };
        });
      }
    } catch (err) {
      console.error('Camera initialization error:', err);
      let errorMessage = 'Failed to initialize camera';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = 'Camera access was denied. Please allow camera access and try again.';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No camera found on your device.';
      } else if (err.name === 'NotReadableError') {
        errorMessage = 'Camera is in use by another application.';
      }
      
      setCameraError(errorMessage);
    }
  };

  const startCamera = async (e) => {
    e.stopPropagation();
    setShowCamera(true);
    await initializeCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !streamRef.current) {
      console.error('Video stream not available');
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      const base64Image = canvas.toDataURL('image/jpeg', 0.8);
      uploadImage(base64Image);
      stopCamera();
    } catch (err) {
      console.error('Error capturing photo:', err);
      setCameraError('Failed to capture photo. Please try again.');
    }
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          uploadImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <S.ImageContainer $showCamera={showCamera}>
      {isLoading ? (
        <S.LoadingOverlay>
          <S.LoadingSpinner />
          <S.LoadingText>Uploading...</S.LoadingText>
        </S.LoadingOverlay>
      ) : showCamera ? (
        <S.CameraContainer>
          <S.VideoPreview>
            <video
              ref={videoRef}
              autoPlay
              playsInline
            />
          </S.VideoPreview>
          {cameraError ? (
            <div style={{ color: colors.destructive[600], marginTop: '1rem' }}>
              {cameraError}
            </div>
          ) : (
            <S.CameraControls>
              <S.ActionButton onClick={capturePhoto}>
                Capture Photo
              </S.ActionButton>
              <S.ActionButton 
                onClick={stopCamera} 
                style={{ background: colors.destructive[600] }}
              >
                Cancel
              </S.ActionButton>
            </S.CameraControls>
          )}
        </S.CameraContainer>
      ) : (
        <S.ImageWrapper {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <S.DragActive>Drop your image here...</S.DragActive>
          ) : (
            <>
              <S.UploadIconWrap>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17,8 12,3 7,8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </S.UploadIconWrap>
              <S.UploadText>Drag and drop your image here</S.UploadText>
              <S.OrText>or</S.OrText>
              <S.ButtonsContainer>
                <S.ActionButton $variant="primary" onClick={handleBrowseClick}>
                  Browse Files
                </S.ActionButton>
                <S.ActionButton onClick={startCamera}>
                  Take Picture
                </S.ActionButton>
              </S.ButtonsContainer>
              {cameraError && (
                <div style={{ color: colors.destructive[600], marginTop: '1rem' }}>
                  {cameraError}
                </div>
              )}
            </>
          )}
        </S.ImageWrapper>
      )}
    </S.ImageContainer>
  );
};

export default DragAndDrop;

DragAndDrop.propTypes = {
  onUpload: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
