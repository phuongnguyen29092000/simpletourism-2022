package com.example.simpletouristapp.ui.news;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.simpletouristapp.model.News;
import com.example.simpletouristapp.repository.NewsRepository;

import org.jetbrains.annotations.NotNull;

import java.util.List;

public class NewsViewModel extends AndroidViewModel {
    private final NewsRepository newsRepository;
    private final LiveData<List<News>> allNews;

    public NewsViewModel(@NonNull @NotNull Application application) {
        super(application);
        newsRepository = new NewsRepository(application);
        allNews = newsRepository.getAllNews();
    }

    public void insert(List<News> list) {
        newsRepository.insert(list);
    }

    public LiveData<List<News>> getAllNews() {
        return allNews;
    }

}