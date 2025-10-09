import {useEffect, useState} from 'react';
import {useHistoryQuery} from '../../api/queries/diagnosis.query';
import {Avatar, Text} from '../../ds';
import * as S from './Home.style';
import {parseApiResponse, truncateText} from '../../utils/functions';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../../assets/images/placeholder.jpg';

const History = () => {
  const {data} = useHistoryQuery();
  const [histories, setHistories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      // Convert object to array if data.data is an object
      const historiesData = data.data;
      if (Array.isArray(historiesData)) {
        setHistories(historiesData);
      } else if (typeof historiesData === 'object' && historiesData !== null) {
        // Convert object to array
        setHistories(Object.values(historiesData));
      } else {
        setHistories([]);
      }
    }
  }, [data]);

  const getDetails = (hist) => {
    let result = parseApiResponse(hist.chatgpt_response);
    result = truncateText(result.symptomsDescription, 25);
    return result;
  };

  // Determine if the diagnosis is image-based or text-based
  const isImageDiagnosis = (history) => {
    return history.image_path && history.image_path !== null;
  };

  // Get the appropriate image source for the history item
  const getImageSource = (history) => {
    if (isImageDiagnosis(history)) {
      return history.image_path;
    }
    // Return local placeholder for text-based diagnoses
    return placeholderImage;
  };

  const onNavigate = (item) => {
    navigate('/analysis', {
      state: {
        response: item.chatgpt_response,
        imagePath: isImageDiagnosis(item) ? item.image_path : null
      }
    });
  };

  return (
    <S.HistorySection>
      <Text weight={600} type="h6">
        History
      </Text>

      <S.HistoryContent>
        <S.HistoryHeader>
          <Text weight={600} size="md">
            Search History
          </Text>
        </S.HistoryHeader>

        <S.HistoryScrollArea>
          <S.HistoryContentInner>
            {histories.map((history) => {
              return (
                <S.HistoryItem
                  key={history.id}
                  onClick={() => onNavigate(history)}
                >
                  <S.HistoryItemImg>
                    <Avatar
                      radius={9}
                      size={40}
                      type="image"
                      value={getImageSource(history)}
                    />
                  </S.HistoryItemImg>

                  <S.HistoryItemContent>
                    <Text weight={400} size="sm">
                      {getDetails(history)}
                    </Text>
                  </S.HistoryItemContent>
                </S.HistoryItem>
              );
            })}
          </S.HistoryContentInner>
        </S.HistoryScrollArea>
      </S.HistoryContent>
    </S.HistorySection>
  );
};

export default History;
