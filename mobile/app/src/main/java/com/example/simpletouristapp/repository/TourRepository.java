package com.example.simpletouristapp.repository;

import android.app.Application;
import android.os.AsyncTask;

import androidx.lifecycle.LiveData;

import com.example.simpletouristapp.dao.TourDao;
import com.example.simpletouristapp.database.TourDatabase;
import com.example.simpletouristapp.model.Tour;

import java.util.List;

public class TourRepository {

    private TourDatabase tourDatabase;
    private LiveData<List<Tour>> domesticTours;
    private LiveData<List<Tour>> internationalTours;


    public TourRepository(Application application) {
        tourDatabase = TourDatabase.getInstance(application);
        domesticTours = tourDatabase.tourDao().getDomesticTours();
        internationalTours = tourDatabase.tourDao().getInternationalTours();
    }

    public void insert(List<Tour> tourList) {
        new TourRepository.InsertAsyncTask(tourDatabase).execute(tourList);
    }

    public void deleteDomesticTour() {
        new TourRepository.DeleteAsyncTask(tourDatabase, "domestic").execute();
    }

    public void deleteInternationalTour() {
        new TourRepository.DeleteAsyncTask(tourDatabase, "international").execute();
    }


    public LiveData<List<Tour>> getDomesticTours() {
        return domesticTours;
    }

    public LiveData<List<Tour>> getInternationalTours() {
        return internationalTours;
    }

    class DeleteAsyncTask extends AsyncTask<Void, Void, Void> {
        private TourDao tourDao;
        private String tour;

        DeleteAsyncTask(TourDatabase tourDatabase, String tour) {
            tourDao = tourDatabase.tourDao();
            this.tour = tour;
        }

        @Override
        protected Void doInBackground(Void... voids) {
            if (tour.equals("domestic")) {
                tourDao.deleteDomesticTours();
            } else {
                tourDao.deleteInternationalTours();
            }
            return null;
        }
    }

    class InsertAsyncTask extends AsyncTask<List<Tour>, Void, Void> {

        private TourDao tourDao;

        InsertAsyncTask(TourDatabase tourDatabase) {
            tourDao = tourDatabase.tourDao();
        }

        @Override
        protected Void doInBackground(List<Tour>... lists) {
            tourDao.insert(lists[0]);
            return null;
        }
    }
}
