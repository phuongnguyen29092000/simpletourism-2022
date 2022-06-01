package com.example.simpletouristapp.ui.domestic;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;


import com.example.simpletouristapp.model.Tour;

import com.example.simpletouristapp.repository.TourRepository;

import org.jetbrains.annotations.NotNull;

import java.util.List;

public class DomesticViewModel extends AndroidViewModel {
    private TourRepository tourRepository;
    private LiveData<List<Tour>> domesticTours;


    public DomesticViewModel(@NonNull @NotNull Application application) {
        super(application);
        tourRepository = new TourRepository(application);
        domesticTours = tourRepository.getDomesticTours();
    }

    public void insert(List<Tour> list){
        tourRepository.insert(list);
    }

    public LiveData<List<Tour>> getDomesticTours()
    {
        return domesticTours;
    }
}
