package com.example.simpletouristapp.dao;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import com.example.simpletouristapp.model.Tour;

import java.util.List;

@Dao
public interface TourDao {
    @Query("SELECT * FROM tours WHERE tours.nameCountry = 'Vietnam'")
    LiveData<List<Tour>> getDomesticTours();

    @Query("SELECT * FROM tours WHERE NOT tours.nameCountry = 'Vietnam'")
    LiveData<List<Tour>> getInternationalTours();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insert(List<Tour> tourList);

    @Query("DELETE FROM tours WHERE tours.nameCountry = 'Vietnam'")
    void deleteDomesticTours();

    @Query("DELETE FROM tours WHERE NOT tours.nameCountry = 'Vietnam'")
    void deleteInternationalTours();

    @Query("DELETE FROM tours")
    void deleteAll();
}
