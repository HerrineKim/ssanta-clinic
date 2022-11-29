package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.SantaLetter;
import com.ssafy.ssantaClinic.db.repository.SantaLetterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SantaLetterServiceImpl implements SantaLetterService {
    private final SantaLetterRepository santaLetterRepository;

    @Override
    public void save(SantaLetter santaLetter) {
        santaLetterRepository.save(santaLetter);
    }
}
