import React from 'react';
import { CalendarPageContainer } from './styles';
import { CalendarLeftContainer } from './styles';
// 좌측 상단
import { MiniContainerOne } from './styles';
import { BoxOne } from './styles';
import { BoxTwo } from './styles';
import { BoxThree } from './styles';
// 좌측 중간
import { MiniContainerTwo } from './styles';
import { BoxEight } from './styles';
import { MiniContainerTwoRight } from './styles';
import { MiniContainerTwoTop } from './styles';
import { BoxNine } from './styles';
import { BoxTen } from './styles';
import { MiniContainerTwoBottom } from './styles';
import { BoxThirteen } from './styles';
import { BoxFourteen } from './styles';
import { BoxFifteen } from './styles';
// 좌측 하단
import { MiniContainerThree } from './styles';
import { BoxTwentyOne } from './styles';
import { BoxTwentyTwo } from './styles';
import { BoxTwentyThree } from './styles';

import { CalendarMiddleContainer } from './styles';
import { BoxFour } from './styles';
import { BoxSixteen } from './styles';
import { CalendarRightContainer } from './styles';
// 우측 상단
import { MiniContainerFour } from './styles';
import { BoxFive } from './styles';
import { BoxSix } from './styles';
import { BoxSeven } from './styles';
// 우측 중간
import { MiniContainerFive } from './styles';
import { BoxEleven } from './styles';
import { BoxTwelve } from './styles';
// 우측 하단
import { MiniContainerSix } from './styles';
import { BoxSeventeen } from './styles';
import { BoxTwentyFour } from './styles';
import { MiniContainerSeven } from './styles';
import { MiniContainerEight } from './styles';
import { MiniContainerNine } from './styles';
import { BoxNineteen } from './styles';
import { BoxTwentyFive } from './styles';
import { MiniContainerTen } from './styles';

export function CalendarPage() {
  // 모달창 노출 여부
  // const [calendarOpen, setCalendarOpen] = React.useState<boolean>(false);
  // // 모달창 노출
  // const showCalendar = () => {
  //   setCalendarOpen(true);
  // };
  return (
    <CalendarPageContainer>
      <CalendarLeftContainer>
        <MiniContainerOne>
          <BoxOne>1</BoxOne>
          <BoxTwo>2</BoxTwo>
          <BoxThree>3</BoxThree>
        </MiniContainerOne>
        <MiniContainerTwo>
          <BoxEight>8</BoxEight>
          <MiniContainerTwoRight>
            <MiniContainerTwoTop>
              <BoxNine>9</BoxNine>
              <BoxTen>10</BoxTen>
            </MiniContainerTwoTop>
            <MiniContainerTwoBottom>
              <BoxThirteen>13</BoxThirteen>
              <BoxFourteen>14</BoxFourteen>
              <BoxFifteen>15</BoxFifteen>
            </MiniContainerTwoBottom>
          </MiniContainerTwoRight>
        </MiniContainerTwo>
        <MiniContainerThree>
          <BoxTwentyOne>21</BoxTwentyOne>
          <BoxTwentyTwo>22</BoxTwentyTwo>
          <BoxTwentyThree>23</BoxTwentyThree>
        </MiniContainerThree>
      </CalendarLeftContainer>
      <CalendarMiddleContainer>
        <BoxFour></BoxFour>
        <BoxSixteen></BoxSixteen>
      </CalendarMiddleContainer>
      <CalendarRightContainer>
        <MiniContainerFour>
          <BoxFive>5</BoxFive>
          <BoxSix>6</BoxSix>
          <BoxSeven>7</BoxSeven>
        </MiniContainerFour>
        <MiniContainerFive>
          <BoxEleven>11</BoxEleven>
          <BoxTwelve>12</BoxTwelve>
        </MiniContainerFive>
        <MiniContainerSix>
          <MiniContainerSeven>
            <BoxSeventeen>17</BoxSeventeen>
            <BoxTwentyFour>24</BoxTwentyFour>
          </MiniContainerSeven>
          <MiniContainerEight>18</MiniContainerEight>
          <MiniContainerNine>
            <BoxNineteen>19</BoxNineteen>
            <BoxTwentyFive>25</BoxTwentyFive>
          </MiniContainerNine>
          <MiniContainerTen>20</MiniContainerTen>
        </MiniContainerSix>
      </CalendarRightContainer>
    </CalendarPageContainer>
  );
}
