package com.example.simpletouristapp.ui.international;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.simpletouristapp.model.Tour;
import com.example.simpletouristapp.repository.TourRepository;

import org.jetbrains.annotations.NotNull;

import java.util.List;

public class InternationalViewModel extends AndroidViewModel {
    private final TourRepository tourRepository;
    private final LiveData<List<Tour>> internationalTours;

    public InternationalViewModel(@NonNull @NotNull Application application) {
        super(application);
        tourRepository = new TourRepository(application);
        internationalTours = tourRepository.getInternationalTours();
    }

    public void insert(List<Tour> list) {
        tourRepository.insert(list);
    }

    public LiveData<List<Tour>> getInternationalTours() {
        return internationalTours;
    }
}