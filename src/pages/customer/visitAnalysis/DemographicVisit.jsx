import React, { useEffect, useState } from 'react';
import GroupTabBar from '../../../components/admin/customer/visitAnalysis/groupTab/GroupTabBar';
import styled from 'styled-components';
import Calendar from '../../../components/admin/customer/visitAnalysis/Calendar';
import { visitTabs } from '../../../assets/data/tabData';
import { defaultInstance } from '../../../api/axios';
import { useSelector } from 'react-redux';
import Doughnut from '../../../components/admin/customer/visitAnalysis/Doughnut';
import AgeBar from './AgeBar';

function DemographicVisit() {
  const { storeId } = useSelector((state) => state.user);
  const [selected, setSelected] = useState(visitTabs[0].key);
  const [date, setDate] = useState([null, null]);
  const [noData, setNoData] = useState(false);
  const [doughnutData, setDoughnutData] = useState({
    noData: false,
    male: 0,
    female: 0,
  });
  const [chartData, setChartData] = useState({
    maleData: [],
    femaleData: [],
  });
  const [age, setAge] = useState();

  /* ----- 연령대 텍스트 변경 함수 ----- */
  const changeAge = (day) => {
    switch (day) {
      case '10s':
        return '10대';
      case '20s':
        return '20대';
      case '30s':
        return '30대';
      case '40s':
        return '40대';
      case '50s':
        return '50대';
      case '60s':
        return '60대';
      default:
        break;
    }
  };

  /* ----- 서버로부터 받은 데이터 가공 ----- */
  const processData = (type, chartData) => {
    return chartData.map((data) => {
      let newData = {
        x: '',
        y: data[type],
      };

      // 연령대 변경
      newData.x = changeAge(data.ageGroup);

      // 방문자 수 추가
      newData.x += ` (${data.total}명)`;

      return newData;
    });
  };

  /* ----- 방문율이 가장 높은 연령대 ----- */
  const getMaxAge = (data) => {
    if (data.length > 0) {
      const max = Math.max(...data.map((data) => data.total));
      let maxData = data.filter((d) => d.total === max)[0];
      setAge(changeAge(maxData.ageGroup));
    } else {
      setAge('-');
    }
  };

  /* ----- 연령대 조회 api ----- */
  const getAgeGroupCount = async () => {
    await defaultInstance
      .get(
        selected !== 'calendar'
          ? `/api/statistics/${storeId}/age?period=${selected}`
          : `/api/statistics/${storeId}/age?startDate=${getYmd(date[0])}&endDate=${getYmd(date[1])}`
      )
      .then(async (res) => {
        if (res.data.isSuccess) {
          const data = res.data.result;

          if (data.length > 0) {
            const processedData = {
              maleData: processData('male', data),
              femaleData: processData('female', data),
            };
            setChartData(processedData);
            getMaxAge(data);
            setNoData(false);
          } else {
            setNoData(true);
            setAge('-');
          }
        }
      })
      .catch((err) => console.log(err));
  };

  /* ----- 날짜 포맷 변경 함수 ----- */
  const getYmd = (date) => {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 > 9
        ? (date.getMonth() + 1).toString()
        : '0' + (date.getMonth() + 1)) +
      '-' +
      (date.getDate() > 9
        ? date.getDate().toString()
        : '0' + date.getDate().toString())
    );
  };

  /* ----- 성비 조회 api ----- */
  const getGenderRatio = async () => {
    await defaultInstance
      .get(
        selected !== 'calendar'
          ? `/api/statistics/${storeId}/gender?period=${selected}`
          : `/api/statistics/${storeId}/gender?startDate=${getYmd(date[0])}&endDate=${getYmd(date[1])}`
      )
      .then(async (res) => {
        if (res.data.isSuccess) {
          const data = res.data.result;

          if (isNaN(data.male) || isNaN(data.female)) {
            setNoData(true);
          } else {
            const processedData = {
              male: parseInt(data.male),
              female: parseInt(100 - data.male),
            };
            setDoughnutData(processedData);
            setNoData(false);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(selected);
    console.log(date);
    if (selected !== 'calendar') {
      setDate([null, null]);
    }

    getGenderRatio();
    getAgeGroupCount();
  }, [selected]);

  return (
    <>
      <PageTitle>
        <h4>인구통계별 방문분석</h4>
        <span>
          기간에 따라 방문율이 높은 연령대와 성별을 확인할 수 있습니다.
        </span>
      </PageTitle>
      <Header>
        <GroupTabBar
          tabs={visitTabs}
          selected={selected}
          setSelected={setSelected}
        />
        <Calendar
          selected={selected}
          setSelected={setSelected}
          date={date}
          setDate={setDate}
        />
      </Header>
      <ChartContainer>
        {noData && (
          <NoData>
            <span>데이터 없음</span>
          </NoData>
        )}
        <Doughnut doughnutData={doughnutData} />
        <AgeBar chartData={chartData} age={age} />
      </ChartContainer>
    </>
  );
}

export default DemographicVisit;

const PageTitle = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
  gap: 10px;
  padding-bottom: 40px;

  & h4 {
    color: ${({ theme }) => theme.colors.coumo_purple};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.title};
    margin: 0;
  }

  & span {
    color: ${({ theme }) => theme.colors.text_darkgray};
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 420px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30px 20px;
  border: 1px solid ${({ theme }) => theme.colors.lightpurple_border};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0px 0px 10px 10px;
  position: relative;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    height: auto;
  }
`;

const NoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #80808036;
  color: ${({ theme }) => theme.colors.text_black};
  font-size: ${({ theme }) => theme.fontSize.base};
`;
