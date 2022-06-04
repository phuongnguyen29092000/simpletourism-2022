package com.example.simpletouristapp.dao;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import com.example.simpletouristapp.model.News;

import java.util.List;

@Dao
public interface NewsDao {

    @Query("SELECT * FROM news")
    LiveData<List<News>> getAllNews();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insert(List<News> newsList);

    @Query("DELETE FROM news")
    void deleteAll();

}
