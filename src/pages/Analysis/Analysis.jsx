import {useEffect, useState} from 'react';
import {Text, colors} from '../../ds';
import * as S from './Analysis.style';
import {useLocation} from 'react-router-dom';
import {parseApiResponse} from '../../utils/functions';

// Create a style element for print styles
const addPrintStyles = () => {
  const styleEl = document.createElement('style');
  styleEl.setAttribute('id', 'print-styles');
  styleEl.innerHTML = `
    @media print {
      .no-print {
        display: none !important;
      }
      
      .print-only {
        display: block !important;
      }
      
      .print-content {
        display: block !important;
        max-height: none !important;
        height: auto !important;
        opacity: 1 !important;
        overflow: visible !important;
        padding: 0 20px 20px !important;
        visibility: visible !important;
        page-break-inside: avoid;
      }
      
      .print-header {
        cursor: default !important;
      }
      
      body, html {
        width: 100% !important;
        height: auto !important;
        overflow: visible !important;
        background-color: white !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      .printing {
        height: auto !important;
        overflow: visible !important;
        background-color: white !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      
      .section-card-print {
        page-break-inside: avoid;
        margin-bottom: 20px;
        break-inside: avoid;
      }
      
      .medical-disclaimer-print {
        page-break-inside: avoid;
        margin-top: 30px !important;
        margin-bottom: 20px !important;
      }
      
      .diagnosis-image {
        max-width: 100%;
        height: auto;
        margin: 10px 0;
        border-radius: 8px;
        page-break-inside: avoid;
        break-inside: avoid;
      }
      
      .diagnosis-image-container {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      
      @page {
        margin: 0.5cm;
        size: auto;
      }
    }
  `;
  document.head.appendChild(styleEl);
  
  return () => {
    const existingStyle = document.getElementById('print-styles');
    if (existingStyle) {
      document.head.removeChild(existingStyle);
    }
  };
};

const Analysis = () => {
  const location = useLocation();
  const response = location.state?.response;
  const imagePath = location.state?.imagePath;
  const [details, setDetails] = useState({});
  const [isPrinting, setIsPrinting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // State to track which sections are open
  const [openSections, setOpenSections] = useState({
    image: true,
    symptoms: true,
    assessment: true,
    recommendations: true,
    severity: true
  });

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

  // Add print styles on component mount
  useEffect(() => {
    const removePrintStyles = addPrintStyles();
    return removePrintStyles;
  }, []);

  useEffect(() => {
    if (response) {
      const parsedResponse = parseApiResponse(response);
      console.log(parsedResponse);
      setDetails(parsedResponse);
    }
  }, [response]);

  // Add print-specific styles when printing
  useEffect(() => {
    const beforePrint = () => {
      setIsPrinting(true);
      // Force all sections to be open for printing
      setOpenSections({
        image: true,
        symptoms: true,
        assessment: true,
        recommendations: true,
        severity: true
      });
    };
    
    const afterPrint = () => {
      setIsPrinting(false);
    };
    
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
    
    return () => {
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
    };
  }, []);

  const handlePrint = () => {
    // Open all sections before printing
    setOpenSections({
      image: true,
      symptoms: true,
      assessment: true,
      recommendations: true,
      severity: true
    });
    
    // Set printing state
    setIsPrinting(true);
    
    // Short delay to ensure sections are open and images are loaded before printing
    setTimeout(() => {
      // Force a repaint to ensure all content is properly rendered
      window.requestAnimationFrame(() => {
        window.print();
        // Reset printing state after a delay
        setTimeout(() => {
          setIsPrinting(false);
        }, 500);
      });
    }, 800);
  };

  // Helper function to get severity color
  const getSeverityColor = (severity) => {
    const level = parseInt(severity);
    if (level >= 4) return '#ef4444'; // Red
    if (level >= 3) return '#f97316'; // Orange
    if (level >= 2) return '#facc15'; // Yellow
    return '#22c55e'; // Green
  };

  // Toggle section open/closed
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Toggle all sections
  const toggleAllSections = () => {
    const allClosed = Object.values(openSections).every(value => !value);
    
    setOpenSections({
      image: allClosed,
      symptoms: allClosed,
      assessment: allClosed,
      recommendations: allClosed,
      severity: allClosed
    });
  };

  // Calculate if all sections are closed
  const allSectionsClosed = Object.values(openSections).every(value => !value);

  const MedicalDisclaimer = () => {
    return (
      <div 
        className={isPrinting ? 'medical-disclaimer-print' : ''}
        style={{ 
          display: 'flex',
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderLeft: '4px solid #f97316',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)',
          borderRadius: '6px',
          padding: '16px',
          marginTop: '24px',
          gap: '12px',
          alignItems: 'flex-start'
        }}
      >
        <div style={{ color: '#f97316', fontSize: '20px', marginTop: '2px' }}>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <Text weight={600} size="sm" color="neutral.800">
            Medical Disclaimer
          </Text>
          <Text size="xs" color="neutral.700">
            This analysis is for informational purposes only and is not a substitute for professional medical advice. 
            Always consult with a qualified healthcare provider for proper diagnosis and treatment.
          </Text>
        </div>
      </div>
    );
  };

  return (
    <S.Container className={isPrinting ? 'printing' : ''}>
      <S.Content compact={allSectionsClosed}>
        <S.ResultHeader className="no-print">
          <div style={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
            <S.ResultIcon>
              <i className="fas fa-clipboard-check"></i>
            </S.ResultIcon>
            <Text weight={700} type="h3">
              Diagnostic Results
            </Text>
          </div>
          <div 
            onClick={toggleAllSections} 
            style={{ 
              cursor: 'pointer', 
              fontSize: '14px', 
              color: colors.primary[500],
              fontWeight: 600,
              marginTop: isMobile ? '8px' : '0'
            }}
          >
            {Object.values(openSections).every(value => value) 
              ? 'Collapse All' 
              : 'Expand All'}
          </div>
        </S.ResultHeader>

        <S.ContentInner compact={allSectionsClosed}>
          {/* For print only - title */}
          <div style={{ display: 'none' }} className="print-only">
            <Text weight={700} type="h3" style={{ marginBottom: '20px' }}>
              Diagnostic Results
            </Text>
          </div>
          
          {/* Image Section - Only show if imagePath exists */}
          {imagePath && (
            <S.SectionCard 
              borderColor="#22d3ee"
              className={isPrinting ? 'section-card-print' : ''}
            >
              <S.SectionHeader 
                onClick={() => toggleSection('image')}
                isOpen={openSections.image}
                className={isPrinting ? 'print-header' : 'no-print-style'}
              >
                <Text weight={600} type="h5">
                  Uploaded Image
                </Text>
                <S.AccordionIcon isOpen={openSections.image} className="no-print">
                  <i className="fas fa-chevron-down"></i>
                </S.AccordionIcon>
              </S.SectionHeader>
              <S.SectionContent 
                isOpen={openSections.image || isPrinting}
                className={isPrinting ? 'print-content' : ''}
                data-print-content="true"
              >
                <div 
                  className="diagnosis-image-container"
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    padding: '10px 0'
                  }}
                >
                  <img 
                    src={imagePath} 
                    alt="Uploaded skin condition" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '300px', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    className="diagnosis-image"
                  />
                </div>
              </S.SectionContent>
            </S.SectionCard>
          )}
          
          {details?.symptomsDescription && (
            <S.SectionCard 
              borderColor="#4fd1c5"
              className={isPrinting ? 'section-card-print' : ''}
            >
              <S.SectionHeader 
                onClick={() => toggleSection('symptoms')}
                isOpen={openSections.symptoms}
                className={isPrinting ? 'print-header' : 'no-print-style'}
              >
                <Text weight={600} type="h5">
                  Symptoms Description
                </Text>
                <S.AccordionIcon isOpen={openSections.symptoms} className="no-print">
                  <i className="fas fa-chevron-down"></i>
                </S.AccordionIcon>
              </S.SectionHeader>
              <S.SectionContent 
                isOpen={openSections.symptoms || isPrinting}
                className={isPrinting ? 'print-content' : ''}
                data-print-content="true"
              >
                {details.symptomsDescription}
              </S.SectionContent>
            </S.SectionCard>
          )}

          {details?.assessment && (
            <S.SectionCard 
              borderColor="#3b82f6"
              className={isPrinting ? 'section-card-print' : ''}
            >
              <S.SectionHeader 
                onClick={() => toggleSection('assessment')}
                isOpen={openSections.assessment}
                className={isPrinting ? 'print-header' : 'no-print-style'}
              >
                <Text weight={600} type="h5">
                  Assessment
                </Text>
                <S.AccordionIcon isOpen={openSections.assessment} className="no-print">
                  <i className="fas fa-chevron-down"></i>
                </S.AccordionIcon>
              </S.SectionHeader>
              <S.SectionContent 
                isOpen={openSections.assessment || isPrinting}
                className={isPrinting ? 'print-content' : ''}
                data-print-content="true"
              >
                {details.assessment}
              </S.SectionContent>
            </S.SectionCard>
          )}

          {details?.recommendations && (
            <S.SectionCard 
              borderColor="#8b5cf6"
              className={isPrinting ? 'section-card-print' : ''}
            >
              <S.SectionHeader 
                onClick={() => toggleSection('recommendations')}
                isOpen={openSections.recommendations}
                className={isPrinting ? 'print-header' : 'no-print-style'}
              >
                <Text weight={600} type="h5">
                  Recommendations
                </Text>
                <S.AccordionIcon isOpen={openSections.recommendations} className="no-print">
                  <i className="fas fa-chevron-down"></i>
                </S.AccordionIcon>
              </S.SectionHeader>
              <S.SectionContent 
                isOpen={openSections.recommendations || isPrinting}
                className={isPrinting ? 'print-content' : ''}
                data-print-content="true"
              >
                {details.recommendations}
              </S.SectionContent>
            </S.SectionCard>
          )}

          {details?.severity && (
            <S.SectionCard 
              borderColor={getSeverityColor(details.severity)}
              className={isPrinting ? 'section-card-print' : ''}
            >
              <S.SectionHeader 
                onClick={() => toggleSection('severity')}
                isOpen={openSections.severity}
                className={isPrinting ? 'print-header' : 'no-print-style'}
              >
                <Text weight={600} type="h5">
                  Severity
                </Text>
                <S.AccordionIcon isOpen={openSections.severity} className="no-print">
                  <i className="fas fa-chevron-down"></i>
                </S.AccordionIcon>
              </S.SectionHeader>
              <S.SectionContent 
                isOpen={openSections.severity || isPrinting}
                className={isPrinting ? 'print-content' : ''}
                data-print-content="true"
              >
                <S.SeverityContainer>
                  <Text weight={700} size="lg">
                    {details.severity}/5
                  </Text>
                  <S.SeverityScale>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <S.SeverityDot 
                        key={level} 
                        active={level <= details.severity} 
                        level={level}
                      />
                    ))}
                  </S.SeverityScale>
                </S.SeverityContainer>
              </S.SectionContent>
            </S.SectionCard>
          )}

          <MedicalDisclaimer />
        </S.ContentInner>

        <S.PrintButtonContainer compact={allSectionsClosed}>
          <S.PrintButton onClick={handlePrint}>
            <i className="fas fa-print"></i>
            Print Results
          </S.PrintButton>
        </S.PrintButtonContainer>
      </S.Content>
    </S.Container>
  );
};

export default Analysis;
