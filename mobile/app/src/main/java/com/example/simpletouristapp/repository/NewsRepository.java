package com.example.simpletouristapp.repository;

import android.app.Application;
import android.os.AsyncTask;

import androidx.lifecycle.LiveData;

import com.example.simpletouristapp.dao.NewsDao;
import com.example.simpletouristapp.database.NewsDatabase;
import com.example.simpletouristapp.model.News;

import java.util.List;

public class NewsRepository {
    private NewsDatabase newsDatabase;
    private LiveData<List<News>> allNews;


    public NewsRepository(Application application){
        newsDatabase = NewsDatabase.getInstance(application);
        allNews = newsDatabase.newsDao().getAllNews();
    }
    public void insert(List<News> newsList){
        new NewsRepository.InsertAsyncTask(newsDatabase).execute(newsList);
    }
    public void deleteAll(){
        new NewsRepository.DeleteAsyncTask(newsDatabase).execute();
    }
    public  LiveData<List<News>> getAllNews(){
        return allNews;
    }

    class DeleteAsyncTask extends AsyncTask<Void,Void,Void> {
        private NewsDao newsDao;
        DeleteAsyncTask(NewsDatabase newsDatabase){
            newsDao = newsDatabase.newsDao();
        }

        @Override
        protected Void doInBackground(Void... voids) {
            newsDao.deleteAll();
            return null;
        }
    }
    class InsertAsyncTask extends AsyncTask<List<News>,Void,Void>{

        private NewsDao newsDao;
        InsertAsyncTask(NewsDatabase newsDatabase){
            newsDao = newsDatabase.newsDao();
        }
        @Override
        protected Void doInBackground(List<News>... lists) {
            newsDao.insert(lists[0]);
            return null;
        }
    }
}
