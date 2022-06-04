package com.example.simpletouristapp.database;

import android.content.Context;
import android.os.AsyncTask;

import androidx.annotation.NonNull;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.sqlite.db.SupportSQLiteDatabase;

import com.example.simpletouristapp.dao.TourDao;
import com.example.simpletouristapp.model.Tour;

import org.jetbrains.annotations.NotNull;

@Database(entities = {Tour.class}, version = 1)
public abstract class TourDatabase extends RoomDatabase {
    private static final String DATABASE_NAME = "tours";
    public abstract TourDao tourDao();

    private static volatile TourDatabase INSTANCE;
    public static TourDatabase getInstance(Context context){
        if(INSTANCE == null){
            synchronized (TourDatabase.class){
                if(INSTANCE == null){
                    INSTANCE = Room.databaseBuilder(context, TourDatabase.class,DATABASE_NAME)
                            .addCallback(callback)
                            .build();
                }
            }
        }
        return INSTANCE;
    }

    static Callback callback = new Callback() {
        @Override
        public void onCreate(@NonNull @NotNull SupportSQLiteDatabase db) {
            super.onCreate(db);
            new TourDatabase.PopulateAsyncTask(INSTANCE);
        }
    };

    static class PopulateAsyncTask extends AsyncTask<Void,Void,Void> {

        private TourDao tourDao;
        PopulateAsyncTask(TourDatabase tourDatabase){
            tourDao = tourDatabase.tourDao();
        }
        @Override
        protected Void doInBackground(Void... voids) {
            tourDao.deleteAll();
            return null;
        }
    }
}
