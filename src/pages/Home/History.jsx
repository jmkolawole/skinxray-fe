import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Text } from '../../ds';
import { useHistoryQuery } from '../../api/queries/diagnosis.query';
import { parseApiResponse, truncateText } from '../../utils/functions';
import { getRiskStyle } from '../../utils/riskLevel';
import placeholderImage from '../../assets/images/placeholder.jpg';
import * as S from './Home.style';

const formatRelativeDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
};

const History = () => {
  const { data } = useHistoryQuery();
  const [histories, setHistories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data?.data) {
      setHistories([]);
      return;
    }
    const historiesData = data.data;
    if (Array.isArray(historiesData)) {
      setHistories(historiesData);
    } else if (typeof historiesData === 'object') {
      setHistories(Object.values(historiesData));
    }
  }, [data]);

  const isImageDiagnosis = (history) => history.image_path != null;

  const getImageSource = (history) =>
    isImageDiagnosis(history) ? history.image_path : placeholderImage;

  const onNavigate = (item) => {
    navigate('/analysis', {
      state: {
        response: item.chatgpt_response,
        imagePath: isImageDiagnosis(item) ? item.image_path : null,
      },
    });
  };

  if (!histories.length) return null;

  return (
    <S.HistorySection>
      <Text weight={600} type="h6">
        Recent scans
      </Text>
      <S.HistoryList>
        {histories.map((history) => {
          const parsed = parseApiResponse(history.chatgpt_response);
          const risk = getRiskStyle(parsed?.severity);
          return (
            <S.HistoryCard key={history.id} type="button" onClick={() => onNavigate(history)}>
              <Avatar radius={10} size={44} type="image" value={getImageSource(history)} />
              <S.HistoryMeta>
                <S.HistoryTitle>{truncateText(parsed?.symptomsDescription || parsed?.assessment || 'Scan result', 40)}</S.HistoryTitle>
                <S.HistoryDate>{formatRelativeDate(history.created_at)}</S.HistoryDate>
              </S.HistoryMeta>
              {risk && (
                <S.RiskBadge $bg={risk.bg} $color={risk.color}>
                  {risk.label}
                </S.RiskBadge>
              )}
            </S.HistoryCard>
          );
        })}
      </S.HistoryList>
    </S.HistorySection>
  );
};

export default History;
