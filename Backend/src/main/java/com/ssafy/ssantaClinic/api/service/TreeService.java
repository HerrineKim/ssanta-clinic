package com.ssafy.ssantaClinic.api.service;

import java.util.List;

public interface TreeService {
    String saveTreeImage(int userId, String treeUrl);
    List<String> getRandomTree(int userId);
    void updateUserItemBox(int userId, String leftItem);
    String getTreeInfo(int userId);
}
