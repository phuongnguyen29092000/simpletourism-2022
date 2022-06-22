package com.example.simpletouristapp.database;

import android.content.Context;
import android.os.AsyncTask;

import androidx.annotation.NonNull;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.sqlite.db.SupportSQLiteDatabase;

import com.example.simpletouristapp.dao.NewsDao;
import com.example.simpletouristapp.model.News;

import org.jetbrains.annotations.NotNull;

@Database(entities = {News.class}, version = 1)
public abstract class NewsDatabase extends RoomDatabase {
    private static final String DATABASE_NAME = "news";

    public abstract NewsDao newsDao();

    private static volatile NewsDatabase INSTANCE;

    public static NewsDatabase getInstance(Context context) {
        if (INSTANCE == null) {
            synchronized (NewsDatabase.class) {
                if (INSTANCE == null) {
                    INSTANCE = Room.databaseBuilder(context, NewsDatabase.class, DATABASE_NAME)
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
            new NewsDatabase.PopulateAsyncTask(INSTANCE);
        }
    };

    static class PopulateAsyncTask extends AsyncTask<Void, Void, Void> {

        private NewsDao newsDao;

        PopulateAsyncTask(NewsDatabase newsDatabase) {
            newsDao = newsDatabase.newsDao();
        }

        @Override
        protected Void doInBackground(Void... voids) {
            newsDao.deleteAll();
            return null;
        }
    }
}
