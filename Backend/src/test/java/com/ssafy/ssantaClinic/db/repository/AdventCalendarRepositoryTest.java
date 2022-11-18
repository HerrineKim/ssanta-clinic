//package com.ssafy.ssantaClinic.db.repository;
//
//import com.ssafy.ssantaClinic.db.entity.AdventCalendar;
//import org.assertj.core.api.Assertions;
//import org.junit.Assert;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import java.util.List;
//
//
//@DataJpaTest
//class AdventCalendarRepositoryTest {
//    @Autowired
//    private AdventCalendarRepository calendarRepository;
//
//    @Test
//    public void AdventCalendarRepository가Null이아님() {
//        Assertions.assertThat(calendarRepository).isNotNull();
//    }
//
//    @Test
//    public void 박스_찾기() {
//        List<AdventCalendar> list = calendarRepository.findAllByReceiverUserIdAndIsReadIsFalse(10);
//        Assertions.assertThat(list).isEmpty();
//    }
//}