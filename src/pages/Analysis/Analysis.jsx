import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon, PrimaryButton } from '../../ds';
import AnalysisResult from '../../components/AnalysisResult/AnalysisResult';
import { parseApiResponse } from '../../utils/functions';

const ANALYSIS_STORAGE_KEY = 'skinxray_last_analysis';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const loadStoredAnalysis = () => {
  try {
    const raw = sessionStorage.getItem(ANALYSIS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const addPrintStyles = () => {
  const styleEl = document.createElement('style');
  styleEl.setAttribute('id', 'print-styles');
  styleEl.innerHTML = `
    @media print {
      .no-print { display: none !important; }
      body, html { background: white !important; }
    }
  `;
  document.head.appendChild(styleEl);
  return () => document.getElementById('print-styles')?.remove();
};

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    const removePrintStyles = addPrintStyles();
    return removePrintStyles;
  }, []);

  useEffect(() => {
    const state = location.state || loadStoredAnalysis();
    if (state?.response) {
      setDetails(parseApiResponse(state.response));
      setImagePath(state.imagePath || null);
      sessionStorage.setItem(ANALYSIS_STORAGE_KEY, JSON.stringify(state));
    }
  }, [location.state]);

  const hasContent = details?.symptomsDescription || details?.assessment || details?.recommendations || details?.severity || imagePath;

  if (!hasContent) {
    return (
      <EmptyState>
        <p>No analysis to display.</p>
        <PrimaryButton onClick={() => navigate('/home')}>Start a scan</PrimaryButton>
      </EmptyState>
    );
  }

  return (
    <>
      <Helmet>
        <title>Analysis Results — SkinXray</title>
      </Helmet>

      <Page>
        <AnalysisResult details={details} imagePath={imagePath} />

        <Actions className="no-print">
          <PrimaryButton variant="outline" onClick={() => navigate('/home')}>
            New Scan
          </PrimaryButton>
          <PrimaryButton onClick={() => window.print()}>
            <Icon name="download" size={16} color="shades.0" bg="inherit" weight={0} />
            Print Results
          </PrimaryButton>
        </Actions>
      </Page>
    </>
  );
};

export default Analysis;
